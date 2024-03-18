/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, ScrollView, TextInput } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';
import { data } from '../data/ChatData';
import { normalize } from '../components/theme';
import { Modalize } from 'react-native-modalize';
import { SvgXml } from 'react-native-svg';
import { attachmentSvg } from '../data/SvgImageData';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatItem from '../components/ChatItem';
import ModalGreenFlagItems from '../components/ModalGreenFlagItems';
import ModalRedFlagItems from '../components/ModalRedFlagItems';
import ModalReportItems from '../components/ModalReportItems';
import ReportItems from '../components/ReportItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalFlagItems from '../components/ModalFlagItems';

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

const reportDataItems = [
    {
        id: '1',
        name: 'Fake profile, Seems like scammer',
    },
    {
        id: '2',
        name: 'Unfair Content',
    },
    {
        id: '3',
        name: 'Scam or Advertisement',
    },
    {
        id: '4',
        name: 'Off Shink Behaviour',
    },
    {
        id: '5',
        name: 'Underage',
    },
];

const reportItem1DataItems = [
    {
        id: '1',
        name: 'Using photo from someone I know',
    },
    {
        id: '2',
        name: 'Using my photo',
    },
    {
        id: '3',
        name: 'Using photo from someone famous',
    },
    {
        id: '4',
        name: 'Fake location',
    },
    {
        id: '5',
        name: 'Limited information',
    },
    {
        id: '6',
        name: 'Other',
    },
];

const reportItem2DataItems = [
    {
        id: '1',
        name: 'Text on profile are Unfair',
    },
    {
        id: '2',
        name: 'Photo on profile are Unfair',
    },
    {
        id: '3',
        name: 'Other',
    },
];

const reportItem3DataItems = [
    {
        id: '1',
        name: 'Promoting social media',
    },
    {
        id: '2',
        name: 'Contact details on profile',
    },
    {
        id: '3',
        name: 'Selling product or services',
    },
    {
        id: '4',
        name: 'Feel like Spam',
    },
    {
        id: '5',
        name: 'Other',
    },
];

const reportItem4DataItems = [
    {
        id: '1',
        name: 'Bad experience on date',
    },
    {
        id: '2',
        name: 'Physical violence',
    },
    {
        id: '3',
        name: 'This person has a history of criminal activity',
    },
    {
        id: '4',
        name: 'The person sent me sexual message and photos',
    },
    {
        id: '5',
        name: 'This person sent me abusive message',
    },
    {
        id: '6',
        name: 'The person assaulted me',
    },
    {
        id: '7',
        name: 'I met this person and want to report',
    },
    {
        id: '8',
        name: 'Harassed me on another platform',
    },
    {
        id: '9',
        name: 'This person is a convicted criminal',
    },
    {
        id: '10',
        name: 'Other',
    },
];

const reportItem5DataItems = [
    {
        id: '1',
        name: 'I know this person They are under 18',
    },
    {
        id: '2',
        name: 'The profile says they are under 18',
    },
    {
        id: '3',
        name: 'They are look under 18',
    },
    {
        id: '4',
        name: 'Other',
    },
];

