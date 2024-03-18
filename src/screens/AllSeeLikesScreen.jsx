/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { smallHeartSvg, closeIconSvg, redCloseSvg, whiteCloseSvg } from '../data/SvgImageData';
import Category from '../components/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = {
    profileImage: require('../assets/images/profile-image.png'),
};

const seeLikesProfileData = [
    {
        id: '1',
        imageId: 'profileImage',
    },
    {
        id: '2',
        imageId: 'profileImage',
    },
    {
        id: '3',
        imageId: 'profileImage',
    },
    {
        id: '4',
        imageId: 'profileImage',
    },
    {
        id: '5',
        imageId: 'profileImage',
    },
    {
        id: '6',
        imageId: 'profileImage',
    },
];

const AllSeeLikesScreen = () => {
    const navigation = useNavigation();
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [blurRadius, setBlurRadius] = useState(3);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const GET_USER_DATA = `
            query GetShinkUser($userId: String!) {
                getShinkUser(userId: $userId) {
                    userId
                }
            }
        `;
            AsyncStorage.multiGet([
                'userId',
                'name',
                'birthDate',
                'location',
                'gender',
                'sexuality',
                'datePreferenceGender',
                'relationshipStatus',
                'datePreference',
                'music',
                'likes',
            ]).then(data => {
                const formattedData = {};
                data.forEach(item => {
                    const key = item[0];
                    let value = item[1];
                    // Parse JSON strings if needed
                    if (key === 'location' || key === 'likes') {
                        value = JSON.parse(value);
                    } else if (key === 'music') {
                        try {
                            value = JSON.parse(value);
                        } catch (error) {
                            console.error(`Error while parsing JSON for key '${key}': `, error);
                            // Handle the error, or set value to a default if needed
                        }
                    }
                    formattedData[key] = value;
                });
                setUserId(formattedData.userId);
            });
            const userid = '8';
            try {
                const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: GET_USER_DATA,
                        variables: { userid },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                setUsers(data);
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const handleOnPressButton = () => {
        if (blurRadius === 3) {
            navigation.navigate('PremiumPlans', {
                isHomeScreen: false,
                setBlurRadius: setBlurRadius,
            });
        }
        if (blurRadius === 0) {
            setIsModalOpened(true);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.titleTextStyle}>Bit quiet right now.</Text>
                    <Text style={styles.titleTextStyle}>Good things to those who wait.</Text>
                    <Text style={styles.textStyle}>Anyone who has liked you will be here. </Text>
                </View>
                {/* <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.itemContentContainer}>
                        {seeLikesProfileData.map((item, ind) => (
                            <Pressable key={ind} onPress={() => handleOnPressButton()}
                                style={styles.itemContainer}>
                                <Image source={items[item.imageId]} style={styles.imageStyle}
                                    blurRadius={blurRadius} />
                                <View style={styles.itemBottomContainer}>
                                    <View style={styles.itemBottomSubContainer}>
                                        <SvgXml xml={redCloseSvg} />
                                        <Text style={styles.likeTextStyle}>No</Text>
                                    </View>
                                    <View style={styles.itemBottomSubContainer}>
                                        <SvgXml xml={smallHeartSvg} />
                                        <Text style={styles.likeTextStyle}>Like</Text>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView> */}
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={isModalOpened}
                onRequestClose={() => setIsModalOpened(false)}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <SvgXml xml={whiteCloseSvg} onPress={() => setIsModalOpened(false)}
                            style={styles.iconStyle} />
                        <View style={styles.modalSubContainer}>
                            <Image source={require('../assets/images/thumbnail-image.png')}
                                style={styles.thumbnailImageStyle} />
                            <View style={styles.detailsContainer}>
                                <View style={{ flex: 1 }}>
                                    <Category heading={'My Matching Interests'}
                                        categories={users[index]?.matchingInterests} />
                                    <Category heading={'My Info'}
                                        categories={[users[index]?.userData?.status, users[index]?.userData?.location,
                                        users[index]?.userData?.for, users[index]?.distance + ' km away']} />
                                    {/* <Category heading={'My Interests'}
                                        categories={users[index]?.userData?.interests} /> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomContainer}>
                        {/* <SvgXml xml={closeIconSvg} onPress={() => setIsModalOpened(false)}
                            style={{ marginLeft: 25 }} /> */}
                        <View style={[styles.itemBottomSubContainer, { marginLeft: 25 }]}>
                            <SvgXml xml={redCloseSvg} />
                            <Text style={styles.likeTextStyle}>No</Text>
                        </View>
                        <View style={[styles.itemBottomSubContainer, { marginRight: 25 }]}>
                            <SvgXml xml={smallHeartSvg} />
                            <Text style={styles.likeTextStyle}>Like</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        marginTop: '50%',
        marginLeft: '7%',
    },
    titleTextStyle: {
        width: 300,
        fontSize: 25,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#000000',
        lineHeight: 32,
    },
    textStyle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 21,
    },
    itemContainer: {
        marginHorizontal: 10,
        marginTop: 18,
        width: 168,
        height: 212,
        alignSelf: 'center',
        borderWidth: 1.5,
        borderColor: '#CFD3D6',
        borderRadius: 8,
        overflow: 'hidden',
    },
    itemBottomContainer: {
        marginHorizontal: 12,
        marginTop: 'auto',
        marginBottom: 3.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemBottomSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeTextStyle: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
    },
    itemContentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 8,
        marginTop: 10,
    },
    imageStyle: {
        width: 168,
        height: 175,
    },
    modalContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.32)',
    },
    thumbnailImageStyle: {
        marginTop: 15,
        width: '90%',
        // height:'90%',
        resizeMode: 'stretch',
    },
    bottomContainer: {
        marginTop: 10,
        marginBottom: 82,
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    detailsContainer: {
        padding: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    modalSubContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        marginTop: 15,
        marginRight: 15,
        alignSelf: 'flex-end',
    },
});

export default AllSeeLikesScreen;
