/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Cats from './Screen/Cats';
import { SafeAreaView, StatusBar, Platform,StyleSheet,LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <SafeAreaView style={styles.container}>
       <Cats/>
    </SafeAreaView>
    
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
