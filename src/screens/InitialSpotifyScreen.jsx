/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { spotifyIconSvg } from '../data/SvgImageData';
import { normalize } from '../components/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';

const InitialSpotifyScreen = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [artistName, setArtistName] = useState('');
    const [combinedList, setCombinedList] = useState([]);

    const SPOTIFY_DETAILS = {
        clientId: '88ece1270ebe4b54b4835ef560b22d89',
        scopes: [
            'user-read-recently-played',
            'user-top-read',
            'streaming',
            'user-read-email',
            'user-read-private',
            'user-library-read', // This is required to access saved tracks
            'user-follow-read',
            'playlist-read-private',
        ],
        usePKCE: false,
        redirectUri: 'shinkspotify://',
    };
    const storeToken = async accessToken => {
        try {
            await AsyncStorage.setItem('spotifyAccessToken', accessToken);
            console.log('Got spotify access token: ', accessToken);
            navigation.navigate('SpotifyMain');
        } catch (error) {
            Alert.alert('Error', 'Failed to save access token');
        }
    };
    const openSpotify = async () => {
        try {
            const url = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_DETAILS.clientId
                }&response_type=token&redirect_uri=${encodeURIComponent(
                    SPOTIFY_DETAILS.redirectUri,
                )}&scope=${encodeURIComponent(SPOTIFY_DETAILS.scopes.join(' '))}`;
            if (await InAppBrowser.isAvailable()) {
                InAppBrowser.openAuth(url, SPOTIFY_DETAILS.redirectUri, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#cfd3d6',
                    preferredControlTintColor: '#ffffff',
                    // Android Properties
                    showTitle: false,
                    toolbarColor: '#1db954',
                    secondaryToolbarColor: '#000000',
                }).then(response => {
                    console.log(response);
                    if (response.type === 'success' && response.url) {
                        const hashFragment = response.url.split('#')[1];
                        if (hashFragment) {
                            const paramsArray = hashFragment.split('&');
                            const params = {};
                            paramsArray.forEach(param => {
                                const [key, value] = param.split('=');
                                params[key] = value;
                            });
                            setToken(params['access_token']); // Store the access token
                            storeToken(params['access_token']); // Persist the access token in AsyncStorage
                            // You can also access other values like token_type and expires_in using the params object.
                        }
                    }
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Could not open the browser');
        }
    };
    const handleAddArtist = () => {
        // Add logic to handle adding the artist name
        console.log(`Added artist: ${artistName}`);
        setArtistName('');
    };

    return (
        <View style={styles.container}>
            <ProgressBar progress={0.70} />
            <View style={styles.textContainer}>
                <Text style={styles.titleTextStyle}>My Music</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Type your favourite artist name here"
                        value={artistName}
                        onChangeText={(value) => setArtistName(value)}
                        style={styles.textInputStyle} />
                    <TouchableOpacity onPress={() => handleAddArtist()}
                        style={styles.addButtonContainer}>
                        <Text style={styles.addButtonTextStyle}>Add</Text>
                    </TouchableOpacity>
                </View>
                <Pressable onPress={() => openSpotify()}
                    style={styles.downloadButtonContainer}>
                    <SvgXml xml={spotifyIconSvg}
                        fill={'#000000'} style={styles.icon} />
                    <Text style={styles.downloadTextStyle}>Download your playlist</Text>
                </Pressable>
            </View>
            <Pressable onPress={() => console.log('Not Now button pressed')}
                style={styles.skipButtonContainer}>
                <Text onPress={() => navigation.navigate('Agreement')}
                    style={styles.skipButtonTextStyle} >Skip</Text>
            </Pressable>
            <View style={styles.bottomButtonContainer}>
                <Pressable style={styles.allowButtonContainer}>
                    <Text style={styles.allowButtonTextStyle}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    textContainer: {
        marginLeft: normalize(15),
        alignItems: 'flex-start',
    },
    titleTextStyle: {
        marginTop: normalize(10),
        fontSize: 32,
        fontWeight: '600',
        color: '#282c3f',
        lineHeight: 42,
    },
    inputContainer: {
        marginTop: normalize(25),
        marginBottom: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputStyle: {
        paddingHorizontal: normalize(10),
        marginRight: normalize(10),
        width: normalize(250),
        height: normalize(44.5),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 16,
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    addButtonContainer: {
        paddingHorizontal: normalize(30),
        paddingVertical: normalize(10.6),
        backgroundColor: '#f0e4fa',
        borderWidth: 1,
        borderColor: '#7b337e',
        borderRadius: 4,
    },
    addButtonTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#c680b2',
        lineHeight: 21,
    },
    downloadButtonContainer: {
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(5),
        width: normalize(330),
        height: normalize(43),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    downloadTextStyle: {
        marginLeft: normalize(15),
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    skipButtonContainer: {
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(7),
        marginTop: 'auto',
        marginBottom: normalize(20),
        alignSelf: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 30,
    },
    skipButtonTextStyle: {
        fontSize: 11,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#9e5594',
        textAlign: 'center',
        lineHeight: 16,
    },
    bottomButtonContainer: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(16),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    allowButtonContainer: {
        padding: 13,
        marginBottom: normalize(20),
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#9d4edd',
        borderRadius: 5,
    },
    allowButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 23.4,
    },
});

export default InitialSpotifyScreen;
