/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Bubble, Composer, GiftedChat, Send } from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadData } from 'aws-amplify/storage';
import { useNavigation } from '@react-navigation/native';
import { useWebSocket } from '../contexts/WebSocketContext';
import { normalize } from '../components/theme';
import closeButtonIcon from '../assets/images/close-icon.png';
import SendIcon from '../assets/images/send.png';
import Loader from 'react-native-modal-loader';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = {
    user1: require('../assets/images/user1.png'),
    user2: require('../assets/images/user2.png'),
    user3: require('../assets/images/user3.png'),
    user4: require('../assets/images/user4.png'),
    user5: require('../assets/images/user5.png'),
    user6: require('../assets/images/user6.png'),
    user7: require('../assets/images/user4.png'),
};

const UserChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const { selectedUser } = route?.params;
    const [selectedImage, setSelectedImage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageMsg, setImageMsg] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState();
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { ws } = useWebSocket();
    const [myId, setMyId] = useState('');
    const [myName, setMyName] = useState('');
    const [isSelectedUserTyping, setIsSelectedUserTyping] = useState(false);
    const [currentChatRoom, setCurrentChatRoom] = useState({});
    const [msg, setMsg] = useState([]);

    function generateRandomId() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    const getChats = (id) => {
        fetch(`
        https://74nw39cs1j.execute-api.eu-north-1.amazonaws.com/dev/messagesApi?user1=${id}&user2=${selectedUser.userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const response = data.map((msg) => {
                    return msg.message;
                });
                setMessages(renderMessages(response));
            });
    };

    useEffect(() => {
        const setUnreadMessageCount = async () => {
            await AsyncStorage.setItem('unreadMessageCount', JSON.stringify(0));
        };
        setUnreadMessageCount();
        const getMyInfo = async () => {
            const userId = await AsyncStorage.getItem('userId');
            const name = await AsyncStorage.getItem('name');
            setMyId(userId);
            setMyName(name);
            getChats(userId);
        };
        getMyInfo();
        ws.onmessage = (e) => {
            const socketData = JSON.parse(e.data);
            if (socketData.status === 'message') {
                const newMsg = socketData.message;
                setMessages(previousMessages => GiftedChat.append(previousMessages, newMsg));
            }
            if (socketData.status === 'typing' || socketData.status === '!typing') {
                setIsSelectedUserTyping(socketData.status === 'typing' ? true : false);
            }
        };
    }, []);

    const [text, setText] = useState('');
    const handleTextInputChange = (inputText) => {
        setText(inputText);
    };

    const renderMessages = (msgs) => {
        return msgs
            ? msgs
                .sort((a, b) => a.createdAt - b.createdAt)
                .reverse()
                .map((msg, index) => ({
                    ...msg,
                    _id: index,
                }))
            : [];
    };

    const onSend = async (msg = []) => {
        setMsg(msg);
        const lastMsgs = currentChatRoom?.messages || [];
        const newMsg = {
            ...msg[0],
            createdAt: new Date().getTime(),
            sent: true,
            received: false,
            isDeleted: false,
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMsg));
        const body = {
            action: "sendmessage", message: { status: "message", message: newMsg },
            recepientId: selectedUser?.userId, senderId: myId,
        };
        ws.send(JSON.stringify(body));
    };

    const imageSelecterHandler = async () => {
        let image;
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        await launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                setSelectedImage(response.assets[0]);
                image = response.assets[0];
                setImageModalVisible(true);
                const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
            }
        });
    };

    const uploadImage = async (filename, uri, image) => {
        try {
            const result = await uploadData({
                key: filename,
                data: image,
            }).result;
            console.log('Succeeded: ', result);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const handleCloseModal = () => {
        setImageModalVisible(false);
        setUploadedImageUrl('');
    };

    const handleSendImage = async () => {
        try {
            const result = await uploadData({
                key: selectedImage?.uri.substring(selectedImage?.uri.lastIndexOf('/') + 1),
                data: selectedImage?.base64,
                options: {
                    accessLevel: 'guest',
                },
            }).result;
            console.log('Succeeded: ', result);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (text || text === '') {
                if (isTyping) {
                    const body = {
                        userId: myId, recepientId: selectedUser?.userId,
                        action: "usertyping", state: "!typing",
                    };
                    ws.send(JSON.stringify(body));
                }
                setIsTyping(false);
            }
        }, 500);
        return () => {
            clearTimeout(delayDebounceFn);
            if (!isTyping) {
                const body = {
                    userId: myId, recepientId: selectedUser?.userId,
                    action: "usertyping", state: "!typing",
                };
                ws.send(JSON.stringify(body));
            }
            setIsTyping(true);
        };
    }, [text]);

    const renderFooter = () => {
        return (
            isSelectedUserTyping &&
            <Text style={styles.typingStatusTextStyle}>{selectedUser?.name} is typing...</Text>
        );
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Loader loading={isLoading} color={'#9d4edd'} />
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Image source={items[selectedUser.userId]} style={styles.imageStyle} />
                    <Text style={styles.userNameTextStyle}>{selectedUser?.name}</Text>
                </TouchableOpacity>
            </LinearGradient>
            <GiftedChat messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: myId,
                }}
                renderUsernameOnMessage={false}
                alwaysShowSend={true}
                showUserAvatar={false}
                minInputToolbarHeight={60}
                scrollToBottom={true}
                isTyping={isTyping}
                renderFooter={renderFooter}
                messagesContainerStyle={{ backgroundColor: '#ffffff' }}
                renderBubble={props => {
                    return (
                        <Bubble {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: '#430d4b',
                                    borderRadius: 10,
                                },
                                left: {
                                    backgroundColor: 'rgba(244, 212, 223, 0.5)',
                                    borderRadius: 10,
                                },
                            }}
                            textStyle={{
                                right: props.currentMessage.isDeleted
                                    ? {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontStyle: 'italic',
                                    }
                                    : {
                                        color: 'rgba(255, 255, 255, 1)',
                                    },
                                left: props.currentMessage.isDeleted
                                    ? {
                                        color: 'rgba(0, 0, 0, 0.4)',
                                        fontStyle: 'italic',
                                    }
                                    : {
                                        color: 'rgba(0, 0, 0, 1)',
                                    },
                            }} />
                    );
                }}
                renderInputToolbar={props => {
                    return (
                        <View style={styles.inputContainer}>
                            <Composer {...props}
                                text={text}
                                placeholder="Type a message"
                                textInputStyle={styles.textInputStyle}
                                onTextChanged={handleTextInputChange} />
                            <TouchableOpacity onPress={() => imageSelecterHandler()}
                                style={{ paddingHorizontal: normalize(10) }}>
                                <Image source={require('../assets/images/gallery-icon.png')}
                                    style={styles.iconStyle} />
                            </TouchableOpacity>
                            <Send {...props} text={text}>
                                <Image source={require('../assets/images/send.png')}
                                    style={styles.sendImageStyle} />
                            </Send>
                        </View>
                    );
                }} />
            <Modal animationType="slide"
                transparent={true} visible={imageModalVisible}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => {
                        setImageModalVisible(!imageModalVisible);
                        setSelectedImage();
                        setImageMsg('');
                    }}
                        activeOpacity={0.5}
                        style={styles.modalSubContainer}>
                        <Image source={closeButtonIcon}
                            style={styles.closeImageStyle} />
                    </TouchableOpacity>
                    <Image source={{ uri: selectedImage?.uri }}
                        style={styles.selectedImageStyle} resizeMode='contain' />
                    <View style={styles.modalBottomContainer}>
                        <TextInput placeholder='Add Caption'
                            placeholderTextColor='#000000'
                            value={imageMsg}
                            onChangeText={text => setImageMsg(text)}
                            style={styles.modalTextInputStyle} />
                        <TouchableOpacity onPress={() => handleSendImage()}>
                            <Image source={SendIcon}
                                style={styles.sendImageStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        width: '100%',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    userNameTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffff',
        lineHeight: 21,
    },
    imageStyle: {
        marginLeft: normalize(15),
        marginRight: normalize(5),
        width: normalize(50),
        height: normalize(50),
        resizeMode: 'contain',
        borderRadius: 50,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    textInputStyle: {
        paddingLeft: normalize(15),
        paddingRight: normalize(15),
        width: '100%',
        backgroundColor: '#eeeeee',
        color: '#000000',
        borderRadius: 20,
    },
    iconStyle: {
        width: normalize(35),
        height: normalize(35),
    },
    sendImageStyle: {
        margin: normalize(7),
        width: normalize(30),
        height: normalize(30),
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,1)',
    },
    modalSubContainer: {
        position: 'absolute',
        top: normalize(30),
        right: normalize(20),
        width: normalize(30),
        height: normalize(30),
        backgroundColor: '#000000',
        borderRadius: 15,
        zIndex: 5,
    },
    modalTextInputStyle: {
        padding: normalize(10),
        width: '90%',
        backgroundColor: '#ffffff',
        fontSize: normalize(14),
        color: '#000000',
        borderRadius: 20,
    },
    closeImageStyle: {
        width: normalize(30),
        height: normalize(30),
    },
    modalBottomContainer: {
        padding: normalize(10),
        marginBottom: normalize(100),
        marginLeft: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedImageStyle: {
        top: normalize(50),
        width: '100%',
        height: '100%',
    },
    typingStatusTextStyle: {
        marginLeft: normalize(10),
        marginBottom: normalize(5),
        color: '#979797',
    },
});

export default UserChatScreen;
