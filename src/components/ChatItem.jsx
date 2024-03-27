/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWebSocket } from '../contexts/WebSocketContext';
import { normalize } from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = {
    user1: require('../../src/assets/images/user1.png'),
    user2: require('../../src/assets/images/user2.png'),
    user3: require('../../src/assets/images/user3.png'),
    user4: require('../../src/assets/images/user4.png'),
    user5: require('../../src/assets/images/user5.png'),
    user6: require('../../src/assets/images/user6.png'),
    user7: require('../../src/assets/images/user4.png'),
};

const ChatItem = ({ item }) => {
    const navigation = useNavigation();
    const { userId, name, img, type, message, status, category,
        message_received, message_sent, connectionStatus, statusShown } = item;
    const [userConnectionStatus, setUserConnectionStatus] = useState('');
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const [userTypingStatus, setUserTypingStatus] = useState(false);
    const [userImage, setUserImage] = useState();
    const { ws } = useWebSocket();

    useEffect(() => {
        setUserImage(img);
        setUserConnectionStatus(connectionStatus);
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.status === 'online' || data.status === 'offline') {
                if (data.userId === userId) {
                    setUserConnectionStatus(data.status);
                }
            }
            const updateLocalUnreadMessageCount = async () => {
                const unreadMessageCount = await AsyncStorage.getItem('unreadMessageCount');
                const parsedUnreadMessageCount = JSON.parse(unreadMessageCount);
                const updatedUnreadMessageCount = parsedUnreadMessageCount + 1;
                await AsyncStorage.setItem('unreadMessageCount',
                    JSON.stringify(updatedUnreadMessageCount));
            };
            if (data.status === 'message') {
                setUnreadMessageCount((prev) => prev + 1);
                updateLocalUnreadMessageCount();
            }
            if (data.status === 'typing' || data.status === '!typing') {
                if (data.userId === userId) {
                    if (data.status === 'typing') {
                        setUserTypingStatus(true);
                    }
                    if (data.status === '!typing') {
                        setUserTypingStatus(false);
                    }
                }
            }
        };
    }, []);

    const handleChatNavigation = () => {
        setUnreadMessageCount(0);
        navigation.navigate('UserChat',
            {
                selectedUser: {
                    userId: userId,
                    name: name,
                    profilePhoto: item.profilePhoto,
                },
            });
    };

    return (
        <Pressable onPress={() => handleChatNavigation()}
            style={[styles.container, type === 'blocked' ?
                { backgroundColor: '#f2f2f2' } : { backgroundColor: '#ffffff' }]}>
            <View>
                <Image source={items[userId]} style={[styles.imageStyle, name === 'Deleted User' &&
                    { width: normalize(45), height: normalize(45) }]} />
                <Image source={userConnectionStatus === 'online'
                    ? require('../assets/images/user-online.png') :
                    require('../assets/images/user-offline.png')}
                    style={styles.statusImageStyle} />
                {type === 'blocked' && (
                    <>
                        <Image source={require('../assets/images/blocked-user-image.png')}
                            style={styles.iconStyle} />
                        <Image source={require('../assets/images/hand-image.png')}
                            style={styles.handIconStyle} />
                    </>
                )}
            </View>
            <View style={styles.subContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.userNameTextStyle}>{name}</Text>
                    <View style={styles.textSubContainer}>
                        {(status === 'read' && message_received === false && message_sent === true)
                            && (
                                <Image source={require('../assets/images/read-line-duotone.png')} />
                            )}
                        {type === 'deleted' || type === 'banned' ||
                            type === 'blocked' ? (
                            <Text style={styles.statusTextStyle}>{statusShown}</Text>
                        ) : (
                            <Text style={[styles.messageTextStyle,
                            category === 'new-match' && { color: '#9d4edd' }]}>{message}</Text>
                        )}
                        {userTypingStatus &&
                            <Text style={styles.typingStatusTextStyle}>typing...</Text>}
                    </View>
                </View>
                {category === 'new-match' && (
                    <View style={styles.newMatchContainer}>
                        <Text style={styles.newMatchTextStyle}>New Match</Text>
                    </View>
                )}
                {(category === 'old-match' && message_received === true && message_sent === false) && (
                    <View style={styles.yourTurnContainer}>
                        <Text style={styles.yourTurnTextStyle}>Your Turn</Text>
                    </View>
                )}
                {unreadMessageCount > 0 ?
                    <View style={styles.userMessageCountContainer}>
                        <Text style={styles.userMessageCountTextStyle}>{unreadMessageCount}</Text>
                    </View> : null}
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: normalize(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
    },
    itemLeftContainer: {
        position: 'relative',
        width: normalize(50),
        height: normalize(50),
        zIndex: 1,
    },
    imageStyle: {
        width: normalize(50),
        height: normalize(50),
        resizeMode: 'contain',
        borderRadius: 50,
    },
    statusImageStyle: {
        position: 'absolute',
        bottom: normalize(0),
        right: normalize(0),
        width: normalize(17),
        height: normalize(17),
        borderWidth: 4,
        borderColor: '#ffffff',
        borderRadius: 10,
        zIndex: 5,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: normalize(12),
        flexDirection: 'column',
    },
    userNameTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        lineHeight: 21,
    },
    textSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newMatchContainer: {
        padding: normalize(2),
        marginLeft: 'auto',
        width: normalize(68),
        height: normalize(23),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9d4edd',
        borderRadius: 50,
    },
    newMatchTextStyle: {
        fontSize: 10.5,
        fontWeight: '400',
        color: '#ffffff',
        lineHeight: 16,
    },
    yourTurnContainer: {
        padding: normalize(3),
        marginLeft: 'auto',
        marginRight: normalize(2),
        width: normalize(60),
        height: normalize(22),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 50,
    },
    yourTurnTextStyle: {
        fontSize: 10.5,
        fontWeight: '400',
        color: '#9e5594',
        lineHeight: 16,
    },
    messageTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#666666',
        lineHeight: 21,
    },
    statusTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    iconStyle: {
        flex: 2,
        position: 'absolute',
        marginTop: '35%',
        marginRight: 'auto',
        width: normalize(24),
        height: normalize(24),
        resizeMode: 'contain',
    },
    typingStatusTextStyle: {
        fontSize: 13,
        color: '#34a853',
        fontWeight: 'bold',
    },
    handIconStyle: {
        flex: 1,
        position: 'absolute',
        marginRight: 'auto',
        marginLeft: '10%',
        marginTop: '40%',
        width: normalize(12),
        height: normalize(12),
        resizeMode: 'contain',
    },
    userMessageCountContainer: {
        position: 'absolute',
        right: normalize(10),
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(3.2),
        marginLeft: normalize(10),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34a853',
        borderRadius: 12,
    },
    userMessageCountTextStyle: {
        fontSize: 10,
        fontWeight: '400',
        color: '#ffffff',
    },
});

export default ChatItem;