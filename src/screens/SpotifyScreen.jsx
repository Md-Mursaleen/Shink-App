/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { spotifyIconSvg } from '../data/SvgImageData';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpotifyScreen = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [userSpotifyData, setUserSpotifyData] = useState();
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
            navigation.navigate('MusicPreference');
            console.log('Got spotify access token: ', accessToken);
        } catch (error) {
            Alert.alert('Error', 'Failed to save access token.');
        }
    };

    useEffect(() => {
        AsyncStorage.multiGet([
            'userId',
            'name',
            'birthDate',
            'location',
            'gender',
            'sexuality',
            'datePreferenceGender',
            'relationshipStatus',
            'datePreference',
            'music',
            'likes',
        ]).then(data => {
            const formattedData = {};
            data.forEach(item => {
                const key = item[0];
                let value = item[1];
                // Parse JSON strings if needed
                if (key === 'location' || key === 'likes' || key === 'music') {
                    try {
                        value = JSON.parse(value);
                    } catch (error) {
                        console.error(`Error while parsing JSON for key '${key}': `, error);
                        // Handle the error, or set value to a default if needed
                    }
                }
                formattedData[key] = value;
            });
            setUserId(formattedData.userId);
        });
    }, []);

    console.log(userId);

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
                    preferredBarTintColor: 'gray',
                    preferredControlTintColor: '#ffffff',
                    // Android Properties
                    showTitle: false,
                    toolbarColor: '#1db954',
                    secondaryToolbarColor: '#000000',
                }).then(response => {
                    console.log(response);
                    setUserSpotifyData(response);
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
            Alert.alert('Error', 'Could not open the browser.');
        }

        var query = `mutation updateShinkUser($input: UpdateShinkUserInput!) {
            updateShinkUser(input: $input) {
              userId
            }
          }`;
        const url =
            'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        "input": {
                            "userId": userId,
                            "spotifyMusicInterests": JSON.stringify(userSpotifyData),
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <ProgressBar progress={0.70} />
            <View style={styles.imageContainer}>
                <SvgXml xml={spotifyIconSvg} fill={'#1eD760'}
                    style={styles.iconStyle} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleTextStyle}>Spotify connect?</Text>
                <Text style={styles.subTitleTextStyle}>
                    Your favorite Spotify artists will be public on Shink.
                </Text>
            </View>
            <Pressable onPress={() => console.log('Not Now button pressed')}
                style={styles.skipButtonContainer}>
                <Text onPress={() => navigation.navigate('Agreement')}
                    style={styles.skipButtonTextStyle} >Skip</Text>
            </Pressable>
            <View style={styles.bottomButtonContainer}>
                <Pressable onPress={() => openSpotify()}
                    style={styles.allowButtonContainer}>
                    <Text style={styles.allowButtonTextStyle}>Connect Spotify</Text>
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
    imageContainer: {
        marginTop: normalize(10),
        alignSelf: 'center',
    },
    textContainer: {
        marginTop: normalize(25),
        marginLeft: normalize(15),
        alignItems: 'flex-start',
    },
    titleTextStyle: {
        marginTop: 10,
        fontSize: 36,
        fontWeight: '600',
        color: '#282c3f',
        lineHeight: 42,
    },
    subTitleTextStyle: {
        marginTop: normalize(10),
        marginLeft: normalize(5),
        width: normalize(300),
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
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

export default SpotifyScreen;
