/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Text, Pressable, Image,
    TouchableOpacity, FlatList,
} from 'react-native';
import { dislikesData } from '../data/DislikesData';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';

const DislikesScreen = () => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDislikes, setSelectedDislikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const url = 'https://fm5i444e3m.execute-api.ap-south-1.amazonaws.com/default/getData?data=dislikes';
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

    const onPressItem = (item) => {
        if (selectedItems.includes(item.text)) {
            setSelectedItems(
                selectedItems.filter(dislike => dislike !== item.text)
            );
        } else {
            setSelectedItems([...selectedItems, item.text]);
        }

        setSelectedDislikes((prevSelectedDisLikes) => {
            const categoryIndex = prevSelectedDisLikes.findIndex(
                (dislike) => dislike.category === item.category
            );
            // If category already exists, update it
            if (categoryIndex !== -1) {
                const updatedDislikes = [...prevSelectedDisLikes];
                const subCategoryIndex = updatedDislikes[categoryIndex].subCategory.indexOf(
                    item.text
                );
                // If subCategory exists, remove it; otherwise, add it
                if (subCategoryIndex !== -1) {
                    updatedDislikes[categoryIndex].subCategory.splice(subCategoryIndex, 1);
                    // If no more subCategory items, remove the whole category
                    if (updatedDislikes[categoryIndex].subCategory.length === 0) {
                        updatedDislikes.splice(categoryIndex, 1);
                    }
                } else {
                    updatedDislikes[categoryIndex].subCategory.push(item.text);
                }
                return updatedDislikes;
            }
            // If category doesn't exist, add a new category
            return [...prevSelectedDisLikes,
            { category: item.category, subCategory: [item.text] },
            ];
        });
    };

    const totalDislikesSelected = selectedItems.length;

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
            AsyncStorage.setItem('dislikes', JSON.stringify(selectedDislikes));
            navigation.navigate('GenderSelection');
        }
    };

    return (
        <>
            <ProgressBar progress={0.40} />
            <View style={styles.container}>
                <Text style={styles.titleTextStyle}>Dislikes</Text>
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
                        style={[styles.buttonContainer, totalDislikesSelected >= 1 ?
                            { backgroundColor: "#9d4edd" } :
                            { backgroundColor: "#e0e0e0" }]}>
                        <Text style={styles.buttonTextStyle}>Continue</Text>
                        {/* <Text>{" "}</Text> */}
                        {/* <Text style={styles.selectedInterestsLengthTextStyle}>{totalDislikesSelected}</Text> */}
                        {/* <Text style={styles.selectedInterestsLengthTextStyle}>{"/10"}</Text> */}
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
        color: "#ffffff",
        lineHeight: 23.4,
    },
    selectedInterestsLengthTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
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

export default DislikesScreen;
