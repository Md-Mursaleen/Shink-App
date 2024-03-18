/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgreementScreen = ({ selectedLikes }) => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({});
    const [isEndReached, setIsEndReached] = useState(false);
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 15;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    const [isAgreementCompleted, setIsAgreementCompleted] = useState(false);

    // const onPressAgree = async () => {
    //     const url =
    //         'https://xhkafsjpgd.execute-api.ap-south-1.amazonaws.com/default/prod';
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(userInfo),
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log('API Response: ', responseData);
    //         if (isEndReached) {
    //             navigation.navigate('BottomTab');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const onPressAgree = async () => {
        var query = `mutation createShinkUser($input: CreateShinkUserInput!) {
            createShinkUser(input: $input) {
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
                        "input": userInfo,
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
            if (isEndReached) {
                navigation.navigate('BottomTab');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEndReached) {
            setIsAgreementCompleted(true);
        }
    }, [isEndReached]);

    const handleFetchingUserData = async () => {
        try {
            AsyncStorage.multiGet([
                'userId',
                'name',
                'phoneNumber',
                'birthDate',
                'location',
                'gender',
                'sexuality',
                'datePreferenceGender',
                'relationshipStatus',
                'datePreference',
                'music',
                'likes',
                'dislikes',
            ]).then(data => {
                const formattedData = {};
                data.forEach(item => {
                    const key = item[0];
                    let value = item[1];
                    // Parse JSON strings if needed
                    if (key === 'location' || key === 'music') {
                        try {
                            value = JSON.parse(value);
                        } catch (error) {
                            console.error(`Error while parsing JSON for key '${key}': `, error);
                            // Handle the error, or set value to a default if needed
                        }
                    }
                    formattedData[key] = value;
                });
                // Now, formattedData is a JavaScript object containing your data in a proper JSON format
                // let loca = {
                //     coords: {
                //         accuracy: formattedData.location.coords.accuracy.toString(),
                //         altitude: formattedData.location.coords.altitude.toString(),
                //         altitudeAccuracy:
                //             formattedData.location.coords.altitudeAccuracy.toString(),
                //         heading: formattedData.location.coords.heading,
                //         latitude: formattedData.location.coords.latitude.toString(),
                //         longitude: formattedData.location.coords.longitude.toString(),
                //         speed: formattedData.location.coords.speed,
                //     },
                //     mocked: formattedData.location.mocked,
                //     provider: formattedData.location.provider,
                //     timestamp: formattedData.location.timestamp,
                // };
                const userDataToSend = {
                    userId: formattedData.userId,
                    name: formattedData.name,
                    // phoneNumber: formattedData.phoneNumber,
                    birthDate: formattedData.birthDate,
                    relationshipStatus: formattedData.relationshipStatus,
                    datePreferenceGender: formattedData.datePreferenceGender,
                    datePreference: formattedData.datePreference,
                    gender: formattedData.gender,
                    likes: formattedData.likes,
                    dislikes: formattedData.dislikes,
                    location: JSON.stringify(formattedData.location),
                    sexuality: formattedData.sexuality,
                    isAgreementCompleted: isAgreementCompleted,
                    //music and phone number part is remaining
                };
                setUserInfo(userDataToSend);
                console.log(userDataToSend);
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    useEffect(() => {
        handleFetchingUserData();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titleTextStyle}>Terms & Conditions</Text>
                <ScrollView style={styles.contentContainer}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            setIsEndReached(true);
                        }
                    }}
                    scrollEventThrottle={400} showsVerticalScrollIndicator={false}>
                    <Text style={styles.textStyle}>{`*Shink Dating App Privacy Policy and Guidelines*\n\nLast Updated: [Date]\n\nThank you for choosing Shink, a platform designed to connect people in meaningful ways. We are committed to protecting your privacy and providing a secure environment for you to build relationships. This Privacy Policy outlines our practices regarding the collection, use, and sharing of your personal information when you use the Shink dating app.
                    \n*1. Information We Collect:*\n\na. *Registration Information:*\n    - When you create a Shink account, we collect your email address, phone number, and create a unique user ID.
                    \nb. *Profile Information:*\n    - Users have the option to provide additional information such as photos, location, interests, and preferences to enhance their profiles.
                    \nc. *Usage Information:*\n    - We collect data on how you interact with the app, including likes, messages, matches, and other activities.
                    \nd. *Device Information:*\n    - We may collect information about the device you use to access Shink, including device type, operating system, and unique device identifiers.
                    \n*2. How We Use Your Information:*\n\na. *Matchmaking:*\n    - We use the information you provide to match you with potential partners based on compatibility.
                    \nb. *Communication:*\n    - Your email address and phone number are used for account verification and communication purposes.
                    \nc. *Personalization:*\n    - We personalize your experience by using your preferences and usage patterns to suggest relevant matches.
                    \nd. *Analytics:*\n    - We analyze user data to improve our app's functionality, user experience, and overall performance.
                    \n*3. Information Sharing:*\n\na. *Consent:*\n    - We will not share your information with third parties without your explicit consent.
                    \nb. *Service Providers:*\n    - We may share information with third-party service providers to perform functions on our behalf, such as hosting, data analysis, and customer service.
                    \n*4. Security Measures:*\n\na. *Data Security:*\n    - We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.
                    \nb. *Encryption:*\n    - All data transmitted between your device and our servers is encrypted using SSL/TLS protocols.
                    \n*5. User Guidelines:*\n\na. *Respect and Consent:*\n    - Users are expected to treat each other with respect and obtain consent before initiating any form of communication.
                    \nb. *Report and Block:*\n    - Shink encourages users to report any inappropriate behavior and provides tools to block and filter unwanted contacts.
                    \nc. *Authenticity:*\n    - Users are expected to provide accurate and truthful information in their profiles.
                    \n*6. Changes to Privacy Policy:*\n\na. *Notification:*\n    - Users will be notified of any changes to the Privacy Policy through the app or via email.
                    \nb. *Review:*\n    - Users are encouraged to review the Privacy Policy regularly to stay informed about how their information is being handled.
                    \nBy using Shink, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns, please contact us at [contact@shinkdating.com].
                    \nThank you for choosing Shink. We wish you a delightful experience in finding meaningful connections.
                    \nNote: This is a general template, and it's crucial to consult legal professionals to ensure compliance with specific regulations and laws.`}</Text>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={[styles.buttonContainer,
                isEndReached ?
                    { backgroundColor: "#9d4edd" } :
                    { backgroundColor: "#e0e0e0" }]} onPress={() => onPressAgree()}>
                    <Text style={styles.buttonTextStyle}>I agree</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(22),
        // paddingTop: 45,
        paddingTop: normalize(30), //newly added
    },
    titleTextStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        lineHeight: 42,
    },
    contentContainer: {
        marginTop: normalize(20),
        // marginTop: 10,
        width: "auto",
        // height: 525,
        height: normalize(535), //newly added
        alignContent: 'flex-start',
        borderWidth: 1.3,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    textStyle: {
        marginVertical: normalize(15),
        marginLeft: normalize(14),
        width: normalize(305),
        fontSize: 14.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        textAlign: 'left',
        lineHeight: 21,
    },
    bottomContainer: {
        padding: normalize(8),
        marginTop: 'auto',
        paddingHorizontal: normalize(20),
        borderWidth: 1,
        borderColor: "#f2f2f2",
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        lineHeight: 23.4,
    },
    selectedInterestsLengthTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        lineHeight: 23.4,
    },
});

export default AgreementScreen;
