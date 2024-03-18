/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Image, Pressable, TextInput, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const DeleteAccountScreen = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');
    const [commentText, setCommentText] =
        useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleConfirmButtonPressed = () => {
        setShowPopup(false);
    };

    const handleCancelPopup = () => {
        setShowPopup(false);
    };

    const handleSubmitButtonPressed = async () => {
        if (selectedOption) {
            setShowPopup(true);
            console.log('Selected Option: ', selectedOption);
            console.log('Option sent to backend successfully.');
            // Logic for navigating to the next screen or performing any other action
        } else {
            setSelectedOption('Skipped');
            console.log('No option selected. Selected Option set to "Skipped".');
            // Logic for navigating to the next screen or performing any other action
        }
    };

    return (
        <>
            <View style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.navigationBarStyle}>
                    <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                        style={styles.rowContainer}>
                        <Image source={require('../assets/images/white-left-arrow.png')}
                            style={styles.backImageStyle} />
                        <Text style={styles.titleTextStyle}>Delete Account</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.contentContainer}>
                    <Text style={styles.subTitleTextStyle}>
                        Please select what best describes the information.
                    </Text>
                    <OptionButton label="This application not helpful."
                        selected={selectedOption === 'This application not helpful.'}
                        onPress={() => setSelectedOption('This application not helpful.')} />
                    <OptionButton label="I am not finding anyone in this application."
                        onPress={() => setSelectedOption('I am not finding anyone in this application.')}
                        selected={selectedOption === 'I am not finding anyone in this application.'} />
                    <OptionButton label="Other"
                        onPress={() => setSelectedOption('Other')}
                        selected={selectedOption === 'Other'} />
                </View>
                {selectedOption === 'Other' && (
                    <View style={{ marginHorizontal: 15 }}>
                        <View style={styles.commentContainer}>
                            <TextInput editable
                                multiline
                                placeholder="Please provide the reason you are deleting it."
                                placeholderTextColor={'#979797'}
                                value={commentText}
                                onChangeText={text => setCommentText(text)}
                                style={styles.textInputStyle} />
                        </View>
                    </View>
                )}
                {selectedOption !== '' ? (
                    selectedOption === 'Other' ? (
                        commentText !== '' ? (
                            <LinearGradient start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#c680b2', '#9e5594', '#7b337e']}
                                style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handleSubmitButtonPressed()}>
                                    <Text style={styles.buttonTextStyle}>Delete Account</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        ) : (
                            <Pressable onPress={() => handleSubmitButtonPressed()}
                                style={[styles.buttonContainer,
                                { backgroundColor: '#e0e0e0' }]}>
                                <Text style={styles.buttonTextStyle}>Delete Account</Text>
                            </Pressable>
                        )
                    ) : (
                        <LinearGradient start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#c680b2', '#9e5594', '#7b337e']}
                            style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleSubmitButtonPressed()}>
                                <Text style={styles.buttonTextStyle}>Delete Account</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    )
                ) : (
                    <Pressable onPress={() => handleSubmitButtonPressed()}
                        style={[styles.buttonContainer,
                        { backgroundColor: '#e0e0e0' }]}>
                        <Text style={styles.buttonTextStyle}>Delete Account</Text>
                    </Pressable>
                )}
            </View >
            <Modal animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupContentContainer}>
                        <Text style={styles.popupTitleTextStyle}>Are you sure?</Text>
                        <Text style={styles.popupSubtitleTextStyle}>
                            If you delete your account it once, you will lose all your data within 180 days.
                            If you log in with the same number within 180 days, your account will be recovered.
                        </Text>
                        <Text style={styles.termsTextStyle}>Read our terms conditions</Text>
                        <View style={styles.popupButtonsContainer}>
                            <Pressable onPress={() => handleCancelPopup()}
                                style={styles.popupCancelButtonContainer}>
                                <Text style={styles.popupCancelButtonTextStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => handleConfirmButtonPressed()}
                                style={styles.popupButtonContainer}>
                                <Text style={styles.popupButtonTextStyle}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const OptionButton = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}
            style={styles.optionButtonContainer}>
            <View style={styles.radioButtonOuterContainer}>
                {selected && <View style={styles.radioButtonInnerContainer} />}
            </View>
            <Text style={styles.optionButtonTextStyle}>{label}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
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
    contentContainer: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(15),
    },
    subTitleTextStyle: {
        marginBottom: normalize(15),
        marginLeft: normalize(5),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    optionButtonContainer: {
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        marginBottom: normalize(10),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButtonTextStyle: {
        marginLeft: normalize(13),
        fontSize: 13.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    radioButtonOuterContainer: {
        width: normalize(20),
        height: normalize(20),
        marginRight: normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#979797',
        borderRadius: 10,
    },
    radioButtonInnerContainer: {
        width: normalize(10),
        height: normalize(10),
        backgroundColor: '#b3b3b3',
        borderRadius: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: '5%', // Set margin horizontally to 5% on both sides
        marginBottom: normalize(20), // Adjust margin bottom if needed
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        zIndex: 1,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
    },
    commentContainer: {
        paddingHorizontal: normalize(13),
        marginVertical: normalize(5),
        width: '100%',
        height: 123,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cfd3d6',
    },
    textInputStyle: {
        width: normalize(295),
        fontSize: 13,
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
        backgroundColor: 'rgba(26, 26, 26, 0.32)',
    },
    popupContentContainer: {
        paddingVertical: normalize(14),
        paddingHorizontal: normalize(24),
        width: '90%',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    popupTitleTextStyle: {
        marginBottom: normalize(10),
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
    termsTextStyle: {
        marginTop: normalize(10),
        alignSelf: 'center',
        fontSize: normalize(13.8),
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#4292ff',
        textDecorationLine: 'underline',
        lineHeight: 21,
    },
});

export default DeleteAccountScreen;
