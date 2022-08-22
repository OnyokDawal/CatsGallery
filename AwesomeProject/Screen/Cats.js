import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import catsApi from "../apis/CatsApi";
import CatsCard from "../Components/CatsCard";

const { width, height } = Dimensions.get("window");

const Cats = ({navigator}) =>{
    const [cat, setCat] = useState([]);
    const [breeds, setBreed] = useState([]);
    const [selectedBreed, setSelectedBreedValue] = useState('abys');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState('');
    const [mountedOn, setMounted] = useState(false);
  

    useEffect(() =>{
       
        getCatsBreeds();
        getCatsGalleryAPI();
    }, [])

    function addPage(){  // on end reached add new page
        var tPage = page + 1;
        getCatsGalleryAPI(selectedBreed,tPage); // call API images
    }

    // Get Cat Images
    async function  getCatsGalleryAPI (breed = 'abys',curPage = 1){
        setLoading('Loading...');
        if(loading == ''){  // check if no current loading 
           setPage(curPage); // increment page
           await catsApi
            .get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${curPage}&size=small&breed_id=${breed}`, {
                headers:{
                    "x-api-key":"c7ee284d-8365-49f5-be3e-4c36bf40846e"
                },
            }).then(function(response){ 

                // Storing images to cats array
                for (let data of response.data) { 
                    setCat(current => [...current,data]);
                }

                setLoading(''); // set empty loading 
            }).catch(function(error){
                console.log(error)
            })
        }
       
    } 

    // Breed API
    async function getCatsBreeds(){
        await catsApi
        .get(`https://api.thecatapi.com/v1/breeds`, {
            headers:{
                "x-api-key":"c7ee284d-8365-49f5-be3e-4c36bf40846e"
            },
        }).then(function(response){
           
            for (let data of response.data) { 
                setBreed(current => [...current, {label:data.name,value:data.id}]);
            }
            setMounted(true);
        }).catch(function(error){
            console.log(error)
        })
    }

    function changeBreed(value){
         setCat([]);
         setSelectedBreedValue(value); 
         getCatsGalleryAPI(value,1);
    }

    
    renderFooter = () => {
       
        return (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingScreen}>{loading}</Text>
          </View>
          
        );
   }; 

    return(
        <View>
            <View style={styles.pickerStyles}>
                <RNPickerSelect
                
                    onValueChange={(value) => { 
                        if (mountedOn) {
                            changeBreed(value);
                        }
                      
                     }}
                    items={breeds}
                    style={styles.pickerSelectStyles}
                />
            </View>
            <FlatList
            data={cat}
            numColumns={3}
            keyExtractor={(item) => item.id} 
            refreshing={() =>setCat([])}
            showsVerticalScrollIndicator = {false}
            onEndReachedThreshold={0.1}
            onEndReached={() => addPage()}
            ListFooterComponent={renderFooter()}
            renderItem={({ item,index }) => {
                    return(
                    <CatsCard item={item} key={item.id}/>
                    )
                   
                }}
            />

        </View>
           
    )


}

const styles = StyleSheet.create({
   
    pickerStyles:{
        margin:20,
        borderWidth:1,
        borderColor:'#eaeaea',
        padding:10
    },
    dropDownStyle:{
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, 
    },
    loadingContainer:{
        alignItems:'center',
        padding:10
    },
    loading:{
        fontStyle:'italic',
        fontWeight:'bold'
    }


});




export default Cats