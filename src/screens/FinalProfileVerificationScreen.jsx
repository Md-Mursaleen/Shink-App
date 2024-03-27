/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    View, Image, Text, TouchableOpacity,
    Modal, Dimensions, Animated,
} from 'react-native';
import { verifiedSvg, notVerifiedSvg } from '../data/SvgImageData';
import { SvgXml } from 'react-native-svg';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const FinalProfileVerificationScreen = ({ route, navigation }) => {
    const { photoUri } = route.params;
    const [originalImage, setOriginalImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [showVerified, setShowVerified] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [slideAnimation] = useState(new Animated.Value(0));

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    useEffect(() => {
        console.log('Received photo URI: ', photoUri);
        fetchUserData();
    }, []);

    const handleSubmitButtonPressed = async () => {
        try {
            const userId = '999'; // Assuming you have the userId available
            const imageData = {
                photoData: await encodeImage(photoUri),
                originalImageData: await encodeImage(originalImage),
            };
            const response = await fetch('https://0nu58yoot1.execute-api.ap-south-1.amazonaws.com/default/UserVerification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    imageData,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.message === 'Faces match') {
                    setModalVisible(true);
                } else {
                    console.log('Faces do not match.');
                    setShowSecondModal(true);
                }
            } else {
                console.error('Error while submitting image data: ', response.statusText);
            }
        } catch (error) {
            console.error('Error while submitting image data: ', error);
        }
    };

    const encodeImage = async (imageUri) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const base64String = await blobToBase64(blob);
            return base64String;
        } catch (error) {
            console.error('Error encoding image: ', error);
            return null;
        }
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
    };

    const handleRetakeButtonPressed = () => {
        navigation.goBack();
    };

    const fetchUserData = async () => {
        const NEW_API = 'https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql';
        const userId = '999';
        try {
            const query = `
                query GetShinkUser($userId: String!) {
                    getShinkUser(userId: $userId) {
                        images
                    }
                }
            `;
            const response = await fetch(NEW_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-cwrojubjkncp7gpd6kvsnlv5sa',
                },
                body: JSON.stringify({
                    query,
                    variables: { userId },
                }),
            });
            const { data, errors } = await response.json();
            console.log('API Response from fetch user data: ', { data, errors });
            if (data && data.getShinkUser && data.getShinkUser.images &&
                data.getShinkUser.images.length > 0) {
                const firstImage = JSON.parse(data.getShinkUser.images[0]);
                console.log('Properties of the first image: ', firstImage);
                setOriginalImage(firstImage.original); // Set the original image URI
            } else {
                console.log('No images found for the user.');
            }
        } catch (error) {
            console.error('Error while fetching user data: ', error);
        }
    };

    const handleRetryButtonPressed = () => {
        navigation.navigate('ProfileVerification'); // Navigate to VerificationScreen
    };

    const handleDoneButtonPressed = async () => {

    };

    const handleWhatCanIDoButtonPressed = async () => {

    };

    useEffect(() => {
        if (modalVisible) {
            const timer = setTimeout(() => {
                setModalVisible(false);
                setShowVerified(true);
            }, 5000); // Set timer to 10 seconds (10000 milliseconds)
            return () => clearTimeout(timer);
        }
    }, [modalVisible]);

    useEffect(() => {
        if (showSecondModal) {
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    }, [showSecondModal]);

    const secondModalTranslateY = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [800, (Dimensions.get('window').height * 0.7) / 2 - 100],
    });

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4e40b3', '#4e40b3', '#4e40b3']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Verification</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Fantastic</Text>
                <Text style={styles.subTextStyle}>You look amazing!</Text>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: photoUri }}
                        style={styles.imageStyle} />
                </View>
                {showVerified && (
                    <View style={styles.verifiedIconContainer}>
                        <SvgXml xml={verifiedSvg}
                            width="64" height="64" />
                    </View>
                )}
                {originalImage && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: originalImage }}
                            style={styles.imageStyle} />
                    </View>
                )}
            </View>
            <View style={styles.buttonsContainer}>
                {showVerified ? (
                    <TouchableOpacity onPress={() => handleDoneButtonPressed()}
                        style={styles.buttonContainer} >
                        <Text style={styles.buttonTextStyle}>Done</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => handleSubmitButtonPressed()}
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonTextStyle}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRetakeButtonPressed()}
                            style={styles.retakeButtonContainer}>
                            <Text style={styles.retakeButtonTextStyle}>Retake</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View>
                    <View style={[styles.modalContainer, { backgroundColor: '#a69bea' }]}>
                        <View style={styles.outerCircleContainer}>
                            <View style={styles.innerCircle1Container}>
                                <View style={styles.innerCircle2Container}>
                                    <View style={styles.innerCircle3Container}>
                                        <Image source={require('../assets/images/verified.gif')}
                                            style={styles.verifiedImageStyle} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide"
                transparent={true}
                visible={showSecondModal}
                onRequestClose={() => setShowSecondModal(false)}>
                <Animated.View style={[styles.secondModalContainer,
                { transform: [{ translateY: secondModalTranslateY }] }]}>
                    <View style={[styles.outerCircleContainer, {
                        width: '100%', height: '70%', borderRadius: 0,
                    }]}>
                        <View style={styles.secondInnerCircle1Container}>
                            <View style={styles.secondInnerCircle2Container}>
                                <View style={styles.secondInnerCircle3Container}>
                                    <Image source={require('../assets/images/not-verified.png')}
                                        style={styles.notVerifiedImageStyle} />
                                    <Text style={styles.modalTitleTextStyle}>Not Matching</Text>
                                    <Text style={styles.modalSubTitleTextStyle}>
                                        The verification was unsuccessful</Text>
                                    <TouchableOpacity onPress={() => handleRetryButtonPressed()}
                                        style={styles.retryButtonContainer}>
                                        <Text style={styles.retrybuttonTextStyle}>Retry</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWhatCanIDoButtonPressed()}
                                        style={styles.whatButtonContainer}>
                                        <Text style={styles.whatButtonTextStyle}>
                                            What can I do?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        </View>
    );
};

