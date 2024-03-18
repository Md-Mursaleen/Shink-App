/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { rightArrowSvg } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';

const MyInfoScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        showAge: true,
        age: '',
        showGender: true,
        gender: '',
        showSexuality: true,
        sexuality: '',
        showLookingFor: true,
        for: '',
        showStatus: true,
        status: '',
        showSeeking: true,
        seeking: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API_QUERY = `
            query GetShinkUser($userid: String!) {
              getShinkUser(userid: "$userid") {
                birthDate
                gender
                sexuality
                datePreferenceGender
                relationshipStatus
                datePreference
              }
            }
          `;
            const userid = '8';
            try {
                const responseNewApi = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: NEW_API_QUERY,
                        variables: { userid },
                    }),
                });
                const dataNewApi = await responseNewApi.json();
                console.log('New API Response: ', dataNewApi);
                if (dataNewApi && dataNewApi.data && dataNewApi.data.getShinkUser) {
                    const userNewApi = dataNewApi.data.getShinkUser;
                    setUserData({
                        showAge: true,
                        age: userNewApi.birthDate || '',
                        showGender: true,
                        gender: userNewApi.gender || '',
                        showSexuality: true,
                        sexuality: userNewApi.sexuality || '',
                        showLookingFor: true,
                        for: userNewApi.datePreferenceGender || '',
                        showStatus: true,
                        status: userNewApi.relationshipStatus || '',
                        showSeeking: true,
                        seeking: userNewApi.datePreference || '',
                    });
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
        };
        fetchUserData();
    }, []);

    // useEffect(() => {
    //     const apiUrl = 'https://9ni2jo54ce.execute-api.ap-south-1.amazonaws.com/default/getUser';
    //     // Make the API call to fetch user data
    //     fetch(apiUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userid: '8',
    //         }),
    //     }).then((response) => response.json()).then((data) => {
    //         console.log('API Response: ', data);
    //         if (data && data.length > 0) {
    //             setUserData({
    //                 ...userData,
    //                 ...data[0],
    //             });
    //         }
    //     }).catch((error) => {
    //         console.error('Error while fetching user data: ', error);
    //     }).finally(() => {
    //         // Turn off the loader when the data is fetched (whether successful or not)
    //         setIsLoading(false);
    //     });
    // }, []);

    const handleBirthdayPress = () => {
        if (userData.age) {
            setUserData({ ...userData, showBirthDate: true });
        } else {
            navigation.navigate('EditBirthDate', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleGenderPress = () => {
        if (userData.gender) {
            setUserData({ ...userData, showGender: true });
        } else {
            // Pass true to indicate navigation from MyInfoScreen
            navigation.navigate('GenderSelection', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleSexualityPress = () => {
        if (userData.sexuality) {
            setUserData({ ...userData, showSexuality: true });
        } else {
            navigation.navigate('Sexuality', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleLookingForPress = () => {
        if (userData.DatePref) {
            setUserData({ ...userData, showDatePref: true });
        } else {
            navigation.navigate('DatePreference', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleStatusPress = () => {
        if (userData.status) {
            setUserData({ ...userData, showStatus: true });
        } else {
            navigation.navigate('YourRelationship', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleSeekingPress = () => {
        if (userData.seeking) {
            setUserData({ ...userData, showSeeking: true });
        } else {
            navigation.navigate('RelationshipPreference', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.purpleBarStyle}>
                {/* Back Button and Title Text */}
                <TouchableOpacity onPress={() => handleBackButtonPress()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>My Info</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.bodyContainer}>
                {/* Birthday Button */}
                <TouchableOpacity onPress={() => handleBirthdayPress()}
                    style={styles.buttonContainer}>
                    {userData.showAge && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Birthday?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.age} years old</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showAge && (
                        <Text style={styles.buttonTextStyle}>Birthday?</Text>
                    )}
                </TouchableOpacity>
                {/* Gender Button */}
                <TouchableOpacity onPress={() => handleGenderPress()}
                    style={styles.buttonContainer}>
                    {userData.showGender && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Gender?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.gender}</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showGender && (
                        <Text style={styles.buttonTextStyle}>Gender?</Text>
                    )}
                </TouchableOpacity>
                {/* Sexuality Button */}
                <TouchableOpacity onPress={() => handleSexualityPress()}
                    style={styles.buttonContainer}>
                    {userData.showSexuality && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Sexuality?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.sexuality}</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showSexuality && (
                        <Text style={styles.buttonTextStyle}>Sexuality?</Text>
                    )}
                </TouchableOpacity>
                {/* Looking For Button */}
                <TouchableOpacity onPress={() => handleLookingForPress()}
                    style={styles.buttonContainer}>
                    {userData.showLookingFor && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Looking For?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.for}</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showLookingFor && (
                        <Text style={styles.buttonTextStyle}>Looking For?</Text>
                    )}
                </TouchableOpacity>
                {/* Status Button */}
                <TouchableOpacity onPress={() => handleStatusPress()}
                    style={styles.buttonContainer}>
                    {userData.showStatus && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Status?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.status}</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showStatus && (
                        <Text style={styles.buttonTextStyle}>Status?</Text>
                    )}
                </TouchableOpacity>
                {/* Seeking Button */}
                <TouchableOpacity onPress={() => handleSeekingPress()}
                    style={styles.buttonContainer}>
                    {userData.showSeeking && (
                        <>
                            <View style={styles.buttonContentContainer}>
                                <Text style={styles.buttonTextStyle}>Seeking?</Text>
                                <Text style={styles.userDataTextStyle}>{userData.seeking}</Text>
                            </View>
                            <SvgXml xml={rightArrowSvg} />
                        </>
                    )}
                    {!userData.showSeeking && (
                        <Text style={styles.buttonTextStyle}>Seeking?</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    purpleBarStyle: {
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
    bodyContainer: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        padding: 13,
        marginBottom: 13,
        width: '96%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    buttonTextStyle: {
        fontSize: 15.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Bold',
        color: '#000000',
        lineHeight: 24,
    },
    rightArrowImageStyle: {
        width: 10,
        height: 10,
        tintColor: '#979797',
    },
    userDataTextStyle: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9d4edd',
        lineHeight: 16,
    },
    buttonContentContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default MyInfoScreen;
