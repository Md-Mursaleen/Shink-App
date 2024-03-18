/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { eyeSvg } from '../data/SvgImageData';
import { useNavigation } from '@react-navigation/native';

const items = {
    smart: require('../../src/assets/icons/smart.png'),
    funny: require('../../src/assets/icons/funny.png'),
    sexy: require('../../src/assets/icons/sexy.png'),
    cute: require('../../src/assets/icons/cute.png'),
    honest: require('../../src/assets/icons/honest.png'),
    kind: require('../../src/assets/icons/kind.png'),
    polite: require('../../src/assets/icons/polite.png'),
    generous: require('../../src/assets/icons/generous.png'),
    ghoster: require('../../src/assets/icons/ghoster.png'),
    catfish: require('../../src/assets/icons/catfish.png'),
    badpicsender: require('../../src/assets/icons/bad-pic-sender.png'),
    pottiemouth: require('../../src/assets/icons/pottie-mouth.png'),
    stalker: require('../../src/assets/icons/stalker.png'),
    fakeprofile: require('../../src/assets/icons/fake-profile.png'),
    scammer: require('../../src/assets/icons/scammer.png'),
    married: require('../../src/assets/icons/married.png'),
};

const data = [
    {
        id: 'smart',
        type: 'green',
        count: '10',
        flagName: 'Smart',
    },
    {
        id: 'funny',
        type: 'green',
        count: '10',
        flagName: 'Funny',
    },
    {
        id: 'sexy',
        type: 'green',
        count: '10',
        flagName: 'Sexy',
    },
    {
        id: 'cute',
        type: 'green',
        count: '10',
        flagName: 'Cute',
    },
    {
        id: 'honest',
        type: 'green',
        count: '10',
        flagName: 'Honest',
    },
    {
        id: 'kind',
        type: 'green',
        count: '10',
        flagName: 'Kind',
    },
    {
        id: 'polite',
        type: 'green',
        count: '10',
        flagName: 'Polite',
    },
    {
        id: 'generous',
        type: 'green',
        count: '10',
        flagName: 'Generous',
    },
    {
        id: 'ghoster',
        type: 'red',
        count: '10',
        flagName: 'Ghoster',
    },
    {
        id: 'catfish',
        type: 'red',
        count: '10',
        flagName: 'Catfish',
    },
    {
        id: 'badpicsender',
        type: 'red',
        count: '10',
        flagName: 'Bad Pic Sender',
    },
    {
        id: 'pottiemouth',
        type: 'red',
        count: '10',
        flagName: 'Pottie Mouth',
    },
    {
        id: 'stalker',
        type: 'red',
        count: '10',
        flagName: 'Stalker',
    },
    {
        id: 'fakeprofile',
        type: 'red',
        count: '10',
        flagName: 'Fake Profile',
    },
    {
        id: 'scammer',
        type: 'red',
        count: '10',
        flagName: 'Scammer',
    },
    {
        id: 'married',
        type: 'red',
        count: '10',
        flagName: 'Married',
    },
];

const ModalItems = () => {
    const navigation = useNavigation();
    const [hasPremiumPlans, setHasPremiumPlans] = useState(false);

    return (
        <>
            {hasPremiumPlans === true && (
                <View style={styles.topContainer}>
                    <Pressable style={styles.topButtonContainer}>
                        <Text style={styles.buttonTextStyle}>Upgrade Now</Text>
                    </Pressable>
                    <Text style={styles.freeViewTextStyle}>2 Free Views Left</Text>
                </View>
            )}
            <View style={[styles.container, hasPremiumPlans === true && { marginTop: 5 }]}>
                {hasPremiumPlans === false && (
                    <Pressable style={styles.bottomContainer}>
                        <Pressable onPress={() =>
                            navigation.navigate('PremiumPlans', {
                                isHomeScreen: true,
                                setHasPremiumPlans: setHasPremiumPlans,
                            })}
                            style={styles.buttonContainer}>
                            <SvgXml xml={eyeSvg} />
                            <Text style={styles.buttonTextStyle}>Unlock to View Flags</Text>
                        </Pressable>
                        <Text style={styles.bottomTextStyle}>You have completed weekly free view. If you want to see more views, you will need to upgrade.</Text>
                    </Pressable>
                )}
                {data.map((item, index) => (
                    <View style={[styles.modalItemStyle,
                    item.type === 'green' ? { borderWidth: 1.2, borderColor: '#34a853' }
                        : { borderWidth: 1.2, borderColor: '#eb4335' },
                    hasPremiumPlans === false && { opacity: 0.3 }]} key={index}>
                        <Image source={items[item.id]} style={styles.imageStyle} />
                        <Text style={styles.textStyle}>{item.count}</Text>
                        <Text style={styles.textStyle}>{item.flagName}</Text>
                    </View>
                ))
                }
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalItemStyle: {
        padding: 12,
        marginHorizontal: 10,
        marginVertical: 8,
        width: 96,
        height: 96,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 8,
        gap: 8,
    },
    imageStyle: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: 13,
        color: '#343434',
        textAlign: 'center',
        lineHeight: 16,
    },
    bottomContainer: {
        position: 'absolute',
        marginBottom: '290%',
    },
    buttonContainer: {
        width: 160,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 50,
    },
    buttonTextStyle: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9e5594',
        lineHeight: 16,
    },
    bottomTextStyle: {
        marginTop: 13,
        width: 232,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        textAlign: 'center',
        color: '#282c3f',
        lineHeight: 21,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topButtonContainer: {
        width: 98,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 50,
    },
    freeViewTextStyle: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
    },
});

export default ModalItems;