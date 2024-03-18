/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const HomeLoader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/loader-image.gif')}
        style={styles.imageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100, // Set the width and height as needed
    height: 100,
  },
});

export default HomeLoader;
