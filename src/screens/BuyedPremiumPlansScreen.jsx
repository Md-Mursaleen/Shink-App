/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { smallHeartSvg, hyperShinkSvg, personHeartSvg, closeIconSvg, flagSvg, diamondSvg } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';

const BuyedPremiumPlansScreen = () => {

    return (
        <View style={styles.container}>
            <SvgXml xml={closeIconSvg} style={styles.iconStyle} />
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.linearGradientStyle}>
                <SvgXml xml={diamondSvg} />
                <Text style={styles.premiumPlanTextStyle}>Premium Plan</Text>
            </LinearGradient>
            <Text style={styles.titleTextStyle}>You upgraded to Premium, so why not use your new benefits?</Text>
            <View style={{ marginTop: 20 }}>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={smallHeartSvg} />
                    <Text style={styles.optionItemTextStyle}>Send unlimited likes</Text>
                    <View style={styles.tryNowContainer}>
                        <Text style={styles.tryNowTextStyle}>Try Now</Text>
                    </View>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={personHeartSvg} />
                    <Text style={styles.optionItemTextStyle}>See who like you</Text>
                    <View style={styles.tryNowContainer}>
                        <Text style={styles.tryNowTextStyle}>Try Now</Text>
                    </View>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={hyperShinkSvg} />
                    <Text style={styles.optionItemTextStyle}>You can get 10 Hyper Shink each week</Text>
                    <View style={styles.tryNowContainer}>
                        <Text style={styles.tryNowTextStyle}>Try Now</Text>
                    </View>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={flagSvg} />
                    <Text style={styles.optionItemTextStyle}>Flag View</Text>
                    <View style={styles.tryNowContainer}>
                        <Text style={styles.tryNowTextStyle}>Try Now</Text>
                    </View>
                </View>
            </View>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Keep Swiping</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    optionItemStyle: {
        paddingHorizontal: 15,
        paddingVertical: 13,
        marginVertical: 7,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    optionItemTextStyle: {
        width: 210,
        marginLeft: 8,
        fontSize: 16.2,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    imageStyle: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
    },
    iconStyle: {
        marginTop: 23,
        marginLeft: 15,
    },
    linearGradientStyle: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginTop: 20,
        width: 142,
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 4,
    },
    premiumPlanTextStyle: {
        marginLeft: 7,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 21,
    },
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 'auto',
        marginBottom: 30,
        width: '90%',
        height: 48,
        alignSelf: 'center',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 24,
    },
    titleTextStyle: {
        marginTop: 20,
        marginLeft: 18,
        width: 312,
        fontSize: 24,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        // textAlign: 'center',
        lineHeight: 32,
    },
    tryNowContainer: {
        padding: 3,
        marginLeft: 'auto',
        marginRight: 2,
        width: 60,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 50,
    },
    tryNowTextStyle: {
        fontSize: 10.5,
        fontWeight: '400',
        color: '#9e5594',
        lineHeight: 16,
    },
});

export default BuyedPremiumPlansScreen;
