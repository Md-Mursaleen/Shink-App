/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RelationshipPreferenceScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const { isUpdatingFromMyInfoScreen } = route.params || false;

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
    };

    const handleNextButtonPressed = () => {
        if (selectedOption) {
            if (isUpdatingFromMyInfoScreen) {
                // If updating from MyInfoScreen, navigate back to MyInfoScreen
                navigation.navigate('MyInfo');
            } else {
                // Otherwise, navigate to YourRelationshipScreen
                AsyncStorage.setItem('datePreferenceGender', selectedOption);
                navigation.navigate('Spotify', { selectedOption });
            }
        }
    };

    const buttonTextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
        opacity: selectedOption ? 1 : 0.5,
    };

    return (
        <View style={styles.container}>
            <ProgressBar progress={0.65} />
            <Text style={styles.titleTextStyle}>Seeking?</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderOption('Nothing Serious')}
                {renderOption('Relationship')}
                {renderOption('Not Sure')}
                {renderOption('Marriage')}
                {renderOption('Friendship')}
                {renderOption('Casual')}
            </ScrollView>
            {/* <View style={styles.headerButtonContainer}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.previousButtonContainer}>
                    <Image source={require('../assets/images/left-arrow.png')}
                        style={styles.imageStyle} />
                </TouchableOpacity>
                <View style={styles.lineStyle} />
            </View> */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}
                    style={[styles.buttonContainer,
                    { backgroundColor: selectedOption ? '#9d4edd' : '#e0e0e0' }]}
                    disabled={!selectedOption}>
                    <Text style={buttonTextStyle}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    function renderOption(option) {
        return (
            <TouchableOpacity onPress={() => handleOptionButtonPressed(option)}
                style={styles.optionItemStyle}>
                <Text style={styles.optionItemTextStyle}>{option}</Text>
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

// Use the same styles from DatePreference
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingBottom: normalize(80),
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleTextStyle: {
        marginTop: normalize(25),
        marginLeft: normalize(15),
        marginBottom: normalize(15),
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    headerButtonContainer: {
        position: 'absolute',
        padding: normalize(5),
        top: normalize(0),
        left: normalize(0),
        right: normalize(20),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonContainer: {
        padding: normalize(10),
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    imageStyle: {
        width: normalize(18),
        height: normalize(18),
        tintColor: '#000000',
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(20),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    optionItemStyle: {
        padding: normalize(12),
        // marginLeft: normalize(15),
        marginVertical: normalize(6),
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    radioButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    radioButtonSubContainer: {
        marginRight: normalize(10),
        height: normalize(20),
        width: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 12,
    },
    innerCircleStyle: {
        height: normalize(12),
        width: normalize(12),
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    lineStyle: {
        top: normalize(18),
        marginRight: 'auto',
        height: normalize(3),
        width: '40%',
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    optionItemTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
});

export default RelationshipPreferenceScreen;
