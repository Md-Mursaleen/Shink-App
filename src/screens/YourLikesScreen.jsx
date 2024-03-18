/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import {
    userArtLikesData, userMusicGenresLikesData,
    userMusicalInstrumentLikesData, userSportsLikesData,
    userPhysicalActivityLikesData, userAdventuresLikesData,
    userIndoorsLikesData, userNatureLikesData,
} from '../data/UserLikesData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourLikesScreen = () => {
    const navigation = useNavigation();
    const [selectedLikes, setSelectedLikes] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedMusicItems, setSelectedMusicItems] = useState([]);
    const [selectedSportsItems, setSelectedSportsItems] = useState([]);
    const [selectedArtItems, setSelectedArtItems] = useState([]);
    const [selectedPhysicalItems, setSelectedPhysicalItems] = useState([]);
    const [selectedAdventureItems, setSelectedAdventureItems] = useState([]);
    const [selectedNatureItems, setSelectedNatureItems] = useState([]);
    const [selectedIndoorsItems, setSelectedIndoorsItems] = useState([]);
    const [selectedMusicalItems, setSelectedMusicalItems] = useState([]);
    // const [selectedMusicItems, setSelectedMusicItems] = useState([
    //     {
    //         category: "Music Genres",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedSportsItems, setSelectedSportsItems] = useState([
    //     {
    //         category: "Sports",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedArtItems, setSelectedArtItems] = useState([
    //     {
    //         category: "Art",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedPhysicalItems, setSelectedPhysicalItems] = useState([
    //     {
    //         category: "Physical Activity",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedAdventureItems, setSelectedAdventureItems] = useState([
    //     {
    //         category: "Adventure",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedNatureItems, setSelectedNatureItems] = useState([
    //     {
    //         category: "Nature",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedIndoorsItems, setSelectedIndoorsItems] = useState([
    //     {
    //         category: "Indoors",
    //         subCategory: [],
    //     },
    // ]);
    // const [selectedMusicalItems, setSelectedMusicalItems] = useState([
    //     {
    //         category: "Music Instrument",
    //         subCategory: [],
    //     },
    // ]);

    // const addingItems = (ele) => {
    //     // console.log(ele);
    //     if (ele.category === 'Musical Instrument') {
    //         if (selectedMusicalItems?.subCategory?.includes(ele.text)) {
    //             selectedMusicalItems?.subCategory?.filter(interest => interest !== ele.text)
    //         } else {
    //             selectedMusicalItems?.subCategory?.push(ele.text);
    //         }
    //     }
    //     if (ele.category === 'Music Genres') {
    //         if (selectedMusicItems?.subCategory?.includes(ele.text)) {
    //             setSelectedMusicItems(
    //                 selectedMusicItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedMusicItems([...selectedMusicItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Art') {
    //         if (selectedArtItems?.subCategory?.includes(ele.text)) {
    //             setSelectedArtItems(
    //                 selectedArtItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedArtItems([...selectedArtItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Sports') {
    //         if (selectedSportsItems?.subCategory?.includes(ele.text)) {
    //             setSelectedSportsItems(
    //                 selectedSportsItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedSportsItems([...selectedSportsItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Adventure') {
    //         if (selectedAdventureItems?.subCategory?.includes(ele.text)) {
    //             setSelectedAdventureItems(
    //                 selectedAdventureItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedAdventureItems([...selectedAdventureItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Physical Activity') {
    //         if (selectedPhysicalItems?.subCategory?.includes(ele.text)) {
    //             setSelectedPhysicalItems(
    //                 selectedPhysicalItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedPhysicalItems([...selectedPhysicalItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Indoors') {
    //         if (selectedIndoorsItems?.subCategory?.includes(ele.text)) {
    //             setSelectedIndoorsItems(
    //                 selectedIndoorsItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedIndoorsItems([...selectedIndoorsItems, ele.text]);
    //         }
    //     }
    //     if (ele.category === 'Nature') {
    //         if (selectedNatureItems?.subCategory?.includes(ele.text)) {
    //             setSelectedNatureItems(
    //                 selectedNatureItems?.subCategory?.filter(interest => interest !== ele.text)
    //             );
    //         } else {
    //             setSelectedNatureItems([...selectedNatureItems, ele.text]);
    //         }
    //     }
    // };

    // console.log(selectedMusicalItems);

    const onPressItem = (item) => {
        if (selectedItems.includes(item.text)) {
            setSelectedItems(
                selectedItems.filter(interest => interest !== item.text)
            );
        } else {
            setSelectedItems([...selectedItems, item.text]);
        }

        // addingItems(item);

        if (selectedItems.includes((like) => like === item.text)) {
            setSelectedLikes(
                setSelectedLikes.filter(interest => interest !== item.text)
            );
        }
        else {
            if (item.category === 'Musical Instrument') {
                if (selectedMusicalItems.includes(item.text)) {
                    setSelectedMusicalItems(
                        selectedMusicalItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedMusicalItems([...selectedMusicalItems, item.text]);
                }
            }
            else if (item.category === 'Music Genres') {
                if (selectedMusicItems.includes(item.text)) {
                    setSelectedMusicItems(
                        selectedMusicItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedMusicItems([...selectedMusicItems, item.text]);
                }
            }
            else if (item.category === 'Art') {
                if (selectedArtItems.includes(item.text)) {
                    setSelectedArtItems(
                        selectedArtItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedArtItems([...selectedArtItems, item.text]);
                }
            }
            else if (item.category === 'Sports') {
                if (selectedSportsItems.includes(item.text)) {
                    setSelectedSportsItems(
                        selectedSportsItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedSportsItems([...selectedSportsItems, item.text]);
                }
            }
            else if (item.category === 'Adventure') {
                if (selectedAdventureItems.includes(item.text)) {
                    setSelectedAdventureItems(
                        selectedAdventureItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedAdventureItems([...selectedAdventureItems, item.text]);
                }
            }
            else if (item.category === 'Physical Activity') {
                if (selectedPhysicalItems.includes(item.text)) {
                    setSelectedPhysicalItems(
                        selectedPhysicalItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedPhysicalItems([...selectedPhysicalItems, item.text]);
                }
            }
            else if (item.category === 'Indoors') {
                if (selectedIndoorsItems.includes(item.text)) {
                    setSelectedIndoorsItems(
                        selectedIndoorsItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedIndoorsItems([...selectedIndoorsItems, item.text]);
                }
            }
            else if (item.category === 'Nature') {
                if (selectedNatureItems.includes(item.text)) {
                    setSelectedNatureItems(
                        selectedNatureItems.filter(interest => interest !== item.text)
                    );
                } else {
                    setSelectedNatureItems([...selectedNatureItems, item.text]);
                }
            }
        }
        // let objectToPut = {
        //     category: item.category,
        //     subCategory: '',
        //     // LikecategoryID: "1",
        //     // Likename: item.text,
        //     // LikeID: item.id,
        // };
        // setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
        // }
    };

    // useEffect(() => {
    //     if (selectedMusicalItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Musical Instrument',
    //             subCategory: selectedMusicalItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedMusicItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Music Genres',
    //             subCategory: selectedMusicItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedArtItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Art',
    //             subCategory: selectedArtItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedSportsItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Sports',
    //             subCategory: selectedSportsItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedAdventureItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Adventure',
    //             subCategory: selectedAdventureItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedPhysicalItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Physical Activities',
    //             subCategory: selectedPhysicalItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedIndoorsItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Indoors',
    //             subCategory: selectedIndoorsItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    //     if (selectedNatureItems.length > 0) {
    //         let objectToPut = {
    //             category: 'Nature',
    //             subCategory: selectedNatureItems,
    //         };
    //         setSelectedLikes([...selectedLikes, JSON.stringify(objectToPut)]);
    //     }
    // }, []);

    const totalLikesSelected = selectedItems.length;

    // const totalSelectedLikes = [];

    const handleOnPress = async () => {
        if (selectedMusicalItems.length > 0) {
            let objectToPut = {
                category: 'Musical Instrument',
                subCategory: selectedMusicalItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedMusicItems.length > 0) {
            let objectToPut = {
                category: 'Music Genres',
                subCategory: selectedMusicItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedArtItems.length > 0) {
            let objectToPut = {
                category: 'Art',
                subCategory: selectedArtItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedSportsItems.length > 0) {
            let objectToPut = {
                category: 'Sports',
                subCategory: selectedSportsItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedAdventureItems.length > 0) {
            let objectToPut = {
                category: 'Adventure',
                subCategory: selectedAdventureItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedPhysicalItems.length > 0) {
            let objectToPut = {
                category: 'Physical Activities',
                subCategory: selectedPhysicalItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedIndoorsItems.length > 0) {
            let objectToPut = {
                category: 'Indoors',
                subCategory: selectedIndoorsItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedNatureItems.length > 0) {
            let objectToPut = {
                category: 'Nature',
                subCategory: selectedNatureItems,
            };
            setSelectedLikes(olditems => [...olditems, objectToPut]);
        }
        if (selectedItems.length >= 2) {
            AsyncStorage.setItem('likes', JSON.stringify(selectedLikes));
            navigation.navigate('YourDislikes', {
                selectedLikes: selectedLikes,
            });
        }
        // const likesObjectToBePost = {
        //     userId: '5',
        //     columnName: "interests",
        //     newValue: {
        //         "Likes": selectedLikes,
        //     },
        // };
        // const response = await fetch('https://kdjwgyqjp2.execute-api.ap-south-1.amazonaws.com/default/UpdateUser', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(likesObjectToBePost),
        // });
        // const userData = await response.json();
        // console.log(userData);
    };
    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    console.log(selectedLikes);

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.titleTextStyle}>Likes</Text>
                <Text style={styles.subTitleTextStyle}>Musical Instrument</Text>
                <View style={styles.contentContainer}>
                    {userMusicalInstrumentLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Music Genres</Text>
                <View style={styles.contentContainer}>
                    {userMusicGenresLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Art</Text>
                <View style={styles.contentContainer}>
                    {userArtLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Sports</Text>
                <View style={styles.contentContainer}>
                    {userSportsLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Physical Activities</Text>
                <View style={styles.contentContainer}>
                    {userPhysicalActivityLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Adventure</Text>
                <View style={styles.contentContainer}>
                    {userAdventuresLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Nature</Text>
                <View style={styles.contentContainer}>
                    {userNatureLikesData.map((item, index) => (
                        <Pressable key={index}
                            style={[styles.itemContainer, selectedItems.includes(item.text) ?
                                { backgroundColor: "#f0e4fa", borderColor: "#9d4edd" } :
                                { backgroundColor: "#ffffff", borderColor: "#b3b3b3" }]}
                            onPress={() => onPressItem(item)}>
                            <Text style={styles.itemTextStyle}>{item.text}</Text>
                        </Pressable>
                    ))}
                </View>
                <Text style={styles.subTitleTextStyle}>Indoors</Text>
                <View style={[styles.contentContainer, { marginBottom: '18%' }]}>
                    {userIndoorsLikesData.map((item, index) => (
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
                totalLikesSelected >= 2 ?
                    { backgroundColor: "#9d4edd" } :
                    { backgroundColor: "#e0e0e0" }]}
                    onPress={() => handleOnPress()}>
                    <Text style={styles.buttonTextStyle}>Continue</Text>
                    <Text>{" "}</Text>
                    <Text style={styles.selectedInterestsLengthTextStyle}>{totalLikesSelected}</Text>
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

export default YourLikesScreen;
