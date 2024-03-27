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
import {
    smallRightIconSvg, editSvg, notificationsIconSvg,
    securityIconSvg, purchaseHistoryIconSvg, supportIconSvg,
    termsAndConditionsIconSvg, faqIconSvg, hamburgerSvg,
    mailIconSvg, profileIconSvg, phoneIconSvg,
} from '../data/SvgImageData';
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
        navigation.navigate('PurchaseHistory');
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

    // const RenderSettingsItem = ({ onPress, title }) => {
    //     return (
    //         <TouchableOpacity onPress={() => onPress()}
    //             style={[styles.buttonContainer, title === 'Mobile Number' && {
    //                 padding: normalize(14.5),
    //                 backgroundColor: '#f2f2f2',
    //             }]}>
    //             <View style={styles.buttonContentContainer}>
    //                 <Text style={[styles.buttonTextStyle, title === 'Your Profile Deactivated' &&
    //                     confirmedButtonPressed === true && { color: '#eb4335' }]}>{title}</Text>
    //                 {title === 'Mobile Number' ? (
    //                     <Text style={styles.phoneNumberTextStyle}>7982928791</Text>
    //                 ) : (
    //                     title === 'Notifications' || title === 'Hide Your Full Name' ? (
    //                         <Switch value={title === 'Notifications' ?
    //                             isNotificationsEnabled : isHideNameEnabled}
    //                             trackColor={{ false: '#000000', true: '#9e5594' }}
    //                             thumbColor={'#ffffff'}
    //                             onValueChange={(value) => title === 'Notifications' ?
    //                                 setIsNotificationsEnabled(value) : setIsHideNameEnabled(value)}
    //                             style={{ marginRight: '-6%' }} />
    //                     ) : (
    //                         title === 'Logout' ? (
    //                             <></>
    //                         ) : (
    //                             title === 'Your Profile Deactivated' ? (
    //                                 confirmedButtonPressed === true ? (
    //                                     <Text style={styles.turnOnTextStyle}>Turn on</Text>
    //                                 ) : (
    //                                     < SvgXml xml={smallRightIconSvg}
    //                                         style={styles.rightArrowImageStyle} />
    //                                 )
    //                             ) : (
    //                                 <SvgXml xml={smallRightIconSvg}
    //                                     style={styles.rightArrowImageStyle} />
    //                             )
    //                         )
    //                     )
    //                 )}
    //             </View>
    //         </TouchableOpacity>
    //     );
    // };

    const RenderSettingsItem = ({ onPress, title, slugName }) => {
        return (
            <Pressable onPress={() => onPress()}
                style={styles.itemContainer}>
                <SvgXml xml={slugName}
                    style={styles.iconStyle} />
                <Text style={styles.itemTextStyle}>
                    {title}</Text>
            </Pressable>
        );
    };

    const RenderSettingsPersonalInformationItem = ({ onPress, slugName,
        title, value }) => {
        return (
            <Pressable onPress={() => onPress()}
                style={styles.itemContainer}>
                <SvgXml xml={slugName}
                    style={styles.iconStyle} />
                <Text style={styles.itemTextStyle}>{title}</Text>
                <Text style={[styles.textStyle,
                title === 'Name' &&
                { marginLeft: normalize(120) }]}>{value}</Text>
            </Pressable>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4e40b3', '#4e40b3', '#4e40b3']}
                    style={styles.navigationBarStyle}>
                    <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                        style={styles.rowContainer}>
                        <Image source={require('../assets/images/white-left-arrow.png')}
                            style={styles.backImageStyle} />
                        <Text style={styles.titleTextStyle}>Settings</Text>
                    </TouchableOpacity>
                    <SvgXml xml={hamburgerSvg}
                        style={styles.iconStyle} />
                </LinearGradient>
                <View style={styles.headerContainer}>
                    <Text style={styles.headingTextStyle}>
                        Personal Information</Text>
                    <Pressable
                        onPress={() => navigation.navigate('SettingsEditProfile')}
                        style={styles.headerSubContainer}>
                        <SvgXml xml={editSvg}
                            style={styles.iconStyle} />
                        <Text style={styles.headingSubTextStyle}>Edit</Text>
                    </Pressable>
                </View>
                <RenderSettingsPersonalInformationItem
                    onPress={() => navigation.navigate('SettingsName')}
                    title={'Name'}
                    slugName={profileIconSvg}
                    value={'Md Mursaleen'} />
                <RenderSettingsPersonalInformationItem
                    onPress={() => navigation.navigate('SettingsPhoneNumber')}
                    title={'Mobile Number'}
                    slugName={profileIconSvg}
                    value={'+917982928791'} />
                <RenderSettingsPersonalInformationItem
                    onPress={() => navigation.navigate('SettingsEmail')}
                    title={'Email Address'}
                    slugName={profileIconSvg}
                    value={'mursaleen@shink.app'} />
                <View style={styles.borderStyle} />
                <Text style={styles.headingTextStyle}>Account</Text>
                <RenderSettingsItem
                    onPress={() => navigation.navigate('PurchaseHistory')}
                    title={'Purchase History'}
                    slugName={purchaseHistoryIconSvg} />
                <RenderSettingsItem
                    onPress={() => { }}
                    title={'Security'}
                    slugName={securityIconSvg} />
                <View style={styles.borderStyle} />
                <Text style={styles.headingTextStyle}>App</Text>
                <RenderSettingsItem
                    onPress={() => { }}
                    title={'Notifications'}
                    slugName={notificationsIconSvg} />
                <RenderSettingsItem
                    onPress={() => navigation.navigate('Support')}
                    title={'Support'}
                    slugName={supportIconSvg} />
                <RenderSettingsItem
                    onPress={() => navigation.navigate('FAQ')}
                    title={'FAQ'}
                    slugName={faqIconSvg} />
                <RenderSettingsItem
                    onPress={() => navigation.navigate('TermsAndConditions')}
                    title={'Terms and Conditions'}
                    slugName={termsAndConditionsIconSvg} />
                <Text style={styles.deleteAccountTextStyle}>Delete Account</Text>
                <Text style={styles.logoutTextStyle}>Logout</Text>
                {/* <ScrollView style={{ flex: 1 }}>
                    <View style={styles.bodyContainer}>
                        <RenderSettingsItem onPress={() => handleNamePress()}
                            title="Name" />
                        <RenderSettingsItem
                            title="Mobile Number" />
                        <RenderSettingsItem onPress={() => handleAddEmailPress()}
                            title="Add Email" />
                        <RenderSettingsItem onPress={() => handleNotificationsPress()}
                            title="Notifications" />
                        <RenderSettingsItem onPress={() => handleHideYourFullNamePress()}
                            title="Hide Your Full Name" />
                        <RenderSettingsItem onPress={() => handlePurchaseHistoryPress()}
                            title="Purchase History" />
                        <RenderSettingsItem onPress={() => handleFAQPress()}
                            title="FAQ" />
                        <RenderSettingsItem onPress={() => handleSupportPress()}
                            title="Support" />
                        <RenderSettingsItem onPress={() => handleTermsandConditionsPress()}
                            title="Terms and Conditions" />
                        <RenderSettingsItem onPress={() => handleDeactivatePress()}
                            title={confirmedButtonPressed === true ?
                                'Your Profile Deactivated' : 'Deactivate'} />
                        <RenderSettingsItem onPress={() => handleDeleteAccountPress()}
                            title="Delete Account" />
                        <RenderSettingsItem onPress={() => handleLogoutPress()}
                            title="Logout" />
                    </View>
                    <View style={styles.footerContainer}>
                        <SvgXml xml={shinkLogoSvg}
                            style={styles.logoImageStyle} />
                        <Text style={styles.footerTextStyle}>Version: 1.237.7</Text>
                    </View>
                </ScrollView> */}
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
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(16),
        width: '100%',
        height: normalize(56),
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
        fontSize: 23,
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
    headerContainer: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headingTextStyle: {
        marginVertical: normalize(13),
        marginLeft: normalize(15),
        fontSize: 18.5,
        fontWeight: '800',
        color: '#606060',
        lineHeight: 27,
    },
    headerSubContainer: {
        marginRight: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingSubTextStyle: {
        marginLeft: normalize(3),
        fontSize: 15,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 18,
    },
    itemContainer: {
        marginBottom: normalize(15),
        marginLeft: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTextStyle: {
        marginLeft: normalize(12),
        fontSize: 14.7,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 21,
    },
    textStyle: {
        marginLeft: normalize(60),
        fontSize: 13.5,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 18,
    },
    borderStyle: {
        marginHorizontal: normalize(18),
        marginTop: normalize(15),
        marginBottom: normalize(10),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#929292',
    },
    iconStyle: {
        width: normalize(14),
        height: normalize(14),
    },
    deleteAccountTextStyle: {
        marginLeft: normalize(20),
        marginTop: normalize(20),
        fontSize: 18.5,
        fontWeight: '500',
        color: '#e56b6b',
        lineHeight: 18,
    },
    logoutTextStyle: {
        marginLeft: normalize(20),
        marginTop: normalize(25),
        fontSize: 18.5,
        fontWeight: '800',
        color: '#4e40b3',
        lineHeight: 18,
    },
});

export default ProfileSettingsScreen;