const AllChatScreen = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const navigation = useNavigation();
    const greenFlagModalizeRef = useRef(null);
    const redFlagModalizeRef = useRef(null);
    const reportModalizeRef = useRef(null);
    const reportItemsModalizeRef = useRef(null);
    const [isGreenFlagModalOpened, setIsGreenFlagModalOpened] = useState(false);
    const [isRedFlagModalOpened, setIsRedFlagModalOpened] = useState(false);
    const [isReportModalOpened, setIsReportModalOpened] = useState(false);
    const [isReportItemsModalOpened, setIsReportItemsModalOpened] = useState(false);
    const [selectedGivenGreenFlags, setSelectedGivenGreenFlags] = useState([]);
    const [selectedReceivedGreenFlags, setSelectedReceivedGreenFlags] = useState([]);
    const [selectedGivenRedFlags, setSelectedGivenRedFlags] = useState([]);
    const [selectedReceivedRedFlags, setSelectedReceivedRedFlags] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [chatData, setChatData] = useState(data);
    const [selectedReportOptions, setSelectedReportOptions] = useState([]);
    const [selectedReportOptionsData, setSelectedReportOptionsData] = useState([]);
    const [selectedReportSubOptionsData, setSelectedReportSubOptionsData] = useState([]);
    const [isReportItemSelected, setIsReportItemSelected] = useState(false);
    const [requiredData, setRequiredData] = useState(reportItem1DataItems);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUserForUnmatched, setSelectedUserForUnmatched] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [reportText, setReportText] = useState('');

    const onFlagButtonPressed = (item) => {
        if (item.category !== 'new-match') {
            navigation.navigate('FlagTypeSelection', {
                setIsGreenFlagModalOpened: setIsGreenFlagModalOpened,
                setIsRedFlagModalOpened: setIsRedFlagModalOpened,
                editing: false,
            });
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
        ]).then(dataItem => {
            const formattedData = {};
            dataItem.forEach(item => {
                const key = item[0];
                let value = item[1];
                // Parse JSON strings if needed
                if (key === 'location' || key === 'likes') {
                    value = JSON.parse(value);
                } else if (key === 'music') {
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

    const onReportButtonPressed = () => {
        reportModalizeRef?.current.open();
    };

    useEffect(() => {
        if (isGreenFlagModalOpened === true) {
            setIsGreenFlagModalOpened(true);
        }
        if (isRedFlagModalOpened === true) {
            setIsRedFlagModalOpened(true);
        }
        if (isReportModalOpened === true) {
            setIsReportModalOpened(true);
        }
        if (isReportItemsModalOpened === true) {
            setIsReportItemsModalOpened(true);
        }
    }, [isGreenFlagModalOpened, isRedFlagModalOpened, isReportModalOpened, isReportItemsModalOpened]);

    useEffect(() => {
        if (isReportModalOpened === false) {
            reportModalizeRef.current?.close();
        }
    }, [isReportModalOpened]);

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

    const onReportSubmitButtonPressed = async () => {
        reportModalizeRef.current?.close();
        let objectToBePut = {
            reportType: selectedReportOptionsData[0].reportItemName,
            reportedByUserId: '5',
            // reportItemId: selectedReportOptionsData[0].reportItemId,
            // userId: '0',
            reportSubType: selectedReportSubOptionsData[0].reportSubItemName,
            comments: '',
            // reportSubItemId: selectedReportSubOptionsData[0].reportSubItemId,
        };
        const arrayObjectToBePut = [JSON.stringify(objectToBePut)];
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
                            "reports": arrayObjectToBePut,
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }
        setMessageText('Thank you for reporting.');
        setTimeout(() => {
            setMessageText('');
        }, 2000);
    };

    const onGreenFlagSubmitButtonPressed = async () => {
        greenFlagModalizeRef.current?.close();
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

    const deletingChatItem = async (chatItem) => {
        const newChatItems = chatData.filter((item, index) =>
            item.userId !== chatItem.userId);
        setChatData(newChatItems);
    };

    // console.log(selectedRedFlags);

    const onGreenFlagButtonPressed = () => {
        // setIsGreenFlagModalOpened(false);
        greenFlagModalizeRef.current?.close();
    };

    const onRedFlagButtonPressed = () => {
        // setIsRedFlagModalOpened(false);
        redFlagModalizeRef.current?.close();
    };

    const onReportModalButtonPressed = () => {
        // setIsRedFlagModalOpened(false);
        reportModalizeRef.current?.close();
    };

    // const onReportItemsModalButtonPressed = () => {
    //     setIsReportItemsModalOpened(false);
    // };

    // useEffect(() => {
    //     if (selectedReportOptions[selectedReportOptions.length - 1] === 'Fake profile, Seems like scammer') {
    //         setRequiredData(reportItem1DataItems);
    //     }
    //     if (selectedReportOptions[selectedReportOptions.length - 1] === 'Unfair Content') {
    //         setRequiredData(reportItem2DataItems);
    //     }
    //     if (selectedReportOptions[selectedReportOptions.length - 1] === 'Scam or Advertisement') {
    //         setRequiredData(reportItem3DataItems);
    //     }
    //     if (selectedReportOptions[selectedReportOptions.length - 1] === 'Off Shink Behaviour') {
    //         setRequiredData(reportItem4DataItems);
    //     }
    //     if (selectedReportOptions[selectedReportOptions.length - 1] === 'Underage') {
    //         setRequiredData(reportItem5DataItems);
    //     }
    // }, [selectedReportOptions]);

    const handleConfirmButtonPressed = () => {
        setShowPopup(false);
    };

    const handleCancelPopup = () => {
        setShowPopup(false);
    };

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const handleUnmatchButtonPressed = (item) => {
        setShowPopup(true);
        setSelectedUserForUnmatched(item.name);
        let newUnmatchedUserData = {
            userId: generateString(5),
            name: '',
            type: 'by you',
            statusShown: `${item.name} was unmatched by you`,
            category: 'old-match',
        };
    };

    useEffect(() => {
        if (isGreenFlagModalOpened === true) {
            greenFlagModalizeRef.current?.open();
        }
        if (isRedFlagModalOpened === true) {
            redFlagModalizeRef.current?.open();
        }
    }, [isGreenFlagModalOpened, isRedFlagModalOpened]);

    console.log(selectedGivenRedFlags);

    return (
        <>
            <SwipeListView data={chatData}
                renderItem={({ item }) => (
                    <>
                        <ChatItem item={item} />

                    </>
                )}
                rightOpenValue={-355}
                disableRightSwipe
                keyExtractor={({ id }, index) => `${id}${index}`}
                renderHiddenItem={({ item }) => (
                    item.type === 'deleted' || item.type === 'banned' ||
                        item.type === 'blocked' ? (
                        item.type === 'blocked' ? (
                            <View style={styles.swipeButtonsContainer}>
                                <Pressable style={[styles.swipeButtonContainer,
                                item.category === 'new-match' ?
                                    { backgroundColor: '#f2f2f2' } : { backgroundColor: '#9d4edd' }]}
                                    onPress={() => onFlagButtonPressed(item)}>
                                    <Text style={styles.swipeButtonContainerTextStyle}>Flag</Text>
                                </Pressable>
                                <Pressable style={[styles.swipeButtonContainer,
                                { backgroundColor: '#e0e0e0' }]}>
                                    <Text style={[styles.swipeButtonContainerTextStyle,
                                    { color: '#000000' }]}>Unmatch</Text>
                                </Pressable>
                                <Pressable style={[styles.swipeButtonContainer,
                                { backgroundColor: '#eb4335' }]}
                                    onPress={() => onReportButtonPressed()}>
                                    <Text style={styles.swipeButtonContainerTextStyle}>Report</Text>
                                </Pressable>
                                <Pressable style={[styles.swipeButtonContainer, {
                                    backgroundColor: '#ffc1bc',
                                }]}
                                    onPress={() => deletingChatItem(item)}>
                                    <Image source={require('../assets/images/delete-button.png')}
                                        style={styles.deleteButtonImageStyle} />
                                    <Text style={styles.deleteTextStyle}>Delete</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <Pressable style={styles.deleteButtonContainer}
                                onPress={() => deletingChatItem(item)}>
                                <Image source={require('../assets/images/delete-button.png')}
                                    style={styles.deleteButtonImageStyle} />
                                <Text style={styles.deleteTextStyle}>Delete</Text>
                            </Pressable>
                        )
                    ) : (
                        <View style={styles.swipeButtonsContainer}>
                            <Pressable style={[styles.swipeButtonContainer,
                            item.category === 'new-match' ?
                                { backgroundColor: '#f2f2f2' } : { backgroundColor: '#9d4edd' }]}
                                onPress={() => onFlagButtonPressed(item)}>
                                <Text style={styles.swipeButtonContainerTextStyle}>Flag</Text>
                            </Pressable>
                            <Pressable style={[styles.swipeButtonContainer,
                            { backgroundColor: '#e0e0e0' }]}
                                onPress={() => handleUnmatchButtonPressed(item)}>
                                <Text style={[styles.swipeButtonContainerTextStyle,
                                { color: '#000000' }]}>Unmatch</Text>
                            </Pressable>
                            <Pressable style={[styles.swipeButtonContainer,
                            { backgroundColor: '#eb4335' }]}
                                onPress={() => onReportButtonPressed()}>
                                <Text style={styles.swipeButtonContainerTextStyle}>Report</Text>
                            </Pressable>
                        </View>
                    )
                )}
                style={styles.container}
                ListHeaderComponent={
                    <>
                    </>
                }
                ListFooterComponent={
                    <>
                        {messageText !== '' && (
                            <View style={styles.messageTextContainer}>
                                <Text style={styles.messageTextStyle}>{messageText}</Text>
                            </View>
                        )}
                    </>
                } />
            {/* <Modal animationType="slide"
                transparent={true}
                visible={isReportItemsModalOpened}
                onRequestClose={() => setIsReportItemsModalOpened(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalSubContainer,
                    selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Fake profile, Seems like scammer' && { height: '69.8%' }
                    || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Unfair Content' && { height: '43.5%' } || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Scam or Advertisement' && { height: '58.5%' }
                    || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Off Shink Behaviour' && { height: '97.2%' }
                    || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Underage' && { height: '51.5%' }]}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onReportItemsModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onReportItemsModalButtonPressed()}
                                style={{ marginRight: 8 }} />
                        </View>
                        <Text style={styles.reportItemsModalTitleTextStyle}>
                            {selectedReportOptions[selectedReportOptions.length - 1]}</Text>
                        {requiredData.map((item, index) => (
                            <ReportItems key={index}
                                item={item} selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                isReportItemSelected={isReportItemSelected}
                                setIsReportItemSelected={setIsReportItemSelected}
                                setSelectedReportSubOptionsData={setSelectedReportSubOptionsData}
                                selectedReportSubOptionsData={selectedReportSubOptionsData}
                                selectedReportOptions={selectedReportOptions} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedOptions?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onReportItemsSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal> */}
            {/* <Modalize ref={reportItemsModalizeRef}
                snapPoint={
                    selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Fake profile, Seems like scammer' && 530 || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Unfair Content' && 320 || selectedReportOptions[selectedReportOptions.length - 1] ===
                    'Scam or Advertisement' && 440
                }
                onClose={() => setIsReportItemsModalOpened(false)}
                onBackButtonPressed={() => setIsReportItemsModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onReportItemsModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onReportItemsModalButtonPressed()}
                                style={{ marginRight: 8 }} />
                        </View>
                        <Text style={styles.reportItemsModalTitleTextStyle}>
                            {selectedReportOptions[selectedReportOptions.length - 1]}</Text>
                        {requiredData.map((item, index) => (
                            <ReportItems key={index}
                                item={item} selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                isReportItemSelected={isReportItemSelected}
                                setIsReportItemSelected={setIsReportItemSelected} />
                        ))}
                        <View style={styles.bottomContainer}>
                            <Pressable style={[styles.buttonContainer,
                            selectedOptions?.length >= 1 ?
                                { backgroundColor: '#9d4edd' } :
                                { backgroundColor: '#e0e0e0' }]}
                                onPress={() => onReportItemsSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modalize> */}
            {/* <Modal animationType="slide"
                transparent={true}
                visible={isReportModalOpened}
                onRequestClose={() => setIsReportModalOpened(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalSubContainer, {
                        paddingBottom: 8,
                        height: '56%',
                    }]}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onReportModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={16} color={'#cfd3d6'}
                                onPress={() => onReportModalButtonPressed()}
                                style={{ marginRight: 8 }} />
                        </View>
                        <Text style={styles.reportModalTitleTextStyle}>Report</Text>
                        <Text style={styles.reportModalSubTitleTextStyle}>Your report will be kept private</Text>
                        {reportDataItems.map((item, index) => (
                            <ModalReportItems key={index}
                                item={item} selectedReportOptions={selectedReportOptions}
                                setSelectedReportOptions={setSelectedReportOptions}
                                setSelectedReportOptionsData={setSelectedReportOptionsData}
                                selectedReportOptionsData={selectedReportOptionsData}
                                setIsReportModalOpened={setIsReportModalOpened}
                                setIsReportItemsModalOpened={setIsReportItemsModalOpened} />
                        ))}
                    </View>
                </View>
            </Modal> */}
            <Modalize ref={reportModalizeRef}
                snapPoint={485}
                onClose={() => setIsReportModalOpened(false)}
                onBackButtonPressed={() => setIsReportModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onReportModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onReportModalButtonPressed()}
                                style={{ marginRight: 5 }} />
                        </View>
                        <Text style={styles.reportModalTitleTextStyle}>Report</Text>
                        <Text style={styles.reportModalSubTitleTextStyle}>
                            Your report will be kept private</Text>
                        <View style={{ marginHorizontal: 15 }}>
                            <View style={[styles.modalTextInputContainer,
                            { height: normalize(50) }]}>
                                <TextInput editable
                                    placeholder="eg: vinay@gmail.com"
                                    placeholderTextColor={'#979797'}
                                    value={userEmail}
                                    onChangeText={text => setUserEmail(text)}
                                    style={styles.textInputStyle} />
                            </View>
                            <View style={[styles.modalTextInputContainer,
                            { height: normalize(125) }]}>
                                <TextInput editable
                                    multiline
                                    placeholder="Write your report here"
                                    placeholderTextColor={'#979797'}
                                    value={reportText}
                                    onChangeText={text => setReportText(text)}
                                    style={styles.textInputStyle} />
                            </View>
                        </View>
                        <Text style={styles.reportModalTextStyle}>
                            You can also attach screenshots and pictures to make your complaint clearer.</Text>
                        <Pressable style={styles.attachDocumentButtonContainer} >
                            <SvgXml xml={attachmentSvg}
                                style={styles.attachIconStyle} />
                            <Text style={styles.attachDocumentButtonTextStyle}>
                                Attach Document</Text>
                        </Pressable>
                        <View style={styles.bottomContainer}>
                            <Pressable onPress={() => onReportSubmitButtonPressed()}
                                style={[styles.buttonContainer,
                                (userEmail !== '' && reportText !== '') ?
                                    { backgroundColor: '#9d4edd' } :
                                    { backgroundColor: '#e0e0e0' }]}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modalize>
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
                                onPress={() => onRedFlagButtonPressed()}
                                style={{ marginRight: 5 }} />
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
            {/* <Modal animationType="slide"
                transparent={true}
                visible={isRedFlagModalOpened}
                onRequestClose={() => setIsRedFlagModalOpened(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalSubContainer, {
                        height: '70.5%',
                    }]}>
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
            </Modal> */}
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
                                onPress={() => onGreenFlagButtonPressed()}
                                style={{ marginRight: 5 }} />
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
            {/* <Modal animationType="slide"
                transparent={true}
                visible={isGreenFlagModalOpened}
                onRequestClose={() => setIsGreenFlagModalOpened(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalSubContainer, {
                        height: '75%',
                    }]}>
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
            </Modal> */}
            <Modal animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupContentContainer}>
                        <Text style={styles.popupTitleTextStyle}>Are you sure?</Text>
                        <Text style={styles.popupSubtitleTextStyle}>
                            Once you are Unmatched <Text style={[styles.popupSubtitleTextStyle, {
                                fontSize: 14, fontWeight: 'bold', color: '#000000',
                            }]}>{selectedUserForUnmatched}, </Text>you will not be able to interact further
                        </Text>
                        <View style={styles.popupButtonsContainer}>
                            <Pressable onPress={() => handleCancelPopup()}
                                style={styles.popupCancelButtonContainer}>
                                <Text style={styles.popupCancelButtonTextStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => handleConfirmButtonPressed()}
                                style={styles.popupButtonContainer}>
                                <Text style={styles.popupButtonTextStyle}>Confirm</Text>
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
        flex: 1,
        backgroundColor: '#ffffff',
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
    swipeButtonsContainer: {
        flex: 1,
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeButtonContainer: {
        width: 90,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeButtonContainerTextStyle: {
        fontSize: 10,
        fontWeight: '400',
        color: '#ffffff',
        lineHeight: 16,
    },
    TopTabContainer: {
        width: '100%',
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ebeef2',
    },
    TopTabSubContainer: {
        width: 80,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topTabLabelTextStyle: {
        fontSize: 12.5,
        textAlign: 'center',
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
        marginTop: 7,
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
        fontWeight: '400',
        fontFamily: 'AvenirNext-Bold',
        color: '#666666',
        lineHeight: 21,
    },
    bottomContainer: {
        padding: 10,
        // marginTop: 'auto',
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
    subContainer: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 5,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
    imageStyle: {
        width: 23,
        height: 23,
    },
    flagNameTextStyle: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    checkboxStyle: {
        flex: 1,
        marginLeft: -40,
    },
    messageTextContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: '12%',
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
        color: '#9d4edd',
        lineHeight: 21,
    },
    deleteButtonContainer: {
        flex: 1,
        marginLeft: 'auto',
        width: 90,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffc1bc',
    },
    deleteTextStyle: {
        marginTop: 2.5,
        fontSize: 10.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#eb4335',
        textAlign: 'center',
        lineHeight: 16,
    },
    deleteButtonImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    reportModalTitleTextStyle: {
        marginTop: normalize(12),
        marginBottom: normalize(10),
        marginLeft: normalize(15),
        fontSize: 24.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#000000',
        lineHeight: 32,
    },
    reportModalSubTitleTextStyle: {
        marginBottom: normalize(11),
        marginLeft: normalize(15),
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 16,
    },
    modalTextInputContainer: {
        paddingHorizontal: normalize(13),
        marginVertical: normalize(5),
        width: '100%',
        borderWidth: 1.2,
        borderColor: '#cfd3d6',
        borderRadius: 10,
    },
    textInputStyle: {
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    reportItemsModalTitleTextStyle: {
        marginTop: 11,
        marginBottom: 13,
        width: 320,
        marginLeft: 16,
        fontSize: 24.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#000000',
        lineHeight: 32,
    },
    popupContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.32)',
    },
    popupContentContainer: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: '90%',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    popupTitleTextStyle: {
        marginBottom: 5,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
    },
    popupSubtitleTextStyle: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#666666',
        textAlign: 'left',
        lineHeight: 21,
    },
    popupButtonsContainer: {
        marginTop: normalize(28),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    popupCancelButtonContainer: {
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
        backgroundColor: '#eb4335',
        borderRadius: 5,
    },
    popupCancelButtonTextStyle: {
        fontSize: normalize(14),
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#1a1a1a',
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
    reportModalTextStyle: {
        marginTop: normalize(10),
        marginBottom: normalize(18),
        marginLeft: normalize(15),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    attachDocumentButtonContainer: {
        padding: normalize(7),
        marginHorizontal: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    attachIconStyle: {
        marginRight: normalize(10),
        width: 20,
        height: 20,
    },
    attachDocumentButtonTextStyle: {
        fontSize: 15.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
});

export default AllChatScreen;
