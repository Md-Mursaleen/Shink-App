/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const PurchasesHistoryScreen = () => {
    const navigation = useNavigation();

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4e40b3', '#4e40b3', '#4e40b3']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Purchase History</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.planItemContainer}>
                <View style={styles.planItemHeaderContainer}>
                    <Text style={styles.priceTextStyle}>₹200</Text>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonTextStyle}>Active</Text>
                    </View>
                </View>
                <Text style={styles.dateAndTimeTextStyle}>26 Feb, 2024 03:54 PM</Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>Payment mode</Text>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>Redeem code</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>Ref.number</Text>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>SDF33455VGBVN</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>Plan start date</Text>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>26 Feb, 2024</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>Plan end date</Text>
                    <Text style={[styles.textStyle,
                    { color: '#000000' }]}>25 Mar, 2024</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(16),
        width: '100%',
        height: normalize(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    planItemContainer: {
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(18),
        marginTop: normalize(15),
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#3e3e3e',
        borderRadius: 10,
    },
    planItemHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        paddingVertical: normalize(2),
        paddingHorizontal: normalize(8),
        width: normalize(55),
        height: normalize(23),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34a853',
        borderRadius: 4,
        gap: 4,
    },
    buttonTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 16,
    },
    priceTextStyle: {
        fontSize: 27,
        fontWeight: '800',
        color: '#4e40b3',
        lineHeight: 32,
    },
    dateAndTimeTextStyle: {
        fontSize: 13.3,
        fontWeight: '800',
        color: '#4e40b3',
        lineHeight: 32,
    },
    textContainer: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 14.2,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
});

export default PurchasesHistoryScreen;
