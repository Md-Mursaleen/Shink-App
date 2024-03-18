/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable } from 'react-native';

const MatchedScreen = () => {
    const [messageText, setMessageText] = useState('');

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/close-icon.png')}
                style={styles.iconStyle} />
            <View style={styles.imagesContainer}>
                <Image source={require('../assets/images/matched-user1.png')}
                    style={styles.imageStyle} />
                <Image source={require('../assets/images/matched-user2.png')}
                    style={styles.imageStyle} />
            </View>
            <Text style={styles.textStyle}>You Matched</Text>
            <View style={styles.textInputContainer}>
                <TextInput placeholder="Send a message"
                    placeholderTextColor={'#979797'}
                    value={messageText}
                    onChangeText={(textValue) => setMessageText(textValue)}
                    style={styles.textInputStyle} />
            </View>
            <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Send</Text>
            </Pressable>
            <Pressable style={styles.laterButtonContainer}>
                <Text style={styles.laterButtonTextStyle}>May be later</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#381545',
    },
    iconStyle: {
        marginTop: 15,
        marginLeft: 15,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    imagesContainer: {
        marginTop: '32%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 78,
        height: 78,
        resizeMode: 'contain',
    },
    textStyle: {
        marginTop: 25,
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Bold',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 32,
    },
    textInputContainer: {
        marginTop: 30,
        width: '92%',
        height: 128,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    textInputStyle: {
        marginLeft: 10,
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Bold',
        color: '#979797',
        lineHeight: 16,
    },
    buttonContainer: {
        marginTop: 18,
        marginRight: 17,
        paddingVertical: 9,
        paddingHorizontal: 16,
        alignSelf: 'flex-end',
        backgroundColor: '#9e5594',
        borderWidth: 2,
        borderColor: '#9e5594',
        borderRadius: 4,
    },
    buttonTextStyle: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 16,
    },
    laterButtonContainer: {
        marginTop: 70,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#9e5594',
        borderRadius: 4,
    },
    laterButtonTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Bold',
        color: '#979797',
        lineHeight: 16,
    },
});

export default MatchedScreen;
