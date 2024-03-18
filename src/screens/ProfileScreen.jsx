/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useImageContext, ImageContextProvider } from '../contexts/ImageContext';
import { useProfileContext } from '../contexts/ProfileContext';
import { infoIconSvg, greenTickSvg, editIconSvg } from '../data/SvgImageData';
import { SvgXml } from 'react-native-svg';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';
import ProfileBioModal from '../components/ProfileBioModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultProfileImage = `
    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
    "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     width="60.000000pt" height="60.000000pt" viewBox="0 0 60.000000 60.000000"
     preserveAspectRatio="xMidYMid meet">
    
    <g transform="translate(0.000000,60.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M255 531 c-11 -5 -31 -21 -45 -36 -21 -22 -25 -37 -25 -86 0 -53 3
    -62 33 -91 47 -48 117 -48 164 0 30 29 33 38 33 92 0 53 -3 63 -31 91 -33 33
    -92 46 -129 30z"/>
    <path d="M215 207 c-105 -35 -153 -78 -125 -112 18 -22 402 -22 420 0 21 26 1
    53 -65 86 -75 36 -166 47 -230 26z"/>
    </g>
    </svg>
`;

const ProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [userData, setUserData] = useState({});
    const [editedBio, setEditedBio] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const maxCharacterLimit = 100;
    const [isEditing, setIsEditing] = useState(false);
    const [showBioBar, setShowBioBar] = useState(false);
    const [profilePic, setProfilePic] = useState(defaultProfileImage);
    const [isBioModalVisible, setIsBioModalVisible] = useState(false);
    const { state: { bio: contextBio }, dispatch } = useProfileContext();
    const { state: { interests: selectedInterests, profileStrength } } = useProfileContext();
    const isOverLimit = editedBio && editedBio.length > maxCharacterLimit;
    const initialState = {
        interests: [],
    };
    const { profilePicUri } = useImageContext();
    // State variable to manage the dynamic text
    const [randomText, setRandomText] = useState('');
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const dynamicTexts = [
        'Your profile is in the top 10000 profiles globally',
        'Your profile is perfect for women between 35 and 45.',
        'Profiles with 6 pics are 200% more effective than profiles with 1 pic',
        'Please ensure your face is clearly visible in all the pictures.',
        'Travel pics and adventure sports pics get the most likes.',
    ];
    const [likesData, setLikesData] = useState([]);
    const [dislikesData, setDislikesData] = useState([]);
    const { profilePicture: contextProfilePicture } = useImageContext(); // Use a different variable name to avoid conflicts
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [profilePictureImage, setProfilePictureImage] = useState(null);

    useEffect(() => {
        if (profilePicture) {
            setProfilePic({ uri: profilePicture });
        } else {
            setProfilePic(defaultProfileImage);
        }
    }, [profilePicture]);

    useFocusEffect(
        React.useCallback(() => {
            if (route.params && route.params.profilePicture) {
                setProfilePicture(route.params.profilePicture);
            }
        }, [route.params])
    );

    useEffect(() => {
        // Function to retrieve profile picture from AsyncStorage
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
    }, []);

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

    useEffect(() => {
        // Shuffle the array of texts and set a random text when the component mounts
        const shuffledTexts = dynamicTexts.sort(() => Math.random() - 0.5);
        setRandomText(shuffledTexts[0]);
    }, []);

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
                                    name
                                    userId
                                    likes
                                    dislikes
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
                    const calculatedStrength = calculateProfileStrength(user);
                    const images = user.images.map(image => JSON.parse(image));
                    console.log('Images from graphQL: ', images);
                    const profilePictureUrl = images.find(image => image.index === 0)?.coverPhoto || '';
                    setProfilePictureUrl(profilePictureUrl);
                    setProfilePictureUrl(profilePictureUrl);
                    const imageWithProfilePicture = images.find(image => image.profilePicture);
                    setUserImages(images);
                    setUserData(user);
                    dispatch({ type: 'SET_PROFILE_STRENGTH', payload: calculatedStrength });
                    setEditedBio(user.bio || '');
                    setProfilePictureImage(imageWithProfilePicture);
                    console.log('Profile Picture URL: ', profilePictureUrl);
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, [dispatch]);

    useEffect(() => {
        const fetchLikesAndDislikesFromBackend = async () => {
            try {
                const response = await fetch('https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-cwrojubjkncp7gpd6kvsnlv5sa',
                    },
                    body: JSON.stringify({
                        query: `
                            query GetLikesAndDislikes($userId: String!) {
                                getShinkUser(userId: $userId) {
                                    likes
                                    dislikes
                                }
                            }
                        `,
                        variables: {
                            userId: '999',
                        },
                    }),
                });
                const responseData = await response.json();
                const { likes, dislikes } = responseData.data.getShinkUser;
                if (likes !== null && dislikes !== null) {
                    setLikes(likes);
                    setDislikes(dislikes);
                } else {
                    console.error('likes or dislikes data is null');
                }
            } catch (error) {
                console.error('Error while fetching likes and dislikes: ', error);
            }
        };
        fetchLikesAndDislikesFromBackend();
    }, []);

    const calculateProfileStrength = (user) => {
        const attributesToCheck = ['userid', 'age', 'for', 'gender', 'interests', 'sexuality',
            'status', 'userid', 'seeking'];
        const presentAttributes = attributesToCheck.filter((attribute) => user[attribute]);
        const totalAttributes = attributesToCheck.length;
        const strengthPerAttribute = 100 / totalAttributes;
        const strength = presentAttributes.length * strengthPerAttribute;
        const roundedStrength = Math.round(strength / 10) * 10;
        return roundedStrength;
    };

    useEffect(() => {
        setEditedBio(contextBio);
    }, [contextBio]);

    // useEffect(() => {
    //     if (route.params && route.params.selectedProfileImage) {
    //         setProfilePic({ uri: route.params.selectedProfileImage });
    //     } else if (selectedImages.length > 0) {
    //         // Use the first selected image as the profile picture
    //         setProfilePic({ uri: selectedImages[0] });
    //     } else {
    //         // If no selected profile image, set it to the default image
    //         setProfilePic(require(defaultProfileImage));
    //     }
    // }, [route.params, selectedImages]);

    useEffect(() => {
        if (profilePicUri) {
            setProfilePic({ uri: profilePicUri });
            console.log('InitialProfileScreen - Received profilePicUri:', profilePicUri);
        } else {
            // If profilePicUri is null, set the default profile image
            setProfilePic(defaultProfileImage);
        }
    }, [profilePicUri]);

    // Function to store the profile picture URI in AsyncStorage
    // const storeProfilePicUri = async (uri) => {
    //     try {
    //         await AsyncStorage.setItem('profilePicUri', uri);
    //     } catch (error) {
    //         console.error('Error while storing profile picture URI: ', error);
    //     }
    // };

    // Function to retrieve the profile picture URI from AsyncStorage
    // const getProfilePicUri = async () => {
    //     try {
    //         const uri = await AsyncStorage.getItem('profilePicUri');
    //         if (uri !== null) {
    //             return uri;
    //         }
    //     } catch (error) {
    //         console.error('Error while retrieving profile picture URI: ', error);
    //     }
    //     // Return default URI if not found
    //     return null;
    // };

    // useEffect(() => {
    //     // Load the profile picture URI from AsyncStorage when the component mounts
    //     const loadProfilePicUri = async () => {
    //         const storedUri = await getProfilePicUri();
    //         if (storedUri) {
    //             setProfilePicUri(storedUri);
    //         } else {
    //             // If no stored URI found, set default image URI
    //             setProfilePicUri(defaultProfileImage);
    //         }
    //     };
    //     loadProfilePicUri();
    // }, [setProfilePicUri]);

    // useEffect(() => {
    //     // Update the stored profile picture URI whenever profilePicUri changes
    //     if (profilePicUri) {
    //         storeProfilePicUri(profilePicUri);
    //     }
    // }, [profilePicUri]);

    const handleOnPressButton = () => {
        navigation.navigate('YourInterest');
    };

    const handleOpenBioModal = () => {
        setIsBioModalVisible(true);
    };

    const handleEditLikes = () => {
        setIsBioModalVisible(false);
    };

    const handleCloseBioModal = () => {
        setIsBioModalVisible(false);
    };

    const handleSaveBio = (newBio) => {
        // Save the bio or perform any other action
        setEditedBio(newBio);
        dispatch({ type: 'SET_BIO', payload: newBio });
        handleCloseBioModal();
    };

    return (
        <ImageContextProvider value={{ profilePicture }}>
            <View style={styles.container}>
                {/* Purple Bar */}
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.purpleBarStyle}>
                    {/* Back Button and Username */}
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/white-left-arrow.png')}
                                style={styles.backImageStyle} />
                        </TouchableOpacity>
                        <Text style={styles.usernameTextStyle}>{userData && userData.name}</Text>
                    </View>
                    {/* Settings Icon */}
                    <TouchableOpacity onPress={() => console.log('Settings clicked')}>
                        <Image source={require('../assets/images/setting-icon.png')}
                            style={styles.settingsImageStyle} />
                    </TouchableOpacity>
                </LinearGradient>
                {/* New Purplw Bar for Bio Container */}
                {/* <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.purpleBarStyle}>
                <TouchableOpacity onPress={() => handleCloseBioBar()}>
                    <Image source={require('../assets/images/close-icon.png')}
                        style={styles.settingsImageStyle} />
                </TouchableOpacity>
                <Text style={styles.usernameTextStyle}>You can customize the text here</Text>
                <TouchableOpacity onPress={() => handleSaveBio()}>
                    <Text style={styles.saveTextStyle}>Save</Text>
                </TouchableOpacity>
            </LinearGradient> */}
                {/* Profile Strength Container */}
                <ScrollView>
                    {/* <View style={styles.profileStrengthContainer}>
                        {profileStrength ? (
                            <SvgXml xml={infoIconSvg} style={styles.infoIconStyle} />
                        ) : (
                            <Image source={profilePic ?? defaultProfileImage} style={styles.infoIconStyle} />
                        )}
                        <Text style={styles.profileStrengthTextStyle}>
                            Profile Strength{' '}
                            <Text style={[styles.profileStrengthTextStyle, { color: '#9e5594' }]}>
                                {profileStrength}%
                            </Text>
                        </Text>
                    </View> */}
                    <View style={styles.profileStrengthContainer}>
                        <SvgXml xml={infoIconSvg} style={styles.infoIconStyle} />
                        <Text style={styles.profileStrengthTextStyle}>
                            Profile Strength{' '}
                            <Text style={[styles.profileStrengthTextStyle, { color: '#9e5594' }]}>
                                {profileStrength}%</Text>
                        </Text>
                    </View>
                    {/* Photo Container */}
                    <TouchableOpacity onPress={() => navigation.navigate('MyPics')}
                        style={styles.photoContainer}>
                        {/* <View style={styles.profilePicContainer}>
                            <Image source={profilePic ? profilePic : require(defaultProfileImage)}
                                style={styles.profilePicStyle} />
                        </View> */}
                        <View style={styles.profilePicContainer}>
                            {/* {profilePicture && profilePicture.includes('<svg') ? (
                                <SvgXml xml={profilePicture}
                                    style={[styles.profilePicSvgStyle,
                                    { width: normalize(72), height: normalize(72) },
                                    ]} />
                            ) : (
                                <Image source={profilePicture ? { uri: profilePicture } :
                                    defaultProfileImage}
                                    style={styles.profilePicStyle} />
                            )} */}
                            {profilePictureUrl ? (
                                <Image source={{ uri: profilePictureUrl }}
                                    onError={() => console.log('Error loading image')}
                                    style={styles.profilePicStyle} />
                            ) : (
                                <></>
                            )}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.myPicsTextStyle}>My Pics</Text>
                            {/* <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#c680b2', '#9e5594', '#7b337e']}
                        style={styles.purpleBoxStyle}>
                        <Text style={styles.purpleBoxTextStyle}>Your Profile Has Reached Top 10%</Text>
                    </LinearGradient> */}
                            <View style={styles.purpleBoxStyle}>
                                <Text style={styles.purpleBoxTextStyle}>{randomText}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('MyPics')}
                            style={styles.arrowIconStyle}>
                            <Image source={require('../assets/images/right-arrow.png')}
                                style={styles.forwardButtonImageStyle} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {/* Bio Container */}
                    <TouchableOpacity onPress={() => handleOpenBioModal()}
                        style={styles.bioContainer}>
                        <Text style={styles.sectionTitleTextStyle}>My Bio</Text>
                        <TouchableOpacity onPress={() => handleOpenBioModal()}>
                            <View style={{ position: 'relative' }}>
                                <TextInput style={[styles.bioTextInputStyle,
                                isOverLimit && { borderColor: '#eb4335' }, // Apply styles conditionally
                                ]}
                                    placeholder="Type your bio"
                                    placeholderTextColor={'#282c3f'}
                                    multiline
                                    numberOfLines={5}
                                    value={editedBio}
                                    onChangeText={(text) => setEditedBio(text)}
                                    editable={isEditing} />
                                {/* Character count display inside TextInput */}
                                <Text style={[styles.characterCountTextStyle,
                                isOverLimit ? { color: '#eb4335' } : { color: '#000000' }]}>
                                    {editedBio.length}/{maxCharacterLimit} characters
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {/* Likes container */}
                    <View style={styles.interestContainer}>
                        {/* Likes heading */}
                        <View style={styles.interestHeaderContainer}>
                            <SvgXml xml={greenTickSvg}
                                style={styles.greenTickImageStyle} />
                            <Text style={styles.interestHeaderTextStyle}>Likes</Text>
                            {/* Edit button */}
                            <TouchableOpacity onPress={() => handleEditLikes()}
                                style={styles.headerRightContainer}>
                                <View style={styles.editButtonContainer}>
                                    <SvgXml xml={editIconSvg}
                                        style={{ width: normalize(20), height: normalize(20) }} />
                                    {/* Apply linear gradient to the Edit text color */}
                                    <Text style={styles.editButtonTextStyle}>Edit</Text>
                                </View>
                                <Image source={require('../assets/images/right-arrow.png')}
                                    style={styles.arrowIconStyle} />
                            </TouchableOpacity>
                        </View>
                        {/* Likes content */}
                        <View style={styles.interestContentContainer}>
                            {likesData.map((like, index) => (
                                <View key={index} style={styles.interesBoxStyle}>
                                    <Text style={styles.interestTextStyle}>{like}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* Dislikes container */}
                    <View style={styles.interestContainer}>
                        {/* Dislikes heading */}
                        <View style={styles.interestHeaderContainer}>
                            <SvgXml xml={greenTickSvg}
                                style={styles.greenTickImageStyle} />
                            <Text style={styles.interestHeaderTextStyle}>Dislikes</Text>
                            {/* Edit button */}
                            <TouchableOpacity onPress={() => handleEditLikes()}
                                style={styles.headerRightContainer}>
                                <View style={styles.editButtonContainer}>
                                    <SvgXml xml={editIconSvg}
                                        style={{ width: normalize(20), height: normalize(20) }} />
                                    {/* Apply linear gradient to the Edit text color */}
                                    <Text style={styles.editButtonTextStyle}>Edit</Text>
                                </View>
                                <Image source={require('../assets/images/right-arrow.png')}
                                    style={styles.arrowIconStyle} />
                            </TouchableOpacity>
                        </View>
                        {/* Dislikes content */}
                        <View style={styles.interestContentContainer}>
                            {dislikesData.map((dislike, index) => (
                                <View key={index} style={styles.interesBoxStyle}>
                                    <Text style={styles.interestTextStyle}>{dislike}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* Bio Modal */}
                    <ProfileBioModal
                        visible={isBioModalVisible}
                        onSave={handleSaveBio}
                        onClose={handleCloseBioModal}
                        initialBio={editedBio} />
                    {/* Buttons Container */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonTextStyle}>Verify my profile</Text>
                            <Image source={require('../assets/images/right-arrow.png')}
                                style={styles.arrowIconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOnPressButton()}>
                            <View style={styles.interestButtonContainer}>
                                <View style={styles.buttonRowContainer}>
                                    {userData && userData.interests && userData.interests.length > 0 && (
                                        <SvgXml xml={greenTickSvg} style={styles.greenTickStyle} />
                                    )}
                                    <Text style={styles.buttonTextStyle}>My interests</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../assets/images/right-arrow.png')}
                                        style={styles.arrowIconStyle} />
                                </View>
                            </View>
                            {/* <Text style={styles.buttonTextStyle}>My interests</Text>
                    <Image source={require('../assets/images/right-arrow.png')}
                        style={styles.arrowIconStyle} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutMe')}
                            style={styles.buttonContainer}>
                            <View style={styles.buttonRowContainer}>
                                {userData && userData.aboutMe && (
                                    <SvgXml xml={greenTickSvg} style={styles.greenTickStyle} />
                                )}
                                <Text style={styles.buttonTextStyle}>More Info</Text>
                            </View>
                            <Image source={require('../assets/images/right-arrow.png')}
                                style={styles.arrowIconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}
                            style={styles.buttonContainer}>
                            <View style={styles.buttonRowContainer}>
                                {userData && userData.myInfo && (
                                    <SvgXml xml={greenTickSvg} style={styles.greenTickStyle} />
                                )}
                                <Text style={styles.buttonTextStyle}>My info</Text>
                            </View>
                            <Image source={require('../assets/images/right-arrow.png')}
                                style={styles.arrowIconStyle} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageContextProvider>
    );
};
// Styling Section
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    purpleBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        width: '100%',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileStrengthContainer: {
        paddingHorizontal: normalize(20),
        marginTop: normalize(12),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    infoIconStyle: {
        marginRight: normalize(9),
        width: normalize(19),
        height: normalize(19),
        resizeMode: 'contain',
    },
    profileStrengthTextStyle: {
        fontSize: 12.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Bold',
        color: '#979797',
        lineHeight: 16,
    },
    photoContainer: {
        padding: normalize(12),
        top: normalize(12),
        left: normalize(16),
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
        gap: 12,
    },
    profilePicContainer: {
        width: normalize(80),
        height: normalize(80),
        borderRadius: 10,
        overflow: 'hidden',
    },
    profilePicStyle: {
        width: normalize(78),
        height: normalize(78),
        resizeMode: 'cover',
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: normalize(3),
    },
    myPicsTextStyle: {
        marginBottom: normalize(7),
        fontSize: 17.3,
        fontWeight: '700',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    purpleBoxStyle: {
        paddingVertical: normalize(4),
        marginTop: normalize(8),
        width: 'auto',
        backgroundColor: '#5e2f85',
        borderRadius: 4,
    },
    purpleBoxTextStyle: {
        fontSize: 10.8,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 16,
    },
    forwardButtonImageStyle: {
        marginLeft: normalize(2),
        width: normalize(15),
        height: normalize(15),
        resizeMode: 'contain',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    usernameTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    bioContainer: {
        marginTop: normalize(37),
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
        borderColor: '#cfd3d6',
    },
    sectionTitleTextStyle: {
        marginBottom: normalize(10),
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    bioTextInputStyle: {
        padding: normalize(20),
        width: '100%',
        height: normalize(100),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 6,
    },
    characterCountTextStyle: {
        position: 'absolute',
        bottom: normalize(9),
        right: normalize(10),
        fontSize: 11,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 15,
    },
    buttonsContainer: {
        marginTop: normalize(20),
        paddingHorizontal: normalize(20),
    },
    buttonContainer: {
        paddingVertical: normalize(13),
        paddingHorizontal: normalize(16),
        marginBottom: normalize(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    buttonTextStyle: {
        // fontSize: 16.5,
        fontSize: 16.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    arrowIconStyle: {
        width: normalize(15),
        height: normalize(15),
        resizeMode: 'contain',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsImageStyle: {
        width: normalize(22),
        height: normalize(22),
        resizeMode: 'contain',
    },
    saveTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Bold',
        color: '#ffffff',
        lineHeight: 32,
    },
    interestButtonContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(16),
        marginRight: normalize(4),
        marginBottom: normalize(12),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    buttonRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickImageStyle: {
        marginRight: normalize(5),
        width: normalize(24),
        height: normalize(24),
    },
    greenTickImageStyle: {
        marginRight: normalize(5),
        width: normalize(19),
        height: normalize(19),
        // Adjust other styles as needed
    },
    interestContainer: {
        marginTop: normalize(13),
        paddingHorizontal: normalize(0), // Removed paddingHorizontal
        width: '90%', // Added width: '100%'
        height: normalize(150), // Height of 5 lines
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6', // Border color of light gray
        borderRadius: 8,
    },
    interestHeaderContainer: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(16), // Adjusted paddingHorizontal to match other buttons
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f0e4fa',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    interestHeaderTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        alignSelf: 'center',
    },
    interestContentContainer: {
        padding: normalize(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    interesBoxStyle: {
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        margin: normalize(5),
        backgroundColor: '#e6e6fa',
        borderRadius: 15,
    },
    interestTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
    },
    headerRightContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonContainer: {
        paddingHorizontal: normalize(11),
        paddingVertical: normalize(3),
        marginRight: normalize(10),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#9e5594',
        borderWidth: 1,
        borderRadius: 18,
        gap: 4,
    },
    editButtonTextStyle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9e5594',
        fontFamily: 'AvenirNext-Regular',
    },
    editButtonIcon: {
        width: '10',
        height: '10',
    },
    greenTickStyle: {
        marginRight: normalize(5),
        width: normalize(20),
        height: normalize(20),
        // Adjust other styles as needed
    },
});

export default ProfileScreen;
