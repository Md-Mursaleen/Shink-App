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
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Purchases History</Text>
                </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.dateTextStyle}>26 Feb 24</Text>
            <View style={styles.planItemContainer}>
                <View style={styles.planItemHeaderContainer}>
                    <Text style={styles.planTextStyle}>Plan</Text>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonTextStyle}>Active</Text>
                    </View>
                </View>
                <Text style={styles.priceTextStyle}>$20</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Purchased on</Text>
                    <Text style={styles.textStyle}>26 Feb, 2024 03:54 PM</Text>
                </View>
                <View style={styles.borderStyle} />
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
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
        width: '100%',
        height: normalize(50),
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
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    dateTextStyle: {
        marginTop: normalize(15),
        marginLeft: normalize(17),
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 32,
    },
    planItemContainer: {
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(12),
        marginTop: normalize(15),
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    planItemHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    planTextStyle: {
        fontSize: 14.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    buttonContainer: {
        paddingVertical: normalize(2),
        paddingHorizontal: normalize(8),
        width: normalize(50),
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
        marginTop: normalize(10),
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    textContainer: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 16,
    },
    borderStyle: {
        marginHorizontal: normalize(5),
        marginTop: normalize(10),
        height: 0.5,
        backgroundColor: '#979797',
    },
});

export default PurchasesHistoryScreen;
