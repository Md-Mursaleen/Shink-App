/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    View, Image, Text, StyleSheet, TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Pressable,
} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useImageContext, ImageContextProvider } from '../contexts/ImageContext';
import { useProfileContext } from '../contexts/ProfileContext';
import { normalize } from '../components/theme';
import { LinearGradient, SvgXml } from 'react-native-svg';
import {
    shinkLogoSvg, settingIconSvg, editIconSvg,
    viewIconSvg, infoIconSvg, verifiedIconSvg,
    smallHeartSvg, hyperShinkSvg, personHeartSvg, flagSvg,
    redFlagSvg, greenFlagSvg, heartSvg, triangleSvg,
} from '../data/SvgImageData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePictureWithOutline from '../components/ProfilePictureWithOutline';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProfileContainer = ({ userData, profileStrength, refreshScreen, profilePictureUrl }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [profilePic, setProfilePic] = useState(null);
    const defaultProfileImage = require('../assets/images/user.png');
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const { profilePicture: contextProfilePicture } = useImageContext(); // Use a different variable name to avoid conflicts
    const [profilePicture, setProfilePicture] = useState(null);

    const handleEditButtonPressed = () => {
        console.log('Pressed');
        navigation.navigate('MainProfile');
    };

    const handleFlagButtonPressed = () => {
        console.log('Pressed');
        navigation.navigate('MyFlags');
    };

    const showPopup = () => setPopupVisibility(true);
    const hidePopup = () => setPopupVisibility(false);

    // const refreshScreenOnNavigateBack = () => {
    //     // Toggle the state variable to trigger rerender
    //     setRefreshScreen(prevState => !prevState);
    // };

    // useEffect(() => {
    //     if (profilePicUri) {
    //         setProfilePic({ uri: profilePicUri });
    //         console.log('InitialProfileScreen - Received profilePicUri:', profilePicUri);
    //     }
    //     else {
    //         // If profilePicUri is null, set the default profile image
    //         setProfilePic(defaultProfileImage);
    //     }
    // }, [profilePicUri, defaultProfileImage]);

    // useEffect(() => {
    //     // Load the profile picture URI from AsyncStorage when the component mounts
    //     const loadProfilePicUri = async () => {
    //         try {
    //             const storedUri = await AsyncStorage.getItem('profilePicUri');
    //             if (storedUri) {
    //                 setProfilePic({ uri: storedUri });
    //             }
    //         } catch (error) {
    //             console.error('Error while retrieving profile picture URI: ', error);
    //         }
    //     };
    //     loadProfilePicUri();
    // }, []);

    // useEffect(() => {
    //     if (profilePicUri) {
    //         setProfilePic({ uri: profilePicUri });
    //         // Save the profile picture URI to AsyncStorage when it's updated
    //         const storeProfilePicUri = async () => {
    //             try {
    //                 await AsyncStorage.setItem('profilePicUri', profilePicUri);
    //             } catch (error) {
    //                 console.error('Error while storing profile picture URI: ', error);
    //             }
    //         };
    //         storeProfilePicUri();
    //     }
    // }, [profilePicUri]);

    useEffect(() => {
        if (profilePicture) {
            setProfilePic({ uri: profilePicture });
        } else {
            setProfilePic(defaultProfileImage);
        }
    }, [profilePicture]);

    useFocusEffect(
        React.useCallback(() => {
            // Your code here
            if (route.params && route.params.profilePicture) {
                setProfilePicture(route.params.profilePicture);
            }
        }, [route.params])
    );

    useEffect(() => {
        const retrieveProfilePicture = async () => {
            try {
                const storedProfilePicture = await AsyncStorage.getItem('profilePicture');
                if (storedProfilePicture) {
                    setProfilePicture(storedProfilePicture);
                }
            } catch (error) {
                console.error('Error while retrieving profile picture: ', error);
            }
        };
        retrieveProfilePicture();
    }, [refreshScreen]);

    useEffect(() => {
        // Function to save profile picture to AsyncStorage when it changes
        const saveProfilePicture = async () => {
            try {
                if (profilePicture) {
                    await AsyncStorage.setItem('profilePicture', profilePicture);
                } else {
                    // If profilePicture is null, remove the item from AsyncStorage
                    await AsyncStorage.removeItem('profilePicture');
                }
            } catch (error) {
                console.error('Error while saving profile picture: ', error);
            }
        };
        saveProfilePicture();
    }, [profilePicture]);

    const getProgressColor = (strength) => {
        if (strength <= 30) {
            return 'red'; // Set color to red for profile strength 30 and below
        } else if (strength >= 40 && strength <= 70) {
            return 'yellow'; // Set color to yellow for profile strength between 40 and 70
        } else if (strength >= 80 && strength <= 100) {
            return 'green'; // Set color to green for profile strength between 80 and 100
        }
    };

    return (
        <View style={styles.profileContainer}>
            {/* <ProfilePictureWithOutline source={profilePic ? profilePic : defaultProfileImage}
                strength={profileStrength} style={styles.profileImageStyle} /> */}
            {/* Profile Picture with Green Outline */}
            <View style={styles.profilePictureContainer}>
                {/* Log out the content of profilePicture */}
                {console.log('Profile Picture rendered:', profilePicture)}
                {/* Render profilePicture here */}
                {/* {profilePicture && profilePicture.includes('<svg') ? (
                    <SvgXml xml={profilePicture}
                        style={[styles.profilePicSvgStyle,
                        { width: normalize(72), height: normalize(72) }, // Set the width and height to match the desired dimensions
                        ]} />
                ) : (
                    <Image source={profilePicture ? { uri: profilePicture } : defaultProfileImage}
                        style={styles.profilePicStyle} />
                )} */}
                {profilePictureUrl ? (
                    profilePictureUrl.includes('.svg') ? (
                        <SvgXml xml={profilePictureUrl}
                            style={[styles.profilePicSvgStyle,
                            { width: normalize(72), height: normalize(72) },
                            ]} />
                    ) : (
                        <Image source={{ uri: profilePictureUrl }}
                            style={styles.profilePicStyle} />
                    )
                ) : (
                    <Image source={defaultProfileImage}
                        style={styles.profilePicStyle} />
                )}
                {/* Progress Circle */}
                <View style={styles.progressCircleContainer}>
                    <CircularProgress value={profileStrength}
                        radius={55} // Adjust the size to create an outline effect
                        activeStrokeWidth={4} // Adjust the stroke width as needed
                        inActiveStrokeColor={'transparent'}
                        progressValueColor={'transparent'} // Transparent color for progress
                        inActiveStrokeOpacity={0.5}
                        inActiveStrokeWidth={0}
                        backgroundColor={'#000000'} // Color for the progress circle outline
                        duration={2000} // Duration of the animation (milliseconds)
                    />
                    <View style={[styles.progressOverlayStyle,
                    { backgroundColor: getProgressColor(profileStrength) }]} />
                </View>
            </View>
            <View style={styles.nameAgeContainer}>
                {/* <Text style={styles.nameTextStyle}>{userData && userData.name},</Text> */}
                <Text style={styles.nameTextStyle}>{userData && userData.name},</Text>
                <Text style={styles.ageTextStyle}>  {userData && userData.age}</Text>
                {/* <Image source={require('../assets/images/verified-image.jpg')}
                    style={styles.verifiedIconStyle} /> */}
                <SvgXml xml={verifiedIconSvg}
                    style={styles.verifiedIconStyle} />
            </View>
            {/* Profile Strength */}
            <View onTouchEnd={() => showPopup()}
                style={styles.profileStrengthContainer}>
                {/* SVG Icon */}
                <TouchableOpacity onPress={() => showPopup()}>
                    <SvgXml xml={infoIconSvg} style={styles.iconStyle} />
                </TouchableOpacity>
                {/* Text */}
                <Text style={styles.profileStrengthTextStyle}>Profile Completion:{' '}</Text>
                <Text style={[styles.profileStrengthTextStyle,
                { marginLeft: normalize(5), color: '#9e5594' }]}>
                    {profileStrength}%
                </Text>
            </View>
            {/* Popup with TriangleSvg */}
            <Modal animationType="fade"
                transparent={true}
                visible={isPopupVisible} >
                <TouchableWithoutFeedback onPress={() => hidePopup()}>
                    <View style={styles.overLayContainer}>
                        <View style={profileStrength === 100 ?
                            styles.specialPopupContainer : styles.popupContainer}>
                            {/* TriangleSvg at the top margin */}
                            <SvgXml xml={triangleSvg} style={styles.triangleSvgStyle} />
                            {/* Popup Content */}
                            <Text style={profileStrength === 100 ?
                                styles.specialPopupTextStyle : styles.popupTextStyle}>
                                {profileStrength === 100 ? 'Your profile is 100% complete. WTG!'
                                    : 'People with 100% complete profiles are the happiest. You too can be one of them :)'}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleFlagButtonPressed()}
                    style={styles.profileButtonContainer}>
                    <View style={styles.flagsContainer}>
                        <SvgXml xml={redFlagSvg} />
                        <SvgXml xml={greenFlagSvg} />
                    </View>
                    <Text style={[styles.buttonTextStyle, { color: '#7b337e' }]}>My Flags</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButtonContainer}>
                    <SvgXml xml={viewIconSvg} />
                    <Text style={[styles.buttonTextStyle, { color: '#7b337e' }]}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditButtonPressed()}
                    style={styles.editButtonContainer}>
                    <SvgXml xml={editIconSvg} />
                    <Text style={[styles.buttonTextStyle, { color: '#7b337e' }]}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const PremiumPlansContainer = () => {
    const navigation = useNavigation();
    const handleUpgradePress = () => {
        navigation.navigate('PremiumPlans', {
            isHomeScreen: false,
        }); // Navigate to the PremiumPlans screen
    };

    return (
        <View style={styles.premiumPlansContainer}>
            <TouchableOpacity onPress={() => handleUpgradePress()}
                style={styles.upgradeButtonContainer}>
                <Text style={styles.upgradeButtonTextStyle}>Upgrade Now To Premium Plan</Text>
            </TouchableOpacity>
            {/* Premium Plans Buttons */}
            <View style={styles.premiumButtonsContainer}>
                {/* Button 1 */}
                <TouchableOpacity style={styles.premiumButtonContainer}>
                    <View style={styles.premiumButtonContentContainer}>
                        <SvgXml xml={smallHeartSvg} />
                        <Text style={styles.premiumButtonTextStyle}>Send Unlimited Likes</Text>
                    </View>
                </TouchableOpacity>
                {/* Button 2 */}
                <TouchableOpacity style={styles.premiumButtonContainer}>
                    <View style={styles.premiumButtonContentContainer}>
                        <SvgXml xml={personHeartSvg} />
                        <Text style={styles.premiumButtonTextStyle}>See Who Likes You</Text>
                    </View>
                </TouchableOpacity>
                {/* Button 3 */}
                <TouchableOpacity style={styles.premiumButtonContainer}>
                    <View style={styles.premiumButtonContentContainer}>
                        <SvgXml xml={hyperShinkSvg} />
                        <Text style={styles.premiumButtonTextStyle}>HyperShink</Text>
                    </View>
                </TouchableOpacity>
                {/* Button 4 */}
                <TouchableOpacity style={styles.premiumButtonContainer}>
                    <View style={styles.premiumButtonContentContainer}>
                        <SvgXml xml={flagSvg} />
                        <Text style={styles.premiumButtonTextStyle}>Limitless Flags</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ToolTipArrow = () => {
    return (
        <View style={styles.toolTipArrowContainer}>
            <View style={styles.toolTipArrowStyle} />
        </View>
    );
};

const AdditionalButtonsContainer = () => {
    return (
        <View style={styles.additionalButtonsContainer}>
            {/* Additional Button 1: FAQs */}
            <TouchableOpacity style={styles.additionalButtonContainer}>
                <Text style={styles.additionalButtonTextStyle}>FAQs</Text>
            </TouchableOpacity>
            {/* Additional Button 2: Support */}
            <TouchableOpacity style={styles.additionalButtonContainer}>
                <Text style={styles.additionalButtonTextStyle}>Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const InitialProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [profileStrength, setProfileStrength] = useState(0);
    const { dispatch } = useProfileContext();
    const { profilePicture: contextProfilePicture } = useImageContext(); // Use a different variable name to avoid conflicts
    const [profilePicture, setProfilePicture] = useState(null);
    const [refreshScreen, setRefreshScreen] = useState(false);

    //     const EXISTING_API_QUERY = `
    //     query GetShinkUsers($userid: String!) {
    //         getShinkUsers(userid: $userid) {
    //             GivenReports
    //             LOCATION
    //             ReceivedReports
    //             about
    //             age
    //             chosenPlan
    //             for
    //             gender
    //             givenFlags
    //             interests
    //             isPaidUser
    //             matches
    //             muisc
    //             name
    //             receivedFlags
    //             sexuality
    //             status
    //             userid
    //         }
    //     }
    // `;

    //     // New API query
    //     const NEW_API_QUERY = `
    //     query MyQuery {
    //         getShinkUser(userId: "5") {
    //             images
    //             bio
    //             datePreference
    //             datePreferenceAgeMax
    //             datePreferenceAgeMin
    //             datePreferenceGender
    //             datePreferenceOrientation
    //             gender
    //             interests
    //             isVerified
    //             isAgreementCompleted
    //             location
    //             name
    //             phoneNumber
    //             relationshipStatus
    //             sexuality
    //             spotifyMusicInterests
    //             userId
    //         }
    //     }
    // `;

    //     useEffect(() => {
    //         const fetchUserData = async () => {
    //             const existingGraphQLApi = 'https://phkintsvb5b7vgldg3tjdtmfei.appsync-api.ap-south-1.amazonaws.com/graphql';
    //             const newApi = 'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
    //             const userid = '8';
    //             try {
    //                 // First, try the new API
    //                 const responseNewApi = await fetch(newApi, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'x-api-key': 'da2-ezrssmav7vfpvipxkvvypidpom',
    //                     },
    //                     body: JSON.stringify({
    //                         query: NEW_API_QUERY,
    //                         variables: { userId: userid },
    //                     }),
    //                 });
    //                 const dataNewApi = await responseNewApi.json();
    //                 console.log('New API Response: ', dataNewApi);
    //                 if (dataNewApi && dataNewApi.data && dataNewApi.data.getShinkUser) {
    //                     const userNewApi = dataNewApi.data.getShinkUser;
    //                     const calculatedStrengthNewApi = calculateProfileStrength(userNewApi);
    //                     setUserData(userNewApi);
    //                     setProfileStrength(calculatedStrengthNewApi);
    //                     dispatch({ type: 'SET_PROFILE_STRENGTH', payload: calculatedStrengthNewApi });
    //                     setIsLoading(false);
    //                     return; // Exit the function if new API provides a valid response
    //                 }

    //                 // If the new API doesn't provide a valid response, fall back to the existing GraphQL API
    //                 const responseExistingApi = await fetch(existingGraphQLApi, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'x-api-key': 'da2-ezrssmav7vfpvipxkvvypidpom',
    //                     },
    //                     body: JSON.stringify({
    //                         query: EXISTING_API_QUERY,
    //                         variables: { userid },
    //                     }),
    //                 });
    //                 const dataExistingApi = await responseExistingApi.json();
    //                 console.log('Existing API Response: ', dataExistingApi);
    //                 if (dataExistingApi && dataExistingApi.data && dataExistingApi.data.getShinkUsers) {
    //                     const userExistingApi = dataExistingApi.data.getShinkUsers;
    //                     const calculatedStrengthExistingApi = calculateProfileStrength(userExistingApi);
    //                     setUserData(userExistingApi);
    //                     setProfileStrength(calculatedStrengthExistingApi);
    //                     dispatch({ type: 'SET_PROFILE_STRENGTH', payload: calculatedStrengthExistingApi });
    //                 }
    //             } catch (error) {
    //                 console.error('Error while fetching user data: ', error);
    //             }
    //             setIsLoading(false);
    //         };
    //         fetchUserData();
    //     }, [dispatch]);

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API = 'https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql';
            const userid = '999';
            try {
                const response = await fetch(NEW_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-cwrojubjkncp7gpd6kvsnlv5sa',
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
                                }
                            }
                        `,
                        variables: { userId: userid },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                if (data && data.data && data.data.getShinkUser) {
                    const user = data.data.getShinkUser;
                    const calculatedStrength = calculateProfileStrength(user); // Calculate profile strength

                    // Extract images from the user data and parse them
                    const images = user.images.map(image => JSON.parse(image));

                    // Find the image object with index 0 and get its coverPhoto property
                    const profilePictureUrl = images.find(image => image.index === 0)?.coverPhoto || '';
                    console.log('ProfilePictureUri in initial screen: ', profilePictureUrl);
                    setUserData(user);
                    setProfileStrength(calculatedStrength); // Set profile strength
                    setProfilePicture(profilePictureUrl); // Set profile picture URL
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const calculateProfileStrength = (user) => {
        const attributesToCheck = ['age', 'for', 'gender', 'interests', 'sexuality', 'status', 'userid', 'seeking', 'datePreferenceAgeMax',
            'datePreferenceAgeMin', 'datePreferenceGender'];
        const presentAttributes = attributesToCheck.filter((attribute) => user[attribute]);
        const totalAttributes = attributesToCheck.length;
        const strengthPerAttribute = 100 / totalAttributes;
        const strength = presentAttributes.length * strengthPerAttribute;
        const roundedStrength = Math.round(strength / 10) * 10;
        return roundedStrength;
    };

    const isPopupVisible = false;

    return (
        <ImageContextProvider value={{ profilePicture }}>
            <View style={styles.container}>
                {/* Navigation Bar */}
                <ScrollView>
                    <View style={styles.navigationBarContainer}>
                        {/* <SvgXml xml={settingIconSvg} /> */}
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/left-icon.jpg')}
                                style={styles.navigationImageStyle} />
                        </Pressable>
                        <SvgXml xml={shinkLogoSvg}
                            style={styles.logoImageStyle} />
                        {/* <Image source={require('../assets/images/shink-logo.jpg')}
                    style={styles.logoImageStyle}
                    resizeMode="contain" /> */}
                        {/* <Image source={require('../assets/images/profile-setting-image.jpg')}
                    style={styles.settingImageStyle} /> */}
                        <SvgXml xml={settingIconSvg}
                            onPress={() => navigation.navigate('ProfileSettings')}
                            style={styles.settingImageStyle} />
                    </View>
                    {/* containers */}
                    <ProfileContainer userData={userData} profileStrength={profileStrength}
                        setRefreshScreen={setRefreshScreen}
                        refreshScreen={refreshScreen}
                        profilePictureUrl={profilePicture} // Pass setRefreshScreen as a prop
                    />
                    <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#c680b2', '#9e5594', '#7b337e']}>
                        <Text style={styles.premiumPlansTextStyle}>Premium Plans</Text>
                    </LinearGradient>
                    <PremiumPlansContainer />
                    <AdditionalButtonsContainer />
                    {/* Tooltip Arrow */}
                    {isPopupVisible && (
                        <View style={styles.toolTipArrowContainer}>
                            <View style={styles.toolTipArrowStyle} />
                        </View>
                    )}
                </ScrollView>
            </View>
        </ImageContextProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarContainer: {
        padding: normalize(10),
        marginTop: normalize(15),
        marginBottom: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    navigationImageStyle: {
        marginLeft: normalize(8),
        width: normalize(25),
        height: normalize(25),
    },
    settingImageStyle: {
        marginRight: normalize(15),
        width: normalize(22),
        height: normalize(22),
    },
    logoImageStyle: {
        width: normalize(94),
        height: normalize(36),
    },
    profileContainer: {
        width: '90%',
        height: normalize(302),
        alignSelf: 'center',
        backgroundColor: 'var(--Color-Surface-White, #ffffff)',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 12,
    },
    profileImageStyle: {
        marginTop: normalize(25),
        width: normalize(95),
        height: normalize(95),
        alignSelf: 'center',
        resizeMode: 'cover',
        borderRadius: 50,
    },
    nameAgeContainer: {
        paddingHorizontal: '10%',
        marginTop: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    nameTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    ageTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    verifiedIconStyle: {
        marginLeft: normalize(5),
        width: normalize(24),
        height: normalize(24),
        resizeMode: 'contain',
    },
    profileStrengthContainer: {
        padding: normalize(10),
        marginTop: normalize(2),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    profileStrengthIconStyle: {
        marginRight: normalize(7),
        width: normalize(15),
        height: normalize(15),
        resizeMode: 'contain',
    },
    profileStrengthTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 16,
    },
    buttonsContainer: {
        marginTop: normalize(8),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    flagsContainer: {
        marginRight: normalize(8),
        flexDirection: 'row',
    },
    profileButtonContainer: {
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(5),
        marginBottom: normalize(5),
        width: normalize(100),
        height: normalize(70),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebeef2',
        borderColor: '#cfd3d6',
        borderRadius: 12,
        gap: 8,
    },
    editButtonContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(8),
        width: normalize(90),
        height: normalize(70),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebeef2',
        borderColor: '#cfd3d6',
        borderRadius: 12,
        gap: 8,
    },
    buttonTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 16,
    },
    premiumPlansContainer: {
        flex: 1,
        marginTop: normalize(20),
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 12,
    },
    premiumButtonsContainer: {
        marginTop: normalize(3),
        marginLeft: normalize(16),
        flexDirection: 'column',
        justifyContent: 'center',
    },
    premiumButtonContainer: {
        padding: normalize(15),
        backgroundColor: '#ffffff',
    },
    premiumButtonTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    premiumPlansTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Bold',
        color: '#7b337e',
        lineHeight: 21,
    },
    premiumButtonContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    upgradeButtonContainer: {
        padding: normalize(12),
        marginTop: normalize(18),
        alignSelf: 'center',
        backgroundColor: '#f0e4fa', // Set the background color
        borderRadius: 24,
    },
    upgradeButtonTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#9e5594',
        lineHeight: 16,
    },
    additionalButtonsContainer: {
        paddingLeft: normalize(16),
        paddingRight: normalize(16),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        marginTop: normalize(5),
        marginBottom: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    additionalButtonContainer: {
        flex: 1,
        paddingLeft: normalize(10),
        paddingRight: normalize(10),
        paddingTop: normalize(12),
        paddingBottom: normalize(12),
        marginLeft: normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
        overflow: 'hidden',
    },
    additionalButtonTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    toolTipArrowContainer: {
        position: 'absolute',
        top: normalize(80),
        left: normalize(20),
        zIndex: 1,
    },
    toolTipArrowStyle: {
        width: normalize(0),
        height: normalize(0),
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: '#282c3f',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderStyle: 'solid',
    },
    iconStyle: {
        marginRight: '1%',
        width: normalize(20),
        height: normalize(20),
    },
    popupTextStyle: {
        marginVertical: normalize(10),
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'flex-start',
    },
    specialPopupTextStyle: {
        marginVertical: normalize(10),
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'flex-start',
    },
    triangleSvgStyle: {
        position: 'absolute',
        top: '-20%',
        left: '20%',
        zIndex: 2,
    },
    overLayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
        padding: normalize(10),
        paddingTop: normalize(0),
        paddingBottom: normalize(0),
        marginTop: '-30%',
        marginLeft: normalize(60),
        marginRight: normalize(60),
        alignItems: 'center',
        backgroundColor: '#282c3f',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    specialPopupContainer: {
        padding: normalize(10),
        paddingTop: normalize(0),
        paddingBottom: normalize(0),
        left: '-4%',
        marginTop: normalize(-140),
        marginLeft: normalize(60),
        marginRight: normalize(60),
        alignItems: 'center',
        backgroundColor: '#282c3f',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profilePictureContainer: {
        position: 'relative',
        padding: normalize(15),
        top: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    },
    profilePictureStyle: {
        width: normalize(95),
        height: normalize(95),
        resizeMode: 'cover',
        borderRadius: 50,
    },
    progressCircleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    profilePicStyle: {
        width: normalize(90),
        height: normalize(90),
        resizeMode: 'cover',
        borderRadius: 80,
    },
});

export default InitialProfileScreen;






