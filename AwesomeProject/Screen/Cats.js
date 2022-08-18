import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  LogBox,
  Image
} from "react-native";
import Lightbox from 'react-native-lightbox';

import catsApi from "../apis/CatsApi";
import CatsCard from "../Components/CatsCard";

const { width, height } = Dimensions.get("window");

const Cats = ({navigator}) =>{
    const [cat, setCat] = useState('');

    useEffect(() =>{
        getCatsGalleryAPI()
    }, [])

    console.log(cat.data)

    function getCatsGalleryAPI(){
        catsApi
        .get(`https://api.thecatapi.com/v1/images/search?limit=10&page=1`, {
            headers:{
                "x-api-key":"c7ee284d-8365-49f5-be3e-4c36bf40846e"
            },
        }).then(function(response){
            setCat(response)
        }).catch(function(error){
            console.log(error)
        })
    }

    if(!cat){
        return null;
    }
    // console.log(cat)
    return(

            <FlatList
            data={cat.data}
            numColumns={3}
            showsVerticalScrollIndicator = {false}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
                    return(
                       
                        <Lightbox navigator={navigator}>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: `${item.url}` }}
                        />
                    </Lightbox>
                    )
                }}
            />

    )


}

const styles = StyleSheet.create({
    imageStyle: {
      height: height / 3, 
      width: width / 3,
      marginTop:.5,
      borderRadius: width * 0.01,
    }});

export default Cats