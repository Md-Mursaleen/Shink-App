/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { unmatchedUserData } from '../data/UnmatchedUserData';
import { Modalize } from 'react-native-modalize';
import { normalize } from '../components/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalGreenFlagItems from '../components/ModalGreenFlagItems';
import ModalRedFlagItems from '../components/ModalRedFlagItems';

const items = {
    unmatched_user1: require('../../src/assets/images/unmatched-user1.png'),
    unmatched_user2: require('../../src/assets/images/unmatched-user2.png'),
    unmatched_user3: require('../../src/assets/images/unmatched-user3.png'),
};

const UnmatchedChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const greenFlagModalizeRef = useRef(null);
    const redFlagModalizeRef = useRef(null);
    const [isGreenFlagModalOpened, setIsGreenFlagModalOpened] = useState(false);
    const [isRedFlagModalOpened, setIsRedFlagModalOpened] = useState(false);
    const [selectedGreenFlags, setSelectedGreenFlags] = useState([]);
    const [selectedRedFlags, setSelectedRedFlags] = useState([]);
    const [messageText, setMessageText] = useState('');

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
        if (isGreenFlagModalOpened === true) {
            greenFlagModalizeRef.current?.open();
        }
        if (isRedFlagModalOpened === true) {
            redFlagModalizeRef.current?.open();
        }
    }, [isGreenFlagModalOpened, isRedFlagModalOpened]);

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

    const onRedFlagSubmitButtonPressed = () => {
        redFlagModalizeRef.current?.close();
        setMessageText('Thank you for submitting.');
        setTimeout(() => {
            setMessageText('');
        }, 2000);
    };

    const onGreenFlagSubmitButtonPressed = () => {
        greenFlagModalizeRef.current?.close();
        setMessageText('Thank you for submitting.');
        setTimeout(() => {
            setMessageText('');
        }, 2000);
    };

    const onGreenFlagbuttonPressed = () => {
        greenFlagModalizeRef.current?.close();
    };

    const onRedFlagbuttonPressed = () => {
        redFlagModalizeRef.current?.close();
    };

    return (
        <>
            <Modalize ref={redFlagModalizeRef}
                snapPoint={535}
                onClose={() => setIsRedFlagModalOpened(false)}
                onBackButtonPressed={() => setIsRedFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onRedFlagbuttonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onRedFlagbuttonPressed()} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Red Flags</Text>
                        {redFlagDataItems.map((item, index) => (
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
            </Modalize>
            <Modalize ref={greenFlagModalizeRef}
                snapPoint={535}
                onClose={() => setIsGreenFlagModalOpened(false)}
                onBackButtonPressed={() => setIsGreenFlagModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <ScrollView style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onGreenFlagbuttonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onGreenFlagbuttonPressed()} />
                        </View>
                        <Text style={styles.modalTitleTextStyle}>Green Flags</Text>
                        {greenFlagDataItems.map((item, index) => (
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
            </Modalize>
            <View style={styles.container}>
                {unmatchedUserData.map((item, index) => (
                    <View style={[styles.itemContainer,
                    item.type !== 'by you' ? { backgroundColor: '#f0e4fa' } : { backgroundColor: '#e0e0e0' },
                    ]} key={index}>
                        <View style={styles.itemSubContainer}>
                            <Image source={items[item.userId]}
                                style={styles.imageStyle} />
                            <Text style={styles.textStyle}>{item.statusShown}</Text>
                        </View>
                        <Pressable style={[styles.swipeButtonContainer,
                        item.category === 'new-match' ?
                            { backgroundColor: '#f2f2f2' } : { backgroundColor: '#9d4edd' }]}
                            onPress={() => onFlagButtonPressed(item)}>
                            <Text style={styles.swipeButtonContainerTextStyle}>Flag</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
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
        flex: 1,
        backgroundColor: '#ffffff',
    },
    itemContainer: {
        marginVertical: normalize(0.5),
        height: normalize(75),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemSubContainer: {
        marginLeft: normalize(15),
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageStyle: {
        width: normalize(45),
        height: normalize(45),
        resizeMode: 'contain',
    },
    swipeButtonContainer: {
        width: normalize(90),
        height: normalize(75),
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeButtonContainerTextStyle: {
        fontSize: 10,
        fontWeight: '400',
        color: '#ffffff',
        lineHeight: 16,
    },
    textStyle: {
        marginLeft: normalize(14),
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    messageTextContainer: {
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(16),
        marginBottom: normalize(15),
        width: '78%',
        height: normalize(42),
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
        marginTop: normalize(6),
        marginHorizontal: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitleTextStyle: {
        marginTop: normalize(12),
        marginBottom: normalize(12),
        marginLeft: normalize(15),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#666666',
        lineHeight: 21,
    },
    bottomContainer: {
        padding: normalize(10),
        // marginTop: 'auto',
        borderWidth: 1,
        borderColor: '#f4f4f4',
    },
    buttonContainer: {
        padding: normalize(6.5),
        marginHorizontal: normalize(10),
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

export default UnmatchedChatScreen;
