/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, Text, Pressable, Image,
    TouchableOpacity, FlatList,
} from 'react-native';
import { likesData } from '../data/LikesData';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';
import { record } from 'aws-amplify/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';

const LikesScreen = () => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLikes, setSelectedLikes] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');

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
        ]).then(dataItem => {
            const formattedData = {};
            dataItem.forEach(item => {
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

    function AnalyticsFunction(props) {
        let name;
        if (!props.name) {
            console.log("'name' doesn't exists. Please pass the event name while recording the event.");
            return "'name' doesn't exists. Please pass the event name while recording the event.";
        } else {
            name = props.name;
        }
        let attributes = props.attributes || {};
        let metrics = props.metrics || {};
        record({
            name: name,
            attributes: attributes,
            metrics: metrics,
        });
        console.log('Event recorded successfully.');
        return 'Event recorded successfully.';
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const url = 'https://fm5i444e3m.execute-api.ap-south-1.amazonaws.com/default/getData?data=likes';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    // console.log(data);

    const onPressItem = (item) => {
        if (selectedItems.includes(item.text)) {
            setSelectedItems(
                selectedItems.filter(like => like !== item.text)
            );
        } else {
            setSelectedItems([...selectedItems, item.text]);
        }
        setSelectedLikes((prevSelectedLikes) => {
            const categoryIndex = prevSelectedLikes.findIndex(
                (like) => like.category === item.category
            );
            // If category already exists, update it
            if (categoryIndex !== -1) {
                const updatedLikes = [...prevSelectedLikes];
                const subCategoryIndex = updatedLikes[categoryIndex].subCategory.indexOf(
                    item.text
                );
                // If subCategory exists, remove it; otherwise, add it
                if (subCategoryIndex !== -1) {
                    updatedLikes[categoryIndex].subCategory.splice(subCategoryIndex, 1);
                    // If no more subCategory items, remove the whole category
                    if (updatedLikes[categoryIndex].subCategory.length === 0) {
                        updatedLikes.splice(categoryIndex, 1);
                    }
                } else {
                    updatedLikes[categoryIndex].subCategory.push(item.text);
                }
                return updatedLikes;
            }
            // If category doesn't exist, add a new entry
            let newCategory = {
                category: item.category,
                subCategory: [item.text],
            };
            return [...prevSelectedLikes,
                newCategory,
            ];
        });
    };

    const totalLikesSelected = selectedItems.length;

    // console.log(selectedLikes);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => onPressItem(item)}
            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}>
            <Text style={styles.itemTextStyle}>{item.text}</Text>
        </Pressable>
    );

    const renderCategory = ({ item }) => (
        <>
            <Text style={styles.subTitleTextStyle}>{item.name}</Text>
            <FlatList data={item.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderItem({ item })}
                style={[styles.contentContainer, item.name === 'Nature' &&
                    { marginBottom: '8%' }]} />
        </>
    );

    const handleOnPress = async () => {
        if (selectedItems.length >= 1) {
            AsyncStorage.setItem('likes', JSON.stringify(selectedLikes));
            navigation.navigate('Dislikes');
            AnalyticsFunction({
                name: "itemSelection",
                attributes: { userId: userId },
                metrics: { visitTime: new Date().getTime() },
            });
        }
    };

    console.log(selectedLikes);

    return (
        <>
            <ProgressBar progress={0.35} />
            <View style={styles.container}>
                <Text style={styles.titleTextStyle}>Likes</Text>
                <FlatList data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => renderCategory({ item })}
                    showsVerticalScrollIndicator={false} />
                {/* <View style={styles.headerButtonContainer}>
                        <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                            style={styles.previousButtonContainer}>
                            <Image source={require('../assets/images/left-arrow.png')}
                                style={styles.imageStyle} />
                        </TouchableOpacity>
                        <View style={styles.lineStyle} />
                    </View> */}
                <View style={styles.bottomContainer}>
                    <Pressable onPress={() => handleOnPress()}
                        style={[styles.buttonContainer, totalLikesSelected >= 1 ?
                            { backgroundColor: "#9d4edd" } :
                            { backgroundColor: "#e0e0e0" }]}>
                        <Text style={styles.buttonTextStyle}>Continue</Text>
                        {/* <Text>{" "}</Text>
                    <Text style={styles.selectedInterestsLengthTextStyle}>{totalLikesSelected}</Text>
                    <Text style={styles.selectedInterestsLengthTextStyle}>{"/10"}</Text> */}
                    </Pressable>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalize(20),
        paddingTop: normalize(10),
        backgroundColor: '#ffffff',
    },
    titleTextStyle: {
        marginTop: normalize(10),
        fontSize: 32,
        fontWeight: "600",
        color: "#000000",
        lineHeight: 41.6,
    },
    contentContainer: {
        marginTop: normalize(10),
        // marginBottom: '2%',
        marginLeft: normalize(-3),
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    itemContainer: {
        marginVertical: normalize(6.5),
        marginHorizontal: normalize(4.5),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(8),
        borderWidth: 1,
        borderRadius: 25,
    },
    itemTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: "#000000",
        textAlign: "center",
    },
    bottomContainer: {
        paddingVertical: normalize(3),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    buttonContainer: {
        padding: normalize(13),
        marginTop: normalize(5),
        marginBottom: normalize(10), //can be changed
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        lineHeight: 23.4,
    },
    selectedInterestsLengthTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        lineHeight: 23.4,
    },
    headerButtonContainer: {
        position: 'absolute',
        padding: normalize(5),
        top: normalize(0),
        left: normalize(0),
        right: normalize(20),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonContainer: {
        padding: normalize(10),
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    imageStyle: {
        width: normalize(18),
        height: normalize(18),
        tintColor: '#000000',
    },
    lineStyle: {
        marginRight: 'auto',
        top: normalize(18),
        height: normalize(3),
        width: '40%',
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    subTitleTextStyle: {
        marginTop: normalize(15),
        fontSize: 16,
        fontVariant: '700',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
});

export default LikesScreen;
