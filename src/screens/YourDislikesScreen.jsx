/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import {
    userCreaturesDislikesData, userMaximumGrossOutDislikesData,
    userSocietyDislikesData, userSubstanceDislikesData, userWhatDislikesData,
    userFightClubDislikesData, userLeftRightDislikesData, userEtcDislikesData,
} from '../data/UserDislikesData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourDislikesScreen = () => {
    const navigation = useNavigation();
    const [selectedDislikes, setSelectedDislikes] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCreaturesItems, setSelectedCreaturesItems] = useState([]);
    const [selectedMaximumGrossOutItems, setSelectedMaximumGrossOutItems] = useState([]);
    const [selectedSocietyItems, setSelectedSocietyItems] = useState([]);
    const [selectedSubstanceItems, setSelectedSubstanceItems] = useState([]);
    const [selectedWhatItems, setSelectedWhatItems] = useState([]);
    const [selectedFightClubItems, setSelectedFightClubItems] = useState([]);
    const [selectedLeftRightItems, setSelectedLeftRightItems] = useState([]);
    const [selectedEtcItems, setSelectedEtcItems] = useState([]);

    const onPressItem = (item) => {
        if (selectedItems.includes(item.text)) {
            setSelectedItems(
                selectedItems.filter(interest => interest !== item.text)
            );
        } else {
            setSelectedItems([...selectedItems, item.text]);
        }

        if (selectedItems.includes((dislikes) => dislikes === item.text)) {
            setSelectedDislikes(
                setSelectedDislikes.filter(dislikes => dislikes !== item.text)
            );
        }
        else {
            if (item.category === 'Creatures') {
                if (selectedCreaturesItems.includes(item.text)) {
                    setSelectedCreaturesItems(
                        selectedCreaturesItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedCreaturesItems([...selectedCreaturesItems, item.text]);
                }
            }
            if (item.category === 'Maximum Gross-Out') {
                if (selectedMaximumGrossOutItems.includes(item.text)) {
                    setSelectedMaximumGrossOutItems(
                        selectedMaximumGrossOutItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedMaximumGrossOutItems([...selectedMaximumGrossOutItems, item.text]);
                }
            }
            if (item.category === 'Society') {
                if (selectedSocietyItems.includes(item.text)) {
                    setSelectedSocietyItems(
                        selectedSocietyItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedSocietyItems([...selectedSocietyItems, item.text]);
                }
            }
            if (item.category === 'Substance') {
                if (selectedSubstanceItems.includes(item.text)) {
                    setSelectedSubstanceItems(
                        selectedSubstanceItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedSubstanceItems([...selectedSubstanceItems, item.text]);
                }
            }
            if (item.category === 'What?') {
                if (selectedWhatItems.includes(item.text)) {
                    setSelectedWhatItems(
                        selectedWhatItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedWhatItems([...selectedWhatItems, item.text]);
                }
            }
            if (item.category === 'Fight Club') {
                if (selectedFightClubItems.includes(item.text)) {
                    setSelectedFightClubItems(
                        selectedFightClubItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedFightClubItems([...selectedFightClubItems, item.text]);
                }
            }
            if (item.category === 'Left-Right') {
                if (selectedLeftRightItems.includes(item.text)) {
                    setSelectedLeftRightItems(
                        selectedLeftRightItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedLeftRightItems([...selectedLeftRightItems, item.text]);
                }
            }
            if (item.category === 'Etc.') {
                if (selectedEtcItems.includes(item.text)) {
                    setSelectedEtcItems(
                        selectedEtcItems.filter(dislikes => dislikes !== item.text)
                    );
                } else {
                    setSelectedEtcItems([...selectedEtcItems, item.text]);
                }
            }
        }
    };

    useEffect(() => {
        if (selectedCreaturesItems.length > 0) {
            let objectToPut = {
                category: 'Creatures',
                subCategory: selectedCreaturesItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedMaximumGrossOutItems.length > 0) {
            let objectToPut = {
                category: 'Maximum Gross-Out',
                subCategory: selectedMaximumGrossOutItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedSocietyItems.length > 0) {
            let objectToPut = {
                category: 'Society',
                subCategory: selectedSocietyItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedSubstanceItems.length > 0) {
            let objectToPut = {
                category: 'Substance',
                subCategory: selectedSubstanceItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedWhatItems.length > 0) {
            let objectToPut = {
                category: 'What?',
                subCategory: selectedWhatItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedFightClubItems.length > 0) {
            let objectToPut = {
                category: 'Fight Club',
                subCategory: selectedFightClubItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedLeftRightItems.length > 0) {
            let objectToPut = {
                category: 'Left-Right',
                subCategory: selectedLeftRightItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
        if (selectedEtcItems.length > 0) {
            let objectToPut = {
                category: 'Etc.',
                subCategory: selectedEtcItems,
            };
            setSelectedDislikes([...selectedDislikes, JSON.stringify(objectToPut)]);
        }
    }, []);

    const totalDislikesSelected = selectedItems.length;

    const handleOnPress = async () => {
        if (selectedCreaturesItems.length > 0) {
            let objectToPut = {
                category: 'Creatures',
                subCategory: selectedCreaturesItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedMaximumGrossOutItems.length > 0) {
            let objectToPut = {
                category: 'Maximum Gross-Out',
                subCategory: selectedMaximumGrossOutItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedSocietyItems.length > 0) {
            let objectToPut = {
                category: 'Society',
                subCategory: selectedSocietyItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedSubstanceItems.length > 0) {
            let objectToPut = {
                category: 'Substance',
                subCategory: selectedSubstanceItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedWhatItems.length > 0) {
            let objectToPut = {
                category: 'What?',
                subCategory: selectedWhatItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedFightClubItems.length > 0) {
            let objectToPut = {
                category: 'Fight Club',
                subCategory: selectedFightClubItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedLeftRightItems.length > 0) {
            let objectToPut = {
                category: 'Left-Right',
                subCategory: selectedLeftRightItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedEtcItems.length > 0) {
            let objectToPut = {
                category: 'Etc.',
                subCategory: selectedEtcItems,
            };
            setSelectedDislikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedItems.length >= 2) {
            AsyncStorage.setItem('dislikes', JSON.stringify(selectedDislikes));
            navigation.navigate('Agreement', {
                selectedDislikes: selectedDislikes,
            });
        }
    };
    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    console.log(selectedDislikes);

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.titleTextStyle}>Dislikes</Text>
                <Text style={styles.subTitleTextStyle}>Creatures</Text>
                <View style={styles.contentContainer}>
                    {userCreaturesDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Maximum Gross-Out</Text>
                <View style={styles.contentContainer}>
                    {userMaximumGrossOutDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Society</Text>
                <View style={styles.contentContainer}>
                    {userSocietyDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Substance</Text>
                <View style={styles.contentContainer}>
                    {userSubstanceDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>What?</Text>
                <View style={styles.contentContainer}>
                    {userWhatDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Fight Club</Text>
                <View style={styles.contentContainer}>
                    {userFightClubDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Left-Right</Text>
                <View style={styles.contentContainer}>
                    {userLeftRightDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Etc.</Text>
                <View style={[styles.contentContainer, { marginBottom: '18%' }]}>
                    {userEtcDislikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.headerButtonContainer}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.previousButtonContainer}>
                    <Image source={require('../assets/images/left-arrow.png')}
                        style={styles.imageStyle} />
                </TouchableOpacity>
                <View style={styles.lineStyle} />
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={[styles.buttonContainer,
                totalDislikesSelected >= 2 ?
                    { backgroundColor: "#9d4edd" } :
                    { backgroundColor: "#e0e0e0" }]}
                    onPress={() => handleOnPress()}>
                    <Text style={styles.buttonTextStyle}>Continue</Text>
                    <Text>{" "}</Text>
                    <Text style={styles.selectedInterestsLengthTextStyle}>{totalDislikesSelected}</Text>
                    <Text style={styles.selectedInterestsLengthTextStyle}>{"/10"}</Text>
                </Pressable>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 22,
        paddingTop: 58,
        backgroundColor: '#ffffff',
    },
    titleTextStyle: {
        fontSize: 32,
        fontWeight: "600",
        color: "#000000",
        lineHeight: 41.6,
    },
    contentContainer: {
        marginTop: 10,
        // marginBottom: '2%',
        marginLeft: -3,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    itemContainer: {
        marginVertical: 6.5,
        marginHorizontal: 4.5,
        paddingHorizontal: 14,
        paddingVertical: 8,
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
        paddingVertical: 3,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    buttonContainer: {
        padding: 13,
        marginTop: 5,
        marginBottom: 10, //can be changed
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
        padding: 5,
        top: 0,
        left: 0,
        right: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7f9',
    },
    previousButtonContainer: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    imageStyle: {
        width: 18,
        height: 18,
        tintColor: '#000000',
    },
    lineStyle: {
        marginRight: 'auto',
        top: 18,
        height: 3,
        width: '40%',
        backgroundColor: '#9d4edd',
        opacity: 0.8,
    },
    subTitleTextStyle: {
        marginTop: 15,
        fontSize: 16,
        fontVariant: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
});

export default YourDislikesScreen;
