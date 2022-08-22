import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text
} from "react-native";
import Lightbox from 'react-native-lightbox';


const { width, height } = Dimensions.get("window");

const CatsCard = ({ item }) => {
  const [imageShow, setImage] = useState(false);
  return(
   
    <Lightbox
       onOpen={() => {setImage(true)}}
       onClose={() => {setImage(false)}}
    >
      
        <Image
            style={
              imageShow == true ?
              styles.imageSelected :
              styles.imageStyle
            }
            source={{ uri: `${item.url}` }}
        />
       
       
    </Lightbox>
    )
};

const styles = StyleSheet.create({
  imageStyle: {
    height: height / 3, 
    width: width / 3,
    marginTop:.5,
    borderRadius: width * 0.01,
  },
  imageSelected: {
    height: height, 
    width: width,
   
  },
  cardView: {
    marginTop:.5,
    borderRadius: width * 0.01,
  }});

export default CatsCard;
