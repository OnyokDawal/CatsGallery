import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LogBox,
} from "react-native";
import Lightbox from 'react-native-lightbox';

import Cats from "../Screen/Cats";

const { width, height } = Dimensions.get("window");

const CatsCard = ({ item, navigator }) => {

  return (


        <Lightbox navigator={navigator}>
            <Image
                style={{ height: 50, width:50}}
                source={{ uri: `${item.url}` }}
            />
        </Lightbox>
        
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginTop:.5,
    borderRadius: width * 0.01,
  }});

export default CatsCard;
