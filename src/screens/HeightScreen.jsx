/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from 'react-native-wheel-pick';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const HeightScreen = () => {
    const navigation = useNavigation();
    const [selectedHeightIndex, setSelectedHeightIndex] = useState(0); // Initialize with the first height
    const windowHeight = Dimensions.get('window').height;
    const [selectedHeight, setSelectedHeight] = useState(heightData[0]); // Initialize with the first height

    useEffect(() => {
        // Calculate the index closest to the middle point of the rectangle box height
        const middleIndex = Math.round(heightData.length / 2);
        setSelectedHeightIndex(middleIndex);
    }, []);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = async () => {
        // Access selected height using selectedHeightIndex
        console.log("Selected height: ", selectedHeight);
        // Navigate to next screen or perform any other actions
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Height</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.subTitleTextStyle}>Pick your height</Text>
            {/* Picker component to select height */}
            <View style={styles.pickerContainer}>
                <Picker textSize={18}
                    textColor={'#000000'}
                    style={[styles.pickerStyle, { borderWidth: 1 }]}
                    selectedValue={selectedHeight}
                    itemStyle={{ color: '#000000', fontSize: 16 }}
                    isShowSelectBackground={false} // Default is true
                    selectBackgroundColor="#8080801A"
                    selectBorderWidth="0.5"
                    onValueChange={(value, index) => {
                        setSelectedHeight(value);
                        setSelectedHeightIndex(index);
                    }}
                    pickerData={heightData?.map(item => `${item.cm} cm | ${item.ft} ft`)}
                    selectLineColor={"lightgray"} // Use selectLineColor instead of indicatorColor
                    renderItem={(data, index) => {
                        return (
                            <View style={[styles.heightItemContainer, index === selectedHeightIndex &&
                                { backgroundColor: 'transparent' }]}>
                                <Text style={[styles.heightTextStyle, index === selectedHeightIndex
                                    && styles.highlightedTextStyle]}>
                                    {data}
                                </Text>
                            </View>
                        );
                    }} />
            </View>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}>
                    <Text style={styles.nextButtonTextStyle}>Submit</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const heightData = [
    { cm: 82, ft: "2'7\"" },
    { cm: 85, ft: "2'8\"" },
    { cm: 88, ft: "2'9\"" },
    { cm: 91, ft: "3'0\"" },
    { cm: 94, ft: "3'1\"" },
    { cm: 97, ft: "3'2\"" },
    { cm: 100, ft: "3'3\"" },
    { cm: 103, ft: "3'4\"" },
    { cm: 106, ft: "3'5\"" },
    { cm: 109, ft: "3'6\"" },
    { cm: 112, ft: "3'7\"" },
    { cm: 115, ft: "3'8\"" },
    { cm: 118, ft: "3'9\"" },
    { cm: 121, ft: "4'0\"" },
    { cm: 124, ft: "4'1\"" },
    { cm: 128, ft: "4'2\"" },
    { cm: 131, ft: "4'3\"" },
    { cm: 134, ft: "4'4\"" },
    { cm: 137, ft: "4'5\"" },
    { cm: 140, ft: "4'6\"" },
    { cm: 143, ft: "4'7\"" },
    { cm: 146, ft: "4'8\"" },
    { cm: 149, ft: "4'9\"" },
    { cm: 152, ft: "5'0\"" },
    { cm: 155, ft: "5'1\"" },
    { cm: 158, ft: "5'2\"" },
    { cm: 161, ft: "5'3\"" },
    { cm: 164, ft: "5'4\"" },
    { cm: 167, ft: "5'5\"" },
    { cm: 170, ft: "5'6\"" },
    { cm: 173, ft: "5'7\"" },
    { cm: 176, ft: "5'8\"" },
    { cm: 179, ft: "5'9\"" },
    { cm: 182, ft: "6'0\"" },
    { cm: 185, ft: "6'1\"" },
    { cm: 188, ft: "6'2\"" },
    { cm: 192, ft: "6'3\"" },
    { cm: 195, ft: "6'4\"" },
    { cm: 198, ft: "6'5\"" },
    { cm: 201, ft: "6'6\"" },
    { cm: 204, ft: "6'7\"" },
    { cm: 207, ft: "6'8\"" },
    { cm: 210, ft: "6'9\"" },
    { cm: 213, ft: "7'0\"" },
    { cm: 216, ft: "7'1\"" },
    { cm: 219, ft: "7'2\"" },
    { cm: 222, ft: "7'3\"" },
    { cm: 225, ft: "7'4\"" },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: 13,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    subTitleTextStyle: {
        marginTop: normalize(13),
        marginLeft: normalize(18),
        marginBottom: normalize(20),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    rectangleBoxStyle: {
        position: 'absolute',
        paddingVertical: normalize(16),
        top: normalize(153),
        left: normalize(16),
        width: normalize(328),
        height: normalize(100),
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    heightItemContainer: {
        padding: normalize(10), // Adjust padding as needed
        backgroundColor: 'red', // Set the background color to white
    },
    highlightedItem: {
        borderBottomWidth: 2,
        borderColor: 'red',
    },
    heightTextStyle: {
        fontSize: 19,
        fontWeight: '400',
    },
    highlightedTextStyle: {
        fontSize: 18, // Increase font size for highlighted item
        fontWeight: 'bold',
    },
    pickerContainer: {
        position: 'absolute',
        top: '14%',
        width: '90%',
        height: normalize(140),
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#CCCCCC', // Gray color border
        borderRadius: 8,
        overflow: 'hidden', // Ensure the border is visible
    },
    pickerStyle: {
        position: 'absolute',
        top: '8%',
        width: '90%',
        height: normalize(150),
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#CCCCCC', // Gray color border
        borderRadius: 8,
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: '5%', // Set margin horizontally to 5% on both sides
        marginBottom: normalize(20), // Adjust margin bottom if needed
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        zIndex: 1,
    },
    nextButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
    },
});


export default HeightScreen;
