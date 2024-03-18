/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, ScrollView,
    Pressable, TextInput, Modal, Keyboard,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { normalize } from '../components/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ReceivedFlagsScreen = () => {
    // const pushedReceivedGreenFlagsData = [];
    // const pushedReceivedRedFlagsData = [];
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [receivedGreenFlagsData, setReceivedGreenFlagsData] = useState([]);
    const [receivedRedFlagsData, setReceivedRedFlagsData] = useState([]);
    const modalRef = useRef(null);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [commentText, setCommentText] =
        useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (showPopup) {
            Keyboard.dismiss();
        }
    }, [showPopup]);

    const handleOkayButtonPressed = () => {
        setShowPopup(false);
    };

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
                setReceivedGreenFlagsData(userData?.data?.getShinkUser?.receivedGreenFlags);
                setReceivedRedFlagsData(userData?.data?.getShinkUser?.receivedRedFlags);
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
    //             data[0].receivedFlags.filter((flag) => {
    //                 if (flag.type === 'green') {
    //                     setReceivedGreenFlagsData((prevFlag) =>
    //                         [...prevFlag, flag]);
    //                 }
    //                 if (flag.type === 'red') {
    //                     setReceivedRedFlagsData((prevFlag) =>
    //                         [...prevFlag, flag]);
    //                 }
    //             });
    //             // console.log('Received Green Flags : ', receivedGreenFlagsData);
    //             // console.log('Received Red Flags : ', receivedRedFlagsData);
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

    const handleButtonPressed = () => {
        // setIsGreenFlagModalOpened(false);
        modalRef.current?.open();
    };

    const onModalButtonPressed = () => {
        // setIsRedFlagModalOpened(false);
        modalRef.current?.close();
    };

    const onModalSubmitPressed = () => {
        modalRef.current?.close();
        setShowPopup(true);
    };

    // const greenFlagDataItems = [
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

    // const redFlagDataItems = [
    //     {
    //         id: 'fakeprofile',
    //         type: 'red',
    //         flagName: 'Fake Profile',
    //     },
    // ];

    // const totalReceivedGreenFlags = Object.keys(receivedGreenFlagsData).length;
    // const totalReceivedRedFlags = Object.keys(receivedRedFlagsData).length;

    // console.log(receivedGreenFlagsData);

    return (
        <>
            <Modalize ref={modalRef}
                snapPoint={400}
                onClose={() => setIsModalOpened(false)}
                onBackButtonPressed={() => setIsModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onModalButtonPressed()}
                                style={{ marginRight: 5 }} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Red flagged wrongly?</Text>
                        <Text style={styles.modalSubTitleTextStyle}>
                            Please explain why you don't agree with this Red flag.</Text>
                        <View style={{ marginHorizontal: 15 }}>
                            <ScrollView style={styles.modalCommentContainer}>
                                <TextInput editable
                                    multiline
                                    placeholder="Explain here"
                                    placeholderTextColor={'#979797'}
                                    value={commentText}
                                    onChangeText={text => setCommentText(text)}
                                    style={styles.textInputStyle} />
                            </ScrollView>
                        </View>
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.modalButtonContainer,
                            commentText !== '' ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onModalSubmitPressed()}>
                                <Text style={styles.modalButtonTextStyle}>Submit</Text>
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
                            <Text style={styles.textStyle}>{receivedGreenFlagsData?.length === undefined ? 0 :
                                receivedGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/white-flag.png')}
                                style={styles.imageStyle} />
                        </View>
                        <View style={[styles.flagButtonContainer,
                        { backgroundColor: '#eb4335' }]}>
                            <Text style={styles.textStyle}>{receivedRedFlagsData?.length === undefined ? 0 :
                                receivedRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/white-flag.png')}
                                style={styles.imageStyle} />
                        </View>
                    </View>
                </View>
                <View style={styles.flagContainer}>
                    <View style={styles.flagHeaderContainer}>
                        <View style={styles.flagSubContainer}>
                            <Image source={require('../assets/images/user3.png')}
                                style={styles.userImageStyle} />
                            <Text style={styles.userNameTextStyle}>Swati</Text>
                        </View>
                        <View style={styles.flagSubContainer}>
                            <Text style={{ marginLeft: 0 }}>{receivedRedFlagsData?.length === undefined ? 0 :
                                receivedRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/red-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                            <Text style={{ marginLeft: 2 }}>{receivedGreenFlagsData?.length === undefined ? 0 :
                                receivedGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/green-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                        </View>
                    </View>
                    <View style={styles.flagBottomContainer}>
                        <Text style={styles.subTitleTextStyle}>All Flags</Text>
                        <View style={styles.flagItemsContainer}>
                            {receivedGreenFlagsData?.map((item, index) => (
                                <View style={[styles.flagContentContainer,
                                { borderColor: '#34a853' }]} key={index}>
                                    <Image source={items[item.id]} style={styles.flagItemImageStyle} />
                                    <Text style={styles.flagNameTextStyle}>{item.flagName}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.flagContainer}>
                    <View style={styles.flagHeaderContainer}>
                        <View style={styles.flagSubContainer}>
                            <Image source={require('../assets/images/user1.png')}
                                style={styles.userImageStyle} />
                            <Text style={styles.userNameTextStyle}>Emily</Text>
                        </View>
                        <View style={styles.flagSubContainer}>
                            <Text style={{ marginLeft: 0 }}>{receivedRedFlagsData?.length === undefined ? 0 :
                                receivedRedFlagsData?.length}</Text>
                            <Image source={require('../assets/images/red-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                            <Text style={{ marginLeft: 2 }}>{receivedGreenFlagsData?.length === undefined ? 0 :
                                receivedGreenFlagsData?.length}</Text>
                            <Image source={require('../assets/images/green-flag.png')}
                                style={[styles.flagImageStyle, { marginLeft: 5 }]} />
                        </View>
                    </View>
                    <View style={styles.flagBottomContainer}>
                        <Text style={styles.subTitleTextStyle}>All Flags</Text>
                        <View style={styles.flagItemsContainer}>
                            {receivedRedFlagsData?.map((item, index) => (
                                <View style={[styles.flagContentContainer,
                                { borderColor: '#eb4335' }]} key={index}>
                                    <Image source={items[item.id]} style={styles.flagItemImageStyle} />
                                    <Text style={styles.flagNameTextStyle}>{item.flagName}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.subTitleTextStyle}>Commented</Text>
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentTextStyle}>Theooking like Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's stand text of the printing and typesetting text of the printing.
                            Lorem Ipsum has been the industry's stand text of the printing.
                        </Text>
                    </View>
                    <View style={styles.bottomButtonsContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.agreeTextStyle,
                            { color: '#282c3f' }]}>Do you agree with this</Text>
                            <Text style={[styles.agreeTextStyle,
                            { color: '#eb4335' }]}> Red flag</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.buttonContainer, { marginRight: 13 }]}>
                                <Text style={styles.buttonTextStyle}>Yes</Text>
                            </View>
                            <Pressable onPress={() => handleButtonPressed()}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonTextStyle}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupContentContainer}>
                        <Text style={styles.popupTitleTextStyle}>Thanks for submitting.</Text>
                        <Text style={styles.popupSubtitleTextStyle}>
                            We'll look into this and resolve it as soon as we can.
                            If the flag is not valid, we will take it down. Else, it will display on your profile.
                        </Text>
                        <View style={styles.popupButtonsContainer}>
                            <Pressable onPress={() => handleOkayButtonPressed()}
                                style={styles.popupButtonContainer}>
                                <Text style={styles.popupButtonTextStyle}>Okay</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
    bottomButtonsContainer: {
        marginTop: normalize(18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    agreeTextStyle: {
        fontSize: 12.8,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        lineHeight: 16,
    },
    buttonContainer: {
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(11),
        backgroundColor: '#f0e4fa',
        borderWidth: 1,
        borderColor: '#9d4edd',
        borderRadius: 16,
    },
    buttonTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9e5594',
        lineHeight: 16,
    },
    modalContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.32)',
    },
    modalSubContainer: {
        marginTop: 'auto',
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalHeaderButtonContainer: {
        marginTop: normalize(7),
        marginHorizontal: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitleTextStyle: {
        marginTop: normalize(12),
        marginBottom: normalize(12),
        marginLeft: normalize(15),
        fontSize: 16.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    modalSubTitleTextStyle: {
        marginTop: normalize(8),
        marginBottom: normalize(12),
        marginLeft: normalize(15),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    bottomContainer: {
        padding: normalize(10),
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: '#f4f4f4',
    },
    modalButtonContainer: {
        padding: normalize(6.5),
        marginHorizontal: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    modalButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        lineHeight: 23.4,
    },
    modalCommentContainer: {
        paddingHorizontal: normalize(13),
        marginVertical: normalize(5),
        width: '100%',
        height: normalize(158),
        borderWidth: 1.2,
        borderColor: '#cfd3d6',
        borderRadius: 10,
    },
    textInputStyle: {
        width: normalize(290),
        fontSize: 13.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    popupContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53, 78, 102, 0.5)',
    },
    popupContentContainer: {
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(24),
        width: '90%',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    popupTitleTextStyle: {
        marginBottom: normalize(5),
        fontSize: 33,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'left',
        lineHeight: 42,
    },
    popupSubtitleTextStyle: {
        width: normalize(280),
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'left',
        lineHeight: 21,
    },
    popupButtonsContainer: {
        marginTop: normalize(28),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    popupChangeButtonContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(16),
        marginRight: normalize(15),
        backgroundColor: 'transparent',
        borderRadius: normalize(5),
    },
    popupButtonContainer: {
        paddingVertical: normalize(13),
        paddingHorizontal: normalize(18),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9d4edd',
        borderRadius: 5,
    },
    popupChangeButtonTextStyle: {
        fontSize: normalize(14),
        fontWeight: '500',
        fontFamily: 'AvenirNext-Bold',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 16,
    },
    popupButtonTextStyle: {
        fontSize: normalize(13.5),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 16,
    },
});

export default ReceivedFlagsScreen;
