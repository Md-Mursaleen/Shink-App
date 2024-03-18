/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalize } from './theme';

const Category = ({ heading, categories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingTextStyle}>{heading}</Text>
      <View style={styles.categoryContainer}>
        {categories?.map((category, index) => (
          <View key={index}
            style={styles.categoryItemContainer}>
            <Text style={styles.categoryTextStyle}>{category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headingTextStyle: {
    marginBottom: normalize(12),
    marginTop:normalize(10),
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    color: '#000000',
    lineHeight: 21,
  },
  categoryContainer: {
    marginRight: normalize(20),
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: "flex-start",
  },
  categoryItemContainer: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    marginHorizontal: normalize(5),
    marginVertical: normalize(6),
    flexBasis: 'auto', // This will allow the items to size themselves based on their content
    backgroundColor: '#f0f3f6',
    borderRadius: 24,
  },
  categoryTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    color: '#282c3f',
    lineHeight: 16,
  },
});

export default Category;
