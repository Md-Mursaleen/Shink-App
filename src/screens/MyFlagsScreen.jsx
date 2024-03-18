/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReceivedFlagsScreen from './ReceivedFlagsScreen';
import GivenFlagsScreen from './GivenFlagsScreen';

const FirstRoute = () => (
    <ReceivedFlagsScreen />
);

const SecondRoute = () => (
    <GivenFlagsScreen />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const MyFlagsScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Received' },
        { key: 'second', title: 'Given' },
    ]);

    const renderTabBar = props => (
        <TabBar {...props}
            getLabelText={({ route }) => route.title}
            renderLabel={({ route, focused }) => (
                <Text style={{
                    margin: 8,
                    fontSize: 14,
                    fontFamily: 'AvenirNext-Regular',
                    color: focused ? '#000000' : '#979797',
                    textAlign: 'center',
                    lineHeight: 16,
                }}>{route.title}</Text>
            )}
            indicatorStyle={{ backgroundColor: '#9e5594' }}
            style={{ backgroundColor: '#ebeef2' }} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <Ionicons name="arrow-back" size={22} color={'#ffffff'}
                        onPress={() => navigation.goBack()} />
                    <Text style={styles.titleTextStyle}>My Flags</Text>
                </View>
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
        padding: 8,
        width: 'auto',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#9e5594',
        gap: 8,
    },
    headerSubContainer: {
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleTextStyle: {
        marginLeft: 12,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
});

export default MyFlagsScreen;
