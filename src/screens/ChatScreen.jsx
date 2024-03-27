/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { normalize } from '../components/theme';
import { useWebSocket } from '../contexts/WebSocketContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AllChatScreen from '../screens/AllChatScreen';
import UnmatchedChatScreen from './UnmatchedChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const { ws, setWs } = useWebSocket();
    const [dataFetchError, setDataFetchError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
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

    const fetchData = async () => {
        try {
            setDataFetchError(false);
            setLoading(true);
            // Replace 'your-url' with the actual URL you want to fetch from
            const response = await fetch(
                'https://wphfsmzto7.execute-api.ap-south-1.amazonaws.com/default/pythonDB',
            );
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error in fetching data: ', error);
            setLoading(false);
            setDataFetchError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleWebSocket = async (id) => {
        const newWs = new WebSocket(
            `wss://fuule4re7f.execute-api.ap-south-1.amazonaws.com/production/?id=${id}`,
        );
        newWs.onopen = () => {
            console.log('WebSocket connection is opened');
            setWs(newWs); // Set the new WebSocket instance in the context
        };
        newWs.onclose = () => {
            console.log('WebSocket connection is closed');
        };
        newWs.onerror = e => {
            console.log('WebSocket error: ', e);
        };
        newWs.onmessage = e => {
            console.log('WebSocket message is received: ', e.data);
        };
    };

    useEffect(() => {
        fetchData();
        const getUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setUserId(userId);
                handleWebSocket(userId);
            } catch (e) {
                console.log(e);
            }
        };
        getUserId();
    }, []);

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
