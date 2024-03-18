/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalGreenFlagItems from '../components/ModalGreenFlagItems';
import ModalRedFlagItems from '../components/ModalRedFlagItems';

const GivenFlagsScreen = () => {
    const navigation = useNavigation();
    const greenFlagModalizeRef = useRef(null);
    const redFlagModalizeRef = useRef(null);
    const [selectedGivenGreenFlags, setSelectedGivenGreenFlags] = useState([]);
    const [selectedReceivedGreenFlags, setSelectedReceivedGreenFlags] = useState([]);
    const [selectedGivenRedFlags, setSelectedGivenRedFlags] = useState([]);
    const [selectedReceivedRedFlags, setSelectedReceivedRedFlags] = useState([]);
    const [isGreenFlagModalOpened, setIsGreenFlagModalOpened] = useState(false);
    const [isRedFlagModalOpened, setIsRedFlagModalOpened] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // const givenGreenFlagsData = [];
    // const givenRedFlagsData = [];
    const [givenGreenFlagsData, setGivenGreenFlagsData] = useState([]);
    const [givenRedFlagsData, setGivenRedFlagsData] = useState([]);
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
            const userId = '8';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: `
                            query GetShinkUser($userId: String!) {
                                getShinkUser(userId: $userId) {
                                    images
                                    bio
                                    datePreference
                                    datePreferenceAgeMax
                                    datePreferenceAgeMin
                                    datePreferenceGender
                                    datePreferenceOrientation
                                    gender
                                    interests
                                    isVerified
                                    isAgreementCompleted
                                    location
                                    name
                                    phoneNumber
                                    relationshipStatus
                                    sexuality
                                    spotifyMusicInterests
                                    userId
                                    givenGreenFlags
	                                givenRedFlags
	                                receivedGreenFlags
	                                receivedRedFlags
                                }
                            }
                        `,
                        variables: { userId: userId },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                setUserData(data);
                console.log(userData?.data?.getShinkUser?.userId);
                setGivenGreenFlagsData(userData?.data?.getShinkUser?.givenGreenFlags);
                setGivenRedFlagsData(userData?.data?.getShinkUser?.givenRedFlags);
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetch('https://9ni2jo54ce.execute-api.ap-south-1.amazonaws.com/default/getUser', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userid: '0',
    //         }),
    //     }).then((response) => response.json()).then(
    //         data => {
    //             // console.log(data[0].receivedFlags);
    //             data[0].givenFlags.filter((flag) => {
    //                 // console.log(flag);
    //                 if (flag.type === 'green') {
    //                     setGivenGreenFlagsData((prevFlag) =>
    //                         [...prevFlag, flag]);
    //                 }
    //                 if (flag.type === 'red') {
    //                     setGivenRedFlagsData((prevFlag) =>
    //                         [...prevFlag, flag]);
    //                 }
    //             });
    //             // console.log('Given Green Flags : ', givenGreenFlagsData);
    //             // console.log('Given Red Flags : ', givenRedFlagsData);
    //         });
    //     return;
    // }, []);

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

    // const givenGreenFlagDataItems = [
    //     {
    //         id: 'smart',
    //         type: 'green',
    //         flagName: 'Smart',
    //     },
    //     {
    //         id: 'funny',
    //         type: 'green',
    //         flagName: 'Funny',
    //     },
    //     {
    //         id: 'sexy',
    //         type: 'green',
    //         flagName: 'Sexy',
    //     },
    //     {
    //         id: 'cute',
    //         type: 'green',
    //         flagName: 'Cute',
    //     },
    //     {
    //         id: 'polite',
    //         type: 'green',
    //         flagName: 'Polite',
    //     },
    // ];

    // const givenRedFlagDataItems = [
    //     {
    //         id: 'ghoster',
    //         type: 'red',
    //         flagName: 'Ghoster',
    //     },
    // ];

    const greenFlagDataItems = [
        {
            id: 'smart',
            type: 'green',
            flagName: 'Smart',
        },
        {
            id: 'funny',
            type: 'green',
            flagName: 'Funny',
        },
        {
            id: 'sexy',
            type: 'green',
            flagName: 'Sexy',
        },
        {
            id: 'cute',
            type: 'green',
            flagName: 'Cute',
        },
        {
            id: 'honest',
            type: 'green',
            flagName: 'Honest',
        },
        {
            id: 'kind',
            type: 'green',
            flagName: 'Kind',
        },
        {
            id: 'polite',
            type: 'green',
            flagName: 'Polite',
        },
        {
            id: 'generous',
            type: 'green',
            flagName: 'Generous',
        },
        {
            id: 'other',
            type: 'green',
            flagName: 'Other',
        },
    ];

    const redFlagDataItems = [
        {
            id: 'ghoster',
            type: 'red',
            flagName: 'Ghoster',
        },
        {
            id: 'catfish',
            type: 'red',
            flagName: 'Catfish',
        },
        {
            id: 'badpicsender',
            type: 'red',
            flagName: 'Bad Pic Sender',
        },
        {
            id: 'pottiemouth',
            type: 'red',
            flagName: 'Pottie Mouth',
        },
        {
            id: 'stalker',
            type: 'red',
            flagName: 'Stalker',
        },
        {
            id: 'fakeprofile',
            type: 'red',
            flagName: 'Fake Profile',
        },
        {
            id: 'scammer',
            type: 'red',
            flagName: 'Scammer',
        },
        {
            id: 'married',
            type: 'red',
            flagName: 'Married',
        },
    ];

    const onRedFlagSubmitButtonPressed = async () => {
        setIsRedFlagModalOpened(false);
        // const response = await fetch('https://6m4ezkr8m4.execute-api.ap-south-1.amazonaws.com/default/updateFlag', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(selectedRedFlags[0]),
        // });
        // const userData = await response.json();
        // console.log(userData);
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
                            "userId": '8',
                            "givenRedFlags": selectedGivenRedFlags,
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
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
                            "userId": '8',
                            "receivedRedFlags": selectedReceivedRedFlags,
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
        setMessageText('Thank you for submitting.');
        setTimeout(() => {
            setMessageText('');
        }, 2000);
    };

    const onGreenFlagSubmitButtonPressed = async () => {
        setIsGreenFlagModalOpened(false);
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
                            "userId": '8',
                            "givenGreenFlags": selectedGivenGreenFlags,
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
        //update both the users data simultaneously.
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
                            "userId": '8',
                            "receivedGreenFlags": selectedReceivedGreenFlags,
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
        setMessageText('Thank you for submitting.');
        setTimeout(() => {
            setMessageText('');
        }, 2000);
    };

    const handleOnPress = () => {
        navigation.navigate('FlagTypeSelection', {
            setIsGreenFlagModalOpened: setIsGreenFlagModalOpened,
            setIsRedFlagModalOpened: setIsRedFlagModalOpened,
            editing: true,
        });
    };

    useEffect(() => {
        if (isGreenFlagModalOpened === true) {
            greenFlagModalizeRef.current?.open();
        }
        if (isRedFlagModalOpened === true) {
            redFlagModalizeRef.current?.open();
        }
    }, [isGreenFlagModalOpened, isRedFlagModalOpened]);


    const onGreenFlagButtonPressed = () => {
        // setIsGreenFlagModalOpened(false);
        greenFlagModalizeRef.current?.close();
    };

    const onRedFlagButtonPressed = () => {
        // setIsRedFlagModalOpened(false);
        redFlagModalizeRef.current?.close();
    };

    // const onRedFlagSubmitButtonPressed = () => {
    //     redFlagModalizeRef.current?.close();
    //     setMessageText('Thank you for submitting.');
    //     setTimeout(() => {
    //         setMessageText('');
    //     }, 2000);
    // };

    // const onGreenFlagSubmitButtonPressed = () => {
    //     greenFlagModalizeRef.current?.close();
    //     setMessageText('Thank you for submitting.');
    //     setTimeout(() => {
    //         setMessageText('');
    //     }, 2000);
    // };

    // const totalGivenGreenFlags = Object.keys(givenGreenFlagsData).length;
    // const totalGivenRedFlags = Object.keys(givenRedFlagsData).length;

    return (
        <>
            {/* <Modalize ref={redFlagModalizeRef}
                snapPoint={535}
                onClose={() => setIsRedFlagModalOpened(false)}
                onBackButtonPressed={() => setIsRedFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Red Flags</Text>
                        {modalRedFlagDataItems?.map((item, index) => (
                            <ModalRedFlagItems key={index}
                                item={item} selectedRedFlags={selectedRedFlags}
                                setSelectedRedFlags={setSelectedRedFlags} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedRedFlags?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onRedFlagSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modalize> */}
            <Modalize ref={redFlagModalizeRef}
                snapPoint={535}
                onClose={() => setIsRedFlagModalOpened(false)}
                onBackButtonPressed={() => setIsRedFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onRedFlagButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onRedFlagButtonPressed()} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Red Flags</Text>
                        {redFlagDataItems.map((item, index) => (
                            <ModalRedFlagItems key={index}
                                item={item} selectedGivenRedFlags={selectedGivenRedFlags}
                                setSelectedGivenRedFlags={setSelectedGivenRedFlags}
                                selectedReceivedRedFlags={selectedReceivedRedFlags}
                                setSelectedReceivedRedFlags={setSelectedReceivedRedFlags} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedGivenRedFlags?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onRedFlagSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modalize>
            {/* <Modalize ref={greenFlagModalizeRef}
                snapPoint={535}
                onClose={() => setIsGreenFlagModalOpened(false)}
                onBackButtonPressed={() => setIsGreenFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Green Flags</Text>
                        {modalGreenFlagDataItems?.map((item, index) => (
                            <ModalGreenFlagItems key={index}
                                item={item} selectedGreenFlags={selectedGreenFlags}
                                setSelectedGreenFlags={setSelectedGreenFlags} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedGreenFlags?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onGreenFlagSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </Modalize> */}
            <Modalize ref={greenFlagModalizeRef}
                snapPoint={585}
                onClose={() => setIsGreenFlagModalOpened(false)}
                onBackButtonPressed={() => setIsGreenFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onGreenFlagButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onGreenFlagButtonPressed()} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Green Flags</Text>
                        {greenFlagDataItems.map((item, index) => (
                            <ModalGreenFlagItems key={index}
                                item={item} selectedGivenGreenFlags={selectedGivenGreenFlags}
                                setSelectedGivenGreenFlags={setSelectedGivenGreenFlags}
                                selectedReceivedGreenFlags={selectedReceivedGreenFlags}
                                setSelectedReceivedGreenFlags={setSelectedReceivedGreenFlags} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedGivenGreenFlags?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onGreenFlagSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modalize>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.totalFlagsHeaderContainer}>
                    <Text style={styles.totalTextStyle}>Total</Text>
                    <View style={styles.flagsButtonContainer}>
                        <View style={[styles.flagButtonContainer,
                        { backgroundColor: '#34a853' }]}>
                            <Text style={styles.textStyle}>{givenGreenFlagsData?.length === undefined ? 0 :
                                givenGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/white-flag.png')}
                                style={styles.imageStyle} />
                        </View>
                        <View style={[styles.flagButtonContainer,
                        { backgroundColor: '#eb4335' }]}>
                            <Text style={styles.textStyle}>{givenRedFlagsData?.length === undefined ? 0 :
                                givenRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/white-flag.png')}
                                style={styles.imageStyle} />
                        </View>
                    </View>
                </View>
                <View style={styles.flagContainer}>
                    <View style={styles.flagHeaderContainer}>
                        <View style={styles.flagSubContainer}>
                            <Image source={require('../assets/images/user2.png')}
                                style={styles.userImageStyle} />
                            <Text style={styles.userNameTextStyle}>Emma</Text>
                        </View>
                        <View style={styles.flagSubContainer}>
                            <Text style={{ marginLeft: 0 }}>{givenRedFlagsData?.length === undefined ? 0 :
                                givenRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/red-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                            <Text style={{ marginLeft: 2 }}>{givenGreenFlagsData?.length === undefined ? 0 :
                                givenGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/green-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                        </View>
                    </View>
                    <View style={styles.flagBottomContainer}>
                        <Text style={[styles.subTitleTextStyle, { marginBottom: 8 }]}>All Flags</Text>
                        <View style={styles.flagItemsContainer}>
                            {givenGreenFlagsData?.map((item, index) => (
                                <View style={[styles.flagContentContainer,
                                { borderColor: '#34a853' }]} key={index}>
                                    <Image source={items[item.id]} style={styles.flagItemImageStyle} />
                                    <Text style={styles.flagNameTextStyle}>{item.flagName}</Text>
                                </View>
                            ))}
                        </View>
                        <Pressable style={styles.editButtonContainer}
                            onPress={() => handleOnPress()}>
                            <Text style={styles.editTextStyle}>Edit</Text>
                            <Image source={require('../assets/images/edit-icon.png')} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.flagContainer}>
                    <View style={styles.flagHeaderContainer}>
                        <View style={styles.flagSubContainer}>
                            <Image source={require('../assets/images/user4.png')}
                                style={styles.userImageStyle} />
                            <Text style={styles.userNameTextStyle}>Sana</Text>
                        </View>
                        <View style={styles.flagSubContainer}>
                            <Text style={{ marginLeft: 0 }}>{givenRedFlagsData?.length === undefined ? 0 :
                                givenRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/red-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                            <Text style={{ marginLeft: 2 }}>{givenGreenFlagsData?.length === undefined ? 0 :
                                givenGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/green-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                        </View>
                    </View>
                    <View style={styles.flagBottomContainer}>
                        <Text style={[styles.subTitleTextStyle, { marginBottom: 8 }]}>All Flags</Text>
                        <View style={styles.flagItemsContainer}>
                            {givenRedFlagsData?.map((item, index) => (
                                <View style={[styles.flagContentContainer,
                                { borderColor: '#eb4335' }]} key={index}>
                                    <Image source={items[item.id]} style={styles.flagItemImageStyle} />
                                    <Text style={styles.flagNameTextStyle}>{item.flagName}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={[styles.subTitleTextStyle, { marginBottom: 10 }]}>Commented</Text>
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentTextStyle}>Theooking like Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's stand text of the printing and typesetting text of the printing.
                            Lorem Ipsum has been the industry's stand text of the printing.
                        </Text>
                    </View>
                    <Pressable style={styles.editButtonContainer}
                        onPress={() => handleOnPress()}>
                        <Text style={styles.editTextStyle}>Edit</Text>
                        <Image source={require('../assets/images/edit-icon.png')} />
                    </Pressable>
                </View>
            </ScrollView>
            {messageText !== '' && (
                <View style={styles.messageTextContainer}>
                    <Text style={styles.messageTextStyle}>{messageText}</Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginBottom: 15,
    },
    headerContainer: {
        padding: 8,
        width: 'auto',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#9e5594',
        gap: 8,
    },
    headerSubContainer: {
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTextStyle: {
        marginLeft: 12,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    flagsButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flagButtonContainer: {
        marginHorizontal: 11,
        width: 84,
        height: 49,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    textStyle: {
        marginRight: 3,
        color: '#ffffff',
    },
    totalTextStyle: {
        marginLeft: 3.5,
        fontSize: 33.5,
        fontWeight: '700',
        fontFamily: 'AvenirNext-Bold',
        color: '#9e5594',
        lineHeight: 42,
    },
    totalFlagsHeaderContainer: {
        paddingHorizontal: 16,
        paddingVertical: 15,
        marginTop: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    imageStyle: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    flagContainer: {
        paddingHorizontal: 16,
        paddingVertical: 15,
        marginTop: 13,
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    flagHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userImageStyle: {
        width: 43,
        height: 43,
        resizeMode: 'contain',
    },
    userNameTextStyle: {
        marginLeft: 13,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    flagSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagImageStyle: {
        marginHorizontal: 3,
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    subTitleTextStyle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 21,
    },
    flagContentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginHorizontal: 3,
        height: 52,
        flexBasis: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    flagItemImageStyle: {
        width: 23,
        height: 23,
    },
    flagNameTextStyle: {
        fontSize: 11.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    flagBottomContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    flagItemsContainer: {
        marginRight: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    commentTextStyle: {
        fontSize: 12.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
    },
    editButtonContainer: {
        marginTop: 15,
        width: 66,
        height: 21,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#ebeef2',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 12,
    },
    editTextStyle: {
        marginRight: 5,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#4e80dd',
        lineHeight: 16,
    },
    messageTextContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: '5%',
        width: '78%',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 8,
    },
    messageTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9D4EDD',
        lineHeight: 21,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(53, 78, 102, 0.1)',
    },
    modalSubContainer: {
        marginTop: 'auto',
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalHeaderButtonContainer: {
        marginTop: 6,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitleTextStyle: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#666666',
        lineHeight: 21,
    },
    bottomContainer: {
        marginTop: 'auto',
        padding: 13,
        borderWidth: 1,
        borderColor: '#f4f4f4',
    },
    buttonContainer: {
        padding: 6.5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
    },
});

export default GivenFlagsScreen;
