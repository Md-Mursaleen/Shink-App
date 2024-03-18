/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const TermsAndConditionsScreen = () => {
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
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Terms and Conditions</Text>
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
                    <Text style={styles.textStyle}>{`*Shink Dating App Privacy Policy and Guidelines*\n\nLast Updated: [Date]\n\nThank you for choosing Shink, a platform designed to connect people in meaningful ways. We are committed to protecting your privacy and providing a secure environment for you to build relationships. This Privacy Policy outlines our practices regarding the collection, use, and sharing of your personal information when you use the Shink dating app.
                    \n*1. Information We Collect:*\n\na. *Registration Information:*\n    - When you create a Shink account, we collect your email address, phone number, and create a unique user ID.
                    \nb. *Profile Information:*\n    - Users have the option to provide additional information such as photos, location, interests, and preferences to enhance their profiles.
                    \nc. *Usage Information:*\n    - We collect data on how you interact with the app, including likes, messages, matches, and other activities.
                    \nd. *Device Information:*\n    - We may collect information about the device you use to access Shink, including device type, operating system, and unique device identifiers.
                    \n*2. How We Use Your Information:*\n\na. *Matchmaking:*\n    - We use the information you provide to match you with potential partners based on compatibility.
                    \nb. *Communication:*\n    - Your email address and phone number are used for account verification and communication purposes.
                    \nc. *Personalization:*\n    - We personalize your experience by using your preferences and usage patterns to suggest relevant matches.
                    \nd. *Analytics:*\n    - We analyze user data to improve our app's functionality, user experience, and overall performance.
                    \n*3. Information Sharing:*\n\na. *Consent:*\n    - We will not share your information with third parties without your explicit consent.
                    \nb. *Service Providers:*\n    - We may share information with third-party service providers to perform functions on our behalf, such as hosting, data analysis, and customer service.
                    \n*4. Security Measures:*\n\na. *Data Security:*\n    - We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction.
                    \nb. *Encryption:*\n    - All data transmitted between your device and our servers is encrypted using SSL/TLS protocols.
                    \n*5. User Guidelines:*\n\na. *Respect and Consent:*\n    - Users are expected to treat each other with respect and obtain consent before initiating any form of communication.
                    \nb. *Report and Block:*\n    - Shink encourages users to report any inappropriate behavior and provides tools to block and filter unwanted contacts.
                    \nc. *Authenticity:*\n    - Users are expected to provide accurate and truthful information in their profiles.
                    \n*6. Changes to Privacy Policy:*\n\na. *Notification:*\n    - Users will be notified of any changes to the Privacy Policy through the app or via email.
                    \nb. *Review:*\n    - Users are encouraged to review the Privacy Policy regularly to stay informed about how their information is being handled.
                    \nBy using Shink, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns, please contact us at [contact@shinkdating.com].
                    \nThank you for choosing Shink. We wish you a delightful experience in finding meaningful connections.
                    \nNote: This is a general template, and it's crucial to consult legal professionals to ensure compliance with specific regulations and laws.`}</Text>
                </ScrollView>
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
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(15),
        width: '100%',
        height: normalize(50),
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
        marginTop: normalize(20),
        // marginTop: 10,
        width: 'auto',
        // height: 525,
        height: normalize(600), //newly added
        alignContent: 'flex-start',
        borderWidth: 1.3,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    textStyle: {
        marginVertical: normalize(15),
        marginLeft: normalize(14),
        width: normalize(305),
        fontSize: 14.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        textAlign: 'left',
        lineHeight: 21,
    },
});

export default TermsAndConditionsScreen;
