/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { smallHeartSvg, hyperShinkSvg, personHeartSvg, closeIconSvg, flagSvg } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const premiumPlansData = [
    {
        id: '1',
        name: 'Popular',
        duration: '1 Week',
        price: '7',
        timeInWeeks: 1,
        discount: 0,
        freeViews: 10,
    },
    {
        id: '2',
        name: 'Save 20%',
        duration: '1 Months',
        price: '5',
        timeInWeeks: 4,
        discount: 2,
        freeViews: 25,
    },
    {
        id: '3',
        name: 'Save 30%',
        duration: '3 Months',
        price: '4',
        timeInWeeks: 12,
        discount: 3,
        freeViews: 45,
    },
    {
        id: '4',
        name: 'Save 50%',
        duration: '6 Months',
        price: '2',
        timeInWeeks: 24,
        discount: 4,
        freeViews: 60,
    },
];

const PremiumPlansScreen = ({ route }) => {
    const navigation = useNavigation();
    const { setBlurRadius, isHomeScreen, setHasPremiumPlans } = route?.params;
    const [selectedPlan, setSelectedPlan] = useState({
        id: '1',
        name: 'Popular',
        duration: '1 Week',
        price: '7',
        timeInWeeks: 1,
        discount: 0,
        freeViews: 10,
    });
    const [selectedPrice, setSelectedPrice] = useState('$7');
    const [userId, setUserId] = useState('');
    // console.log(selectedPlan);

    const handleOnPress = ({ item }) => {
        setSelectedPrice((Number(item.price) * item.timeInWeeks).toString());
        setSelectedPlan(item);
    };

    useEffect(() => {
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
    }, []);

    console.log(userId);

    const handleOnPressButton = async () => {
        // const planObjectToBePost = {
        //     userId: '5',
        //     isPaidUser: false,
        //     chosenPlan: {
        //         duration: selectedPlan.duration,
        //         price: Number(selectedPrice),
        //         freeViews: selectedPlan.freeViews,
        //         discount: selectedPlan.discount,
        //     },
        // };

        // const response = await fetch('https://vb29xieuoc.execute-api.ap-south-1.amazonaws.com/default/UpdateUserSubscription', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(planObjectToBePost),
        // });
        // const userData = await response.json();
        // console.log(userData);

        let userSelectedPlan = {
            duration: selectedPlan.duration,
            price: Number(selectedPrice),
            freeViews: selectedPlan.freeViews,
            discount: selectedPlan.discount,
        };
        var query = `mutation updateShinkUser($input: UpdateShinkUserInput!) {
            updateShinkUser(input: $input) {
              userId
            }
          }`;
        const url =
            'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        "input": {
                            "userId": userId,
                            "subscriptionInfo": JSON.stringify(userSelectedPlan),
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response: ', responseData);
        } catch (error) {
            console.log(error);
        }

        if (isHomeScreen === false) {
            navigation.goBack();
            setBlurRadius(0);
        }
        if (isHomeScreen === true) {
            navigation.goBack();
            setHasPremiumPlans(true);
        }
    };

    return (
        <View style={styles.container}>
            <SvgXml xml={closeIconSvg} onPress={() => navigation.goBack()}
                style={styles.iconStyle} />
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.linearGradientStyle}>
                <Text style={styles.premiumPlanTextStyle}>Premium Plan</Text>
            </LinearGradient>
            <View style={{ marginTop: normalize(40) }}>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={smallHeartSvg} />
                    <Text style={styles.optionItemTextStyle}>Send Unlimited Likes</Text>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={personHeartSvg} />
                    <Text style={styles.optionItemTextStyle}>See Who Likes you</Text>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={hyperShinkSvg} />
                    <Text style={styles.optionItemTextStyle}>HyperShink</Text>
                </View>
                <View style={styles.optionItemStyle}>
                    <SvgXml xml={flagSvg} />
                    <Text style={styles.optionItemTextStyle}>Limitless Flags</Text>
                </View>
            </View>
            <FlatList data={premiumPlansData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleOnPress({ item })}
                        style={[styles.premiumPlanItemContainer,
                        selectedPlan.name === item.name && {
                            borderColor: '#9e5594',
                        },
                        item.id === '4' && { marginRight: 15 },
                        ]}>
                        <View style={[styles.premiumPlanItemHeaderContainer,
                        selectedPlan.name === item.name && {
                            backgroundColor: '#9e5594',
                        },
                        ]}>
                            <Text style={[styles.premiumPlanNameTextStyle,
                            selectedPlan.name === item.name && {
                                color: '#ffffff',
                            },
                            ]}>{item.name}</Text>
                        </View>
                        <Text style={styles.itemDurationTextStyle}>{item.duration}</Text>
                        <Text style={styles.itemPriceTextStyle}>${item.price}/wk</Text>
                    </Pressable>
                )}
                style={{ marginTop: '24%' }} />
            <Text style={styles.termTextStyle}>Terms and conditions</Text>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.buttonContainer}>
                <Pressable onPress={() => handleOnPressButton()}>
                    <Text style={styles.buttonTextStyle}>Subscribe With ${selectedPrice}</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    optionItemStyle: {
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(11.5),
        marginVertical: normalize(6),
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1.8,
        borderColor: '#cfd3d6',
        borderRadius: 4,
    },
    optionItemTextStyle: {
        marginLeft: 8,
        fontSize: 16.2,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    imageStyle: {
        width: 29,
        height: 29,
        resizeMode: 'contain',
    },
    iconStyle: {
        marginTop: 23,
        marginLeft: 15,
    },
    linearGradientStyle: {
        paddingVertical: 7,
        paddingHorizontal: 8,
        marginTop: 20,
        width: 122,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 4,
    },
    premiumPlanTextStyle: {
        fontSize: 15.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 21,
    },
    premiumPlanItemContainer: {
        marginLeft: 15,
        width: 120,
        height: 95,
        borderWidth: 1.2,
        borderColor: '#cfd3d6',
        borderRadius: 4,
        gap: 13,
    },
    premiumPlanItemHeaderContainer: {
        height: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cfd3d6',
    },
    premiumPlanNameTextStyle: {
        fontSize: 12.2,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
    },
    itemDurationTextStyle: {
        fontSize: 11.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'center',
        lineHeight: 16,
    },
    itemPriceTextStyle: {
        fontSize: 16.2,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        textAlign: 'center',
        lineHeight: 21,
    },
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 30,
        width: '90%',
        height: 48,
        alignSelf: 'center',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 24,
    },
    termTextStyle: {
        marginBottom: 20,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        textAlign: 'center',
        lineHeight: 16,
    },
});

export default PremiumPlansScreen;
