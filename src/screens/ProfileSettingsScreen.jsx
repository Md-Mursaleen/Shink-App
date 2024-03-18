/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Modal,
    TextInput, Image, ScrollView, Pressable, Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { smallRightIconSvg, shinkLogoSvg } from '../data/SvgImageData';
import { Modalize } from 'react-native-modalize';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileSettingsScreen = () => {
    const navigation = useNavigation();
    const phoneNumber = AsyncStorage.getItem('phoneNumber');
    const emailModalizeRef = useRef(null);
    const [isEmailModalOpened, setIsEmailModalOpened] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isHideNameEnabled, setIsHideNameEnabled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [confirmedButtonPressed, setConfirmedButtonPressed] = useState(false);

    useEffect(() => {
        if (isEmailModalOpened === false) {
            emailModalizeRef.current?.close();
        }
    }, [isEmailModalOpened]);

    const onEmailSubmitButtonPressed = async () => {
        setIsEmailModalOpened(false);
    };

    const onEmailModalButtonPressed = () => {
        // setIsRedFlagModalOpened(false);
        emailModalizeRef.current?.close();
    };

    const handleNamePress = () => {
        navigation.navigate('SettingsName');
    };

    const handleAddEmailPress = () => {
        emailModalizeRef?.current.open();
    };

    const handleNotificationsPress = () => {
    };

    const handleHideYourFullNamePress = () => {
    };

    const handlePurchaseHistoryPress = () => {
        navigation.navigate('PurchasesHistory');
    };

    const handleFAQPress = () => {
        navigation.navigate('FAQ');
    };

    const handleSupportPress = () => {
        navigation.navigate('Support');
    };

    const handleTermsandConditionsPress = () => {
        navigation.navigate('TermsAndConditions');
    };

    const handleDeactivatePress = () => {
        setShowPopup(true);
    };

    const handleDeleteAccountPress = () => {
        navigation.navigate('DeleteAccount');
    };

    const handleLogoutPress = () => {
        navigation.navigate('Login');
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleConfirmButtonPressed = () => {
        setConfirmedButtonPressed(true);
        setShowPopup(false);
    };

    const handleCancelPopup = () => {
        setShowPopup(false);
    };

    const RenderSettingsItem = ({ onPress, title }) => {
        return (
            <TouchableOpacity onPress={() => onPress()}
                style={[styles.buttonContainer, title === 'Mobile Number' && {
                    padding: normalize(14.5),
                    backgroundColor: '#f2f2f2',
                }]}>
                <View style={styles.buttonContentContainer}>
                    <Text style={[styles.buttonTextStyle, title === 'Your Profile Deactivated' &&
                        confirmedButtonPressed === true && { color: '#eb4335' }]}>{title}</Text>
                    {title === 'Mobile Number' ? (
                        <Text style={styles.phoneNumberTextStyle}>7982928791</Text>
                    ) : (
                        title === 'Notifications' || title === 'Hide Your Full Name' ? (
                            <Switch value={title === 'Notifications' ?
                                isNotificationsEnabled : isHideNameEnabled}
                                trackColor={{ false: '#000000', true: '#9e5594' }}
                                thumbColor={'#ffffff'}
                                onValueChange={(value) => title === 'Notifications' ?
                                    setIsNotificationsEnabled(value) : setIsHideNameEnabled(value)}
                                style={{ marginRight: '-6%' }} />
                        ) : (
                            title === 'Logout' ? (
                                <></>
                            ) : (
                                title === 'Your Profile Deactivated' ? (
                                    confirmedButtonPressed === true ? (
                                        <Text style={styles.turnOnTextStyle}>Turn on</Text>
                                    ) : (
                                        < SvgXml xml={smallRightIconSvg}
                                            style={styles.rightArrowImageStyle} />
                                    )
                                ) : (
                                    <SvgXml xml={smallRightIconSvg}
                                        style={styles.rightArrowImageStyle} />
                                )
                            )
                        )
                    )}
                </View>
            </TouchableOpacity>
        );
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
                        <Text style={styles.titleTextStyle}>Settings</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.bodyContainer}>
                        {/* // Name Button */}
                        <RenderSettingsItem onPress={() => handleNamePress()}
                            title="Name" />

                        {/* // Mobile Number Button */}
                        <RenderSettingsItem
                            title="Mobile Number" />

                        {/* Add Email Button */}
                        <RenderSettingsItem onPress={() => handleAddEmailPress()}
                            title="Add Email" />

                        {/* // Notifications Button */}
                        <RenderSettingsItem onPress={() => handleNotificationsPress()}
                            title="Notifications" />

                        {/* // Hide Your Full Name Button */}
                        <RenderSettingsItem onPress={() => handleHideYourFullNamePress()}
                            title="Hide Your Full Name" />

                        {/* // Purchase History Button */}
                        <RenderSettingsItem onPress={() => handlePurchaseHistoryPress()}
                            title="Purchase History" />

                        {/* // FAQ Button */}
                        <RenderSettingsItem onPress={() => handleFAQPress()}
                            title="FAQ" />

                        {/* // Support Button */}
                        <RenderSettingsItem onPress={() => handleSupportPress()}
                            title="Support" />

                        {/* // Terms and Conditions Button */}
                        <RenderSettingsItem onPress={() => handleTermsandConditionsPress()}
                            title="Terms and Conditions" />

                        {/* // Deactivate Button */}
                        <RenderSettingsItem onPress={() => handleDeactivatePress()}
                            title={confirmedButtonPressed === true ?
                                'Your Profile Deactivated' : 'Deactivate'} />

                        {/* // Delete Account Button */}
                        <RenderSettingsItem onPress={() => handleDeleteAccountPress()}
                            title="Delete Account" />

                        {/* // Logout Button */}
                        <RenderSettingsItem onPress={() => handleLogoutPress()}
                            title="Logout" />
                    </View>
                    <View style={styles.footerContainer}>
                        <SvgXml xml={shinkLogoSvg}
                            style={styles.logoImageStyle} />
                        <Text style={styles.footerTextStyle}>Version: 1.237.7</Text>
                    </View>
                </ScrollView>
            </View>
            <Modalize ref={emailModalizeRef}
                snapPoint={220}
                onClose={() => setIsEmailModalOpened(false)}
                onBackButtonPressed={() => setIsEmailModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalSubContainer}>
                        <View style={styles.modalHeaderButtonContainer}>
                            <Entypo name="chevron-small-left" size={25} color={'#cfd3d6'}
                                onPress={() => onEmailModalButtonPressed()} />
                            <AntDesign name="closecircleo" size={17} color={'#cfd3d6'}
                                onPress={() => onEmailModalButtonPressed()}
                                style={{ marginRight: 5 }} />
                        </View>
                        <Text style={styles.emailModalTitleTextStyle}>What is your email?</Text>
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
                        </View>
                        <View style={styles.bottomContainer}>
                            <Pressable onPress={() => onEmailSubmitButtonPressed()}
                                style={[styles.modalButtonContainer,
                                (userEmail !== '') ?
                                    { backgroundColor: '#9d4edd' } :
                                    { backgroundColor: '#e0e0e0' }]}>
                                <Text style={styles.modalButtonTextStyle}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modalize>
            <Modal animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}>
                <View style={styles.popupContainer}>
                    <View style={styles.popupContentContainer}>
                        <Text style={styles.popupTitleTextStyle}>Are you sure?</Text>
                        <Text style={styles.popupSubtitleTextStyle}>
                            If you deactivate your account, no one can see your profile.
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
    bodyContainer: {
        flex: 1,
        padding: normalize(10),
        marginTop: normalize(10),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(12),
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    buttonContentContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonTextStyle: {
        fontSize: 16.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    rightArrowImageStyle: {
        marginRight: '-7%',
        tintColor: '#979797',
    },
    phoneNumberTextStyle: {
        marginRight: '-4%',
        fontSize: 13.3,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regukar',
        color: '#9d4edd',
        lineHeight: 16,
    },
    footerContainer: {
        marginBottom: normalize(18),
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImageStyle: {
        width: normalize(200),
        height: normalize(50),
    },
    footerTextStyle: {
        marginTop: normalize(13),
        fontSize: 13.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regukar',
        color: '#000000',
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
    emailModalTitleTextStyle: {
        marginTop: normalize(12),
        marginBottom: normalize(10),
        marginLeft: normalize(15),
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    modalTextInputContainer: {
        paddingHorizontal: normalize(13),
        marginVertical: normalize(5),
        width: '100%',
        borderWidth: 1.2,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    textInputStyle: {
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    bottomContainer: {
        padding: 10,
        // marginTop: 'auto',
        borderWidth: 1,
        borderColor: '#f4f4f4',
    },
    modalButtonContainer: {
        padding: 6.5,
        marginHorizontal: 10,
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
    turnOnTextStyle: {
        marginRight: '-5%',
        fontSize: normalize(13),
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#9d4edd',
        textAlign: 'center',
        lineHeight: 16,
    },
});

export default ProfileSettingsScreen;
