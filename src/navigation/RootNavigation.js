/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { normalize } from '../components/theme';
import HomeScreen from '../screens/HomeScreen';
import AgreementScreen from '../screens/AgreementScreen';
import ChatScreen from '../screens/ChatScreen';
import YourInterestScreen from '../screens/YourInterestScreen';
import FlagTypeSelectionScreen from '../screens/FlagTypeSelectionScreen';
import GenderSelectionScreen from '../screens/GenderSelectionScreen';
import SexualityScreen from '../screens/SexualityScreen';
import FinalGenderSelectionScreen from '../screens/FinalGenderSelectionScreen';
import NextGenderSelectionScreen from '../screens/NextGenderSelectionScreen';
import DatePreferenceScreen from '../screens/DatePreferenceScreen';
import RelationshipPreferenceScreen from '../screens/RelationshipPreferenceScreen';
import YourRelationshipScreen from '../screens/YourRelationshipScreen';
import MyFlagsScreen from '../screens/MyFlagsScreen';
import ReceivedFlagsScreen from '../screens/ReceivedFlagsScreen';
import GivenFlagsScreen from '../screens/GivenFlagsScreen';
import LoginScreen from '../screens/LoginScreen';
import EnterNameScreen from '../screens/EnterNameScreen';
import EnterBirthdayScreen from '../screens/EnterBirthdayScreen';
import Under18AgeScreen from '../screens/Under18AgeScreen';
import EnterPhoneNumberScreen from '../screens/EnterPhoneNumberScreen';
import LocationAccessScreen from '../screens/LocationAccessScreen';
import NotificationsAccessScreen from '../screens/NotificationsAccessScreen';
import OTPConfirmationScreen from '../screens/OTPConfirmationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InitialProfileScreen from '../screens/InitialProfileScreen';
import MyPicsScreen from '../screens/MyPicsScreen';
import UnmatchedChatScreen from '../screens/UnmatchedChatScreen';
import MatchedScreen from '../screens/MatchedScreen';
import PremiumPlansScreen from '../screens/PremiumPlansScreen';
import SeeLikesScreen from '../screens/SeeLikesScreen';
import BuyedPremiumPlansScreen from '../screens/BuyedPremiumPlansScreen';
import YourLikesScreen from '../screens/YourLikesScreen';
import MyInfoScreen from '../screens/MyInfoScreen';
import InitialScreen from '../screens/InitialScreen';
import SpotifyScreen from '../screens/SpotifyScreen';
import MusicPreferenceScreen from '../screens/MuiscPreferenceScreen';
import YourDislikesScreen from '../screens/YourDislikesScreen';
import LikesScreen from '../screens/LikesScreen';
import DislikesScreen from '../screens/DislikesScreen';
import EditBirthDateScreen from '../screens/EditBirthDateScreen';
import EditBirthDateNextScreen from '../screens/EditBirthDateNextScreen';
import AboutMeScreen from '../screens/AboutMeScreen';
import HeightScreen from '../screens/HeightScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import EducationScreen from '../screens/EducationScreen';
import DrinkingScreen from '../screens/DrinkingScreen';
import SmokingScreen from '../screens/SmokingScreen';
import KidsScreen from '../screens/KidsScreen';
import PoliticsScreen from '../screens/PoliticsScreen';
import ReligionScreen from '../screens/ReligionScreen';
import StarSignScreen from '../screens/StarSignScreen';
import InitialSpotifyScreen from '../screens/InitialSpotifyScreen';
import SpotifyMainScreen from '../screens/SpotifyMainScreen';
import WorkScreen from '../screens/WorkScreen';
import LanguageScreen from '../screens/LanguageScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import SupportScreen from '../screens/SupportScreen';
import SettingsNameScreen from '../screens/SettingsNameScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import FAQScreen from '../screens/FAQScreen';
import PurchasesHistoryScreen from '../screens/PurchasesHistoryScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false, // This hides the header
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: '#c680b2', // Active tab color
            tabBarInactiveTintColor: '#979797', // Inactive tab color
        }} initialRouteName="Connection">
            <BottomTab.Screen name="Connection" component={HomeScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, size }) => <Image source={require('../assets/images/connection.png')}
                    width={size} height={size} tintColor={color} />,
            }} />
            <BottomTab.Screen name="Explore" component={MatchedScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, size }) => <Image source={require('../assets/images/explore.png')}
                    width={size} height={size} tintColor={color} />,
            }} />
            <BottomTab.Screen name="Likes" component={SeeLikesScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, size }) => <Image source={require('../assets/images/likes.png')}
                    width={size} height={size} tintColor={color} />,
            }} />
            <BottomTab.Screen name="Chat" component={ChatScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, size }) => <Image source={require('../assets/images/chat.png')}
                    width={size} height={size} tintColor={color} />,
            }} />
            <BottomTab.Screen name="Profile" component={InitialProfileScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, size }) => <Image source={require('../assets/images/profile.png')}
                    width={size} height={size} tintColor={color} />,
            }} />
        </BottomTab.Navigator>
    );
};

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileSettings">
                <Stack.Screen name="Agreement" component={AgreementScreen} />
                <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                <Stack.Screen name="FlagTypeSelection" component={FlagTypeSelectionScreen} />
                <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
                <Stack.Screen name="NextGenderSelection" component={NextGenderSelectionScreen} />
                <Stack.Screen name="Sexuality" component={SexualityScreen} />
                <Stack.Screen name="FinalGenderSelection" component={FinalGenderSelectionScreen} />
                <Stack.Screen name="DatePreference" component={DatePreferenceScreen} />
                <Stack.Screen name="RelationshipPreference" component={RelationshipPreferenceScreen} />
                <Stack.Screen name="YourRelationship" component={YourRelationshipScreen} />
                <Stack.Screen name="YourInterest" component={YourInterestScreen} />
                <Stack.Screen name="MyFlags" component={MyFlagsScreen} />
                <Stack.Screen name="ReceivedFlags" component={ReceivedFlagsScreen} />
                <Stack.Screen name="GivenFlags" component={GivenFlagsScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="EnterName" component={EnterNameScreen} />
                <Stack.Screen name="EnterBirthday" component={EnterBirthdayScreen} />
                <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumberScreen} />
                <Stack.Screen name="Under18Age" component={Under18AgeScreen} />
                <Stack.Screen name="LocationAccess" component={LocationAccessScreen} />
                <Stack.Screen name="NotificationsAccess" component={NotificationsAccessScreen} />
                <Stack.Screen name="OTPConfirmation" component={OTPConfirmationScreen} />
                <Stack.Screen name="MyPics" component={MyPicsScreen} />
                <Stack.Screen name="Unmatched" component={UnmatchedChatScreen} />
                <Stack.Screen name="MainProfile" component={ProfileScreen} />
                <Stack.Screen name="PremiumPlans" component={PremiumPlansScreen} />
                <Stack.Screen name="BuyedPremiumPlans" component={BuyedPremiumPlansScreen} />
                <Stack.Screen name="YourLikes" component={YourLikesScreen} />
                <Stack.Screen name="MyInfo" component={MyInfoScreen} />
                <Stack.Screen name="Initial" component={InitialScreen} />
                <Stack.Screen name="Spotify" component={SpotifyScreen} />
                <Stack.Screen name="MusicPreference" component={MusicPreferenceScreen} />
                <Stack.Screen name="YourDislikes" component={YourDislikesScreen} />
                <Stack.Screen name="Likes" component={LikesScreen} />
                <Stack.Screen name="Dislikes" component={DislikesScreen} />
                <Stack.Screen name="EditBirthDate" component={EditBirthDateScreen} />
                <Stack.Screen name="EditBirthDateNext" component={EditBirthDateNextScreen} />
                <Stack.Screen name="AboutMe" component={AboutMeScreen} />
                <Stack.Screen name="Height" component={HeightScreen} />
                <Stack.Screen name="Exercise" component={ExerciseScreen} />
                <Stack.Screen name="Education" component={EducationScreen} />
                <Stack.Screen name="Drinking" component={DrinkingScreen} />
                <Stack.Screen name="Smoking" component={SmokingScreen} />
                <Stack.Screen name="Kids" component={KidsScreen} />
                <Stack.Screen name="Politics" component={PoliticsScreen} />
                <Stack.Screen name="Religion" component={ReligionScreen} />
                <Stack.Screen name="StarSign" component={StarSignScreen} />
                <Stack.Screen name="InitialSpotify" component={InitialSpotifyScreen} />
                <Stack.Screen name="SpotifyMain" component={SpotifyMainScreen} />
                <Stack.Screen name="Work" component={WorkScreen} />
                <Stack.Screen name="Language" component={LanguageScreen} />
                <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
                <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
                <Stack.Screen name="SettingsName" component={SettingsNameScreen} />
                <Stack.Screen name="Support" component={SupportScreen} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
                <Stack.Screen name="FAQ" component={FAQScreen} />
                <Stack.Screen name="PurchasesHistory" component={PurchasesHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: normalize(52),
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    tabBarLabelStyle: {
        paddingBottom: normalize(2),
        fontSize: 11.5,
        fontWeight: '400',
    },
});
