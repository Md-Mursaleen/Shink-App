/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import AllSeeLikesScreen from './AllSeeLikesScreen';

const FirstRoute = () => (
    <AllSeeLikesScreen />
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

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
});

const SeeLikesScreen = () => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = useState([
        { key: 'first', title: 'All 6' },
        { key: 'second', title: 'Hyper Shink' },
        { key: 'third', title: 'New 3' },
        { key: 'fourth', title: 'Best 2' },
    ]);

    const renderTabBar = props => (
        <TabBar {...props}
            getLabelText={({ route }) => route.title}
            renderLabel={({ route, focused }) => (
                <Text style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    width: 100,
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
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.headerTextStyle}>See likes</Text>
                </View>
            </LinearGradient>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 52.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
    headerTextStyle: {
        marginLeft: 13,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
});

export default SeeLikesScreen;
