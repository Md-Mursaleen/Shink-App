/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { SvgXml } from 'react-native-svg';
import { emailSvgIcon } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';

const FAQScreen = () => {
    const navigation = useNavigation();
    const [isEndReached, setIsEndReached] = useState(false);
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 15;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#4e40b3', '#4e40b3', '#4e40b3']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>FAQ</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={{ paddingHorizontal: normalize(22) }}>
                <ScrollView style={styles.contentContainer}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            setIsEndReached(true);
                        }
                    }}
                    scrollEventThrottle={400} showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.headingTextStyle}>
                                How Do Dating Apps Work?</Text>
                            <Text style={styles.subHeadingTextStyle}>Profile Creation</Text>
                            <Text style={styles.contentTextStyle}>
                                Users create a profile with personal information, photos, and a brief bio.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Matching</Text>
                            <Text style={styles.contentTextStyle}>
                                Algorithms analyze user data to suggest potential matches based on compatibility.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Swiping or Liking</Text>
                            <Text style={styles.contentTextStyle}>
                                Users swipe right (like) or left (pass) on profiles to express interest.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Messaging</Text>
                            <Text style={styles.contentTextStyle}>
                                If both users like each other, they can start chatting within the app.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Profile Creation</Text>
                            <Text style={styles.contentTextStyle}>
                                Users create a profile with personal information, photos, and a brief bio.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.headingTextStyle}>
                                Dating Safe?</Text>
                            <Text style={styles.subHeadingTextStyle}>Profile Creation</Text>
                            <Text style={styles.contentTextStyle}>
                                Users create a profile with personal information, photos, and a brief bio.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Verify Profiles</Text>
                            <Text style={styles.contentTextStyle}>
                                Look for verified profiles or linked social media accounts.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Meet in Public</Text>
                            <Text style={styles.contentTextStyle}
                            >When meeting someone in person, choose a public location.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Trust Your Instincts</Text>
                            <Text style={styles.contentTextStyle}>
                                If something feels off, trust your gut and take precautions.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.headingTextStyle}>
                                How Can I Improve My Profile?</Text>
                            <Text style={styles.subHeadingTextStyle}>Photos</Text>
                            <Text style={styles.contentTextStyle}>
                                Use clear, recent photos that showcase your personality.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Bio</Text>
                            <Text style={styles.contentTextStyle}
                            >Write a concise, engaging bio that highlights your interests and what you’re looking for.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Be Authentic</Text>
                            <Text style={styles.contentTextStyle}>
                                Be yourself—authenticity attracts genuine connections.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.headingTextStyle}>
                                What Should I Avoid?</Text>
                            <Text style={styles.subHeadingTextStyle}>Overediting Photos</Text>
                            <Text style={styles.contentTextStyle}>
                                Be genuine; avoid heavy filters or misleading images.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Ghosting</Text>
                            <Text style={styles.contentTextStyle}>
                                If you’re not interested, communicate politely rather than disappearing.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subHeadingTextStyle}>Ignoring Red Flags</Text>
                            <Text style={styles.contentTextStyle}>
                                Trust your instincts; don’t ignore warning signs.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomTextStyle}>
                    This information was not helpful. Would you like to get help by email.
                </Text>
                <View style={styles.bottomSubContainer}>
                    <SvgXml xml={emailSvgIcon} />
                    <Text style={styles.bottomSubTextStyle}>Support@shink.app</Text>
                </View>
            </View>
        </View>
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
    contentContainer: {
        marginTop: normalize(20),
        width: 'auto',
        height: normalize(530), //newly added
        alignContent: 'flex-start',
        borderWidth: 1.3,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: normalize(15),
        marginBottom: normalize(15),
    },
    headingTextStyle: {
        marginTop: normalize(15),
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'left',
        lineHeight: 21,
    },
    subHeadingTextStyle: {
        marginTop: normalize(10),
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        textAlign: 'left',
        lineHeight: 21,
    },
    contentTextStyle: {
        marginTop: normalize(5),
        width: normalize(290),
        fontSize: 13.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        textAlign: 'left',
        lineHeight: 16,
    },
    bottomContainer: {
        padding: normalize(15),
        marginTop: 'auto',
        marginBottom: normalize(6),
        borderTopWidth: 1,
        borderTopColor: '#cfd3d6',
    },
    bottomTextStyle: {
        marginLeft: normalize(5),
        width: normalize(315),
        fontSize: 13.3,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    bottomSubContainer: {
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSubTextStyle: {
        marginLeft: normalize(10),
        fontSize: 17,
        fontWeight: '700',
        color: '#4e40b3',
        textAlign: 'center',
        lineHeight: 21,
    },
});

export default FAQScreen;
