/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const NextGenderSelectionScreen = ({ route, navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [lineWidth, setLineWidth] = useState(0);
    const selectedOptionFromPreviousScreen = route.params?.selectedOption || null;

    useEffect(() => {
        if (selectedOptionFromPreviousScreen) {
            setSelectedOption(selectedOptionFromPreviousScreen);
        }
    }, [selectedOptionFromPreviousScreen]);

    const defaultOptions = ["Intersex Man", "Trans Man", "Transmasculine"];
    const allOptions = Array.from(new Set(defaultOptions));

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = () => {
        if (!selectedOption) {
            return;
        }
        if (
            allOptions.includes(selectedOption) ||
            selectedOption === 'Intersex Man' ||
            selectedOption === 'Trans Man' ||
            selectedOption === 'Transmasculine'
        ) {
            // Navigating to SexualityScreen when any option is chosen
            navigation.navigate('Sexuality', { selectedOption });
        } else {
            navigation.navigate('FinalGenderSelection', { selectedOption });
        }
        setLineWidth(lineWidth + 50);
    };

    const handleMissingGenderButtonPressed = () => {
        console.log('Pressed');
        navigation.navigate('FinalGenderSelection');
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: selectedOption ? 1 : 0.5,
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.prevButtonContainer}>
                    <Image source={require('../assets/images/left-arrow.png')}
                        style={styles.iconImageStyle} />
                </TouchableOpacity>
                <View style={[styles.lineStyle, { right: 0 }]} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>
                    Please select your gender from the list provided.
                </Text>
            </View>
            {allOptions.map((option) => renderOption(option))}
            <TouchableOpacity onPress={() => handleMissingGenderButtonPressed()}
                style={styles.missingGenderButtonContainer}>
                <Text style={{ color: '#000000' }}>Are We Missing Your Gender Here?</Text>
                <Text style={{ marginLeft: 70 }}>{'>'}</Text>
            </TouchableOpacity>

            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={handleNextButtonPressed}
                    style={[styles.buttonContainer,
                    { backgroundColor: selectedOption ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!selectedOption}>
                    <Text style={buttonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    function renderOption(option) {
        return (
            <TouchableOpacity key={option}
                onPress={() => handleOptionButtonPressed(option)}
                style={styles.optionItemStyle}>
                <Text style={{ color: '#000000' }}>{option}</Text>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButtonSubContainer}>
                        {selectedOption === option &&
                            <View style={styles.innerCircleStyle} />}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    headerContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        flexDirection: 'column',
    },
    headerTextStyle: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
    },
    optionItemStyle: {
        padding: 10,
        marginVertical: 5,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 6,
    },
    iconImageStyle: {
        width: 18,
        height: 18,
        tintColor: '#000000',
    },
    radioButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    radioButtonSubContainer: {
        marginRight: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 12,
    },
    innerCircleStyle: {
        height: 10,
        width: 10,
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    missingGenderButtonContainer: {
        position: 'absolute',
        padding: 13,
        bottom: 65,
        marginBottom: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 6,
    },
    buttonsContainer: {
        paddingTop: 5,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f7f9',
    },
    bottomButtonContainer: {
        paddingHorizontal: 20,
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: 13,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    prevButtonContainer: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        lineHeight: 23.4,
    },
    lineStyle: {
        marginRight: 'auto',
        width: '40%',
        height: 3,
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
});

export default NextGenderSelectionScreen;
