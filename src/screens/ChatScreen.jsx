/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { normalize } from '../components/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AllChatScreen from '../screens/AllChatScreen';
import UnmatchedChatScreen from './UnmatchedChatScreen';

const FirstRoute = () => (
    <AllChatScreen />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);
const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);

const FourthRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
);

const FifthRoute = () => (
    <UnmatchedChatScreen />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
});

const ChatScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Your turn' },
        { key: 'third', title: 'Favorites' },
        { key: 'fourth', title: 'New Matches' },
        { key: 'fifth', title: 'Unmatched' },
    ]);

    const renderTabBar = props => (
        <TabBar {...props}
            getLabelText={({ route }) => route.title}
            renderLabel={({ route, focused }) => (
                <Text style={{
                    paddingHorizontal: normalize(10),
                    paddingVertical: normalize(8),
                    width: normalize(100),
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'AvenirNext-Regular',
                    color: focused ? '#000000' : '#979797',
                    textAlign: 'center',
                    lineHeight: 16,
                }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#9e5594' }}
            style={{ backgroundColor: '#ebeef2', justifyContent: 'space-between' }} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <Ionicons name="arrow-back" size={22} color={'#ffffff'}
                        onPress={() => navigation.goBack()} />
                    <Text style={styles.titleTextStyle}>Message</Text>
                </View>
                <Entypo name="dots-three-vertical" size={22} color={'#ffffff'}
                    style={{ marginRight: normalize(10) }} />
            </View>
            <TabView navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                swipeEnabled={false}
                renderTabBar={renderTabBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        padding: normalize(8),
        width: 'auto',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#9e5594',
        gap: 8,
    },
    headerSubContainer: {
        marginLeft: normalize(7),
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTextStyle: {
        marginLeft: normalize(12),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
});

export default ChatScreen;
