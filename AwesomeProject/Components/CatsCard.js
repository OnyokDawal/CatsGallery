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

    // console.log(item.url)

  return (
    <View style={styles.cardView}>

        <Lightbox navigator={navigator}>
            <Image
                style={{ height: 300 }}
                source={{ uri: `${item.url}` }}
            />
        </Lightbox>
        
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    overflow: "hidden",
    height: 300,
    marginTop:.5,
    borderRadius: width * 0.01,
  }});

export default CatsCard;
