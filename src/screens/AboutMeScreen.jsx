/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { smallRightIconSvg } from '../data/SvgImageData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const AboutMeScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        showAge: true,
        age: '',
        showGender: true,
        gender: '',
        showSexuality: true,
        sexuality: '',
        showLookingFor: true,
        for: '',
        showStatus: true,
        status: '',
        showSeeking: true,
        seeking: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API_QUERY = `
        query GetShinkUser($userid: String!) {
          getShinkUser(userid: "$userid") {
            height
            exercise
            education
            drinking
            smoking
            kids
            starSign
            politics
          }
        }
      `;
            const userid = '4';
            try {
                const responseNewApi = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: NEW_API_QUERY,
                        variables: { userid },
                    }),
                });
                const dataNewApi = await responseNewApi.json();
                console.log('New API Response: ', dataNewApi);
                if (dataNewApi && dataNewApi.data && dataNewApi.data.getShinkUser) {
                    const userNewApi = dataNewApi.data.getShinkUser;
                    setUserData({
                        showWork: true,
                        work: userNewApi.work || '',
                        showHeight: true,
                        height: userNewApi.height || '',
                        showExercise: true,
                        exercise: userNewApi.exercise || '',
                        showEducation: true,
                        education: userNewApi.education || '',
                        showDrinking: true,
                        drinking: userNewApi.drinking || '',
                        showSmoking: true,
                        smoking: userNewApi.smoking || '',
                        showKids: true,
                        kids: userNewApi.kids || '',
                        showStarSign: true,
                        starSign: userNewApi.starSign || '',
                        showPolitics: true,
                        politics: userNewApi.politics || '',
                        showReligion: true,
                        religion: userNewApi.religion || '',
                        showLanguage: true,
                        language: userNewApi.languaue || '',
                    });
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
        };
        fetchUserData();
    }, []);

    const handleWorkPress = () => {
        if (userData.work) {
            setUserData({ ...userData, showWork: true });
        } else {
            navigation.navigate('Work', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleHeightPress = () => {
        if (userData.height) {
            setUserData({ ...userData, showHeight: true });
        } else {
            navigation.navigate('Height', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleExercisePress = () => {
        if (userData.exercise) {
            setUserData({ ...userData, showExercise: true });
        } else {
            // Pass true to indicate navigation from MyInfoScreen
            navigation.navigate('Exercise', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleEducationPress = () => {
        if (userData.education) {
            setUserData({ ...userData, showEducation: true });
        } else {
            navigation.navigate('Education', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleDrinkingPress = () => {
        if (userData.drinking) {
            setUserData({ ...userData, showDrinking: true });
        } else {
            navigation.navigate('Drinking', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleSmokingPress = () => {
        if (userData.smoking) {
            setUserData({ ...userData, showSmoking: true });
        } else {
            navigation.navigate('Smoking', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleKidsPress = () => {
        if (userData.kids) {
            setUserData({ ...userData, showKids: true });
        } else {
            navigation.navigate('Kids', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleStarSignPress = () => {
        if (userData.starSign) {
            setUserData({ ...userData, showStarSign: true });
        } else {
            navigation.navigate('StarSign', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handlePoliticsPress = () => {
        if (userData.politics) {
            setUserData({ ...userData, showPolitics: true });
        } else {
            navigation.navigate('Politics', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleReligionPress = () => {
        if (userData.religion) {
            setUserData({ ...userData, showReligion: true });
        } else {
            navigation.navigate('Religion', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleLanguagePress = () => {
        if (userData.language) {
            setUserData({ ...userData, showLanguage: true });
        } else {
            navigation.navigate('Language', { isUpdatingFromMyInfoScreen: true });
        }
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const RenderInfoItem = ({ onPress, title, showSlugName, slugName }) => {
        return (
            <TouchableOpacity onPress={() => onPress()}
                style={styles.buttonContainer}>
                <View style={styles.buttonContentContainer}>
                    <Text style={styles.buttonTextStyle}>{title}</Text>
                    <View style={styles.userDataContainer}>
                        {showSlugName ? (
                            <Text style={styles.userDataTextStyle}>{slugName}</Text>
                        ) : (
                            <Text style={[styles.userDataTextStyle,
                            { color: '#9d4edd' }]}>Add</Text>
                        )}
                    </View>
                    <SvgXml xml={smallRightIconSvg}
                        style={styles.rightArrowImageStyle} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                {/* Back Button and Title Text */}
                <TouchableOpacity onPress={() => handleBackButtonPress()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>More Info</Text>
                </TouchableOpacity>
            </LinearGradient>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.contentContainer}>
                    {/* // Work Button */}
                    <RenderInfoItem onPress={() => handleWorkPress()}
                        title="Work"
                        showSlugName={userData?.showWork}
                        slugName={userData?.work} />

                    {/* height Button */}
                    <RenderInfoItem onPress={() => handleHeightPress()}
                        title="Exercise"
                        showSlugName={userData?.showHeight}
                        slugName={userData?.height} />

                    {/* // Exercise Button */}
                    <RenderInfoItem onPress={() => handleExercisePress()}
                        title="Exercise"
                        showSlugName={userData?.showExercise}
                        slugName={userData?.exercise} />

                    {/* // Education Button */}
                    <RenderInfoItem onPress={() => handleEducationPress()}
                        title="Education"
                        showSlugName={userData?.showEducation}
                        slugName={userData?.education} />

                    {/* // Drinking Button */}
                    <RenderInfoItem onPress={() => handleDrinkingPress()}
                        title="Drinking"
                        showSlugName={userData?.showDrinking}
                        slugName={userData?.drinking} />

                    {/* // Smoking Button */}
                    <RenderInfoItem onPress={() => handleSmokingPress()}
                        title="Smoking"
                        showSlugName={userData?.showSmoking}
                        slugName={userData?.smoking} />

                    {/* // Kids Button */}
                    <RenderInfoItem onPress={() => handleKidsPress()}
                        title="Kids"
                        showSlugName={userData?.showKids}
                        slugName={userData?.kids} />

                    {/* // Star Sign Button */}
                    <RenderInfoItem onPress={() => handleStarSignPress()}
                        title="Star Sign"
                        showSlugName={userData?.showStarSign}
                        slugName={userData?.starSign} />

                    {/* // Politics Button */}
                    <RenderInfoItem onPress={() => handlePoliticsPress()}
                        title="Politics"
                        showSlugName={userData?.showPolitics}
                        slugName={userData?.politics} />

                    {/* // Religion Button */}
                    <RenderInfoItem onPress={() => handleReligionPress()}
                        title="Religion"
                        showSlugName={userData?.showReligion}
                        slugName={userData?.religion} />

                    {/* // Language Button */}
                    <RenderInfoItem onPress={() => handleLanguagePress()}
                        title="Language"
                        showSlugName={userData?.showLanguage}
                        slugName={userData?.language} />
                </View>
            </ScrollView>
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
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    contentContainer: {
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
    userDataTextStyle: {
        marginRight: normalize(8),
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#9d4edd',
        lineHeight: 16,
    },
    buttonContentContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userDataContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

export default AboutMeScreen;