const styles = {
    navigationBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
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
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    textContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    textStyle: {
        marginBottom: 10,
        marginTop: 20,
        fontSize: 40,
        fontWeight: '900',
        color: '#4e40b3',
    },
    subTextStyle: {
        top: -10,
        color: '#4e40b3',
        fontWeight: '400',
        fontSize: 30,
    },
    subContainer: {
        paddingHorizontal: 20,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    imageStyle: {
        width: 150,
        height: 250,
        borderRadius: 12,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        paddingVertical: 15,
        marginBottom: 10,
        height: 48,
        width: 328,
        alignItems: 'center',
        backgroundColor: '#4e40b3',
        borderRadius: 8,
    },
    retakeButtonContainer: {
        paddingVertical: 12,
        marginBottom: 10,
        height: 48,
        width: 328,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: '#4e40b3',
        borderRadius: 8,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ffffff',
    },
    retakeButtonTextStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4e40b3',
    },
    modalContainer: {
        height: 800, // Adjust height as needed
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    outerCircleContainer: {
        width: 700,
        height: 700,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdd2fe',
        borderRadius: 50,
    },
    innerCircle1Container: {
        width: 500,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e9ff',
        borderRadius: 50,
    },
    innerCircle2Container: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d4dff9',
        borderRadius: 50,
    },
    innerCircle3Container: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bdcff1',
        borderRadius: 50,
    },
    verifiedImageStyle: {
        width: 218,
        height: 218,
    },
    verifiedIconContainer: {
        position: 'absolute',
        top: '55%', // Place it vertically in the middle
        left: '63%', // Place it horizontally in the middle
        transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust to center it properly
        zIndex: 2,
    },
    secondModalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    secondModalTextStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4e40b3',
    },
    secondInnerCircle1Container: {
        width: 700,
        height: 700,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc4fe',
        borderRadius: 50,
    },
    secondInnerCircle2Container: {
        width: 650,
        height: 650,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2d6fe',
        borderRadius: 50,
    },
    secondInnerCircle3Container: {
        width: 600,
        height: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e2ebff',
        borderRadius: 50,
    },
    modalTitleTextStyle: {
        marginTop: 20,
        fontSize: 40,
        fontWeight: '900',
        color: '#4e40b3',
    },
    modalSubTitleTextStyle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '400',
        color: '#4e40b3',
        textAlign: 'center',
    },
    retryButtonContainer: {
        top: 60,
        paddingVertical: 15,
        marginBottom: 10,
        height: 48,
        width: 328,
        alignItems: 'center',
        backgroundColor: '#4e40b3',
        borderRadius: 8,
    },
    whatButtonContainer: {
        top: 70,
        paddingVertical: 12,
        marginBottom: 10,
        height: 48,
        width: 328,
        alignItems: 'center',
        backgroundColor: '#e2ebff',
        borderWidth: 3,
        borderColor: '#4e40b3',
        borderRadius: 8,
    },
    whatButtonTextStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4e40b3',
    },
    retrybuttonTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff',
    },
    notVerifiedImageStyle: {
        width: 148,
        height: 148,
    },
};

export default FinalProfileVerificationScreen;

