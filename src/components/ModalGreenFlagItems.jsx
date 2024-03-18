/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';

const items = {
    smart: require('../../src/assets/icons/smart.png'),
    funny: require('../../src/assets/icons/funny.png'),
    sexy: require('../../src/assets/icons/sexy.png'),
    cute: require('../../src/assets/icons/cute.png'),
    honest: require('../../src/assets/icons/honest.png'),
    kind: require('../../src/assets/icons/kind.png'),
    polite: require('../../src/assets/icons/polite.png'),
    generous: require('../../src/assets/icons/generous.png'),
    other: require('../assets/icons/other.png'),
};

const ModalGreenFlagItems = ({ item, selectedGivenGreenFlags, setSelectedGivenGreenFlags,
    selectedReceivedGreenFlags, setSelectedReceivedGreenFlags }) => {
    const [greenFlagSelected, setGreenFlagSelected] = useState(false);
    const [commentText, setCommentText] =
        useState('');
    const onCheckBoxClick = ({ flagItem }) => {
        if (selectedGivenGreenFlags?.filter((flag) => flag.id === flagItem.id).length > 0) {
            setSelectedGivenGreenFlags(
                selectedGivenGreenFlags?.filter((flag) => flag.id !== flagItem.id)
            );
        } else {
            let objectToBePut = {
                id: flagItem.id,
                flagType: flagItem.flagName,
                flaggedToUserId: '4',
                comments: '',
            };
            setSelectedGivenGreenFlags([...selectedGivenGreenFlags, objectToBePut]);
        }

        if (selectedReceivedGreenFlags?.filter((flag) => flag.id === flagItem.id).length > 0) {
            setSelectedReceivedGreenFlags(
                selectedReceivedGreenFlags?.filter((flag) => flag.id !== flagItem.id)
            );
        } else {
            let objectToBePut = {
                id: flagItem.id,
                flagType: flagItem.flagName,
                flaggedByUserId: '0',
                comments: '',
            };
            setSelectedReceivedGreenFlags([...selectedReceivedGreenFlags, objectToBePut]);
        }
        setGreenFlagSelected(!greenFlagSelected);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.subContainer}>
                <View style={[styles.contentContainer, { borderColor: '#34a853' }]}>
                    <Image source={items[item.id]} style={styles.imageStyle} />
                    <Text style={styles.flagNameTextStyle}>{item.flagName}</Text>
                </View>
                <CheckBox isChecked={greenFlagSelected}
                    onClick={() => onCheckBoxClick({ flagItem: item })}
                    checkBoxColor={'#bbb6b6'}
                    checkedCheckBoxColor={'#bebdbd'}
                    style={styles.checkboxStyle} />
            </View>
            {(selectedGivenGreenFlags?.length === 1 && selectedGivenGreenFlags[0]?.id === item.id &&
                selectedGivenGreenFlags[0].flagType !== 'Other') && (
                    <View style={{ marginHorizontal: 15 }}>
                        <ScrollView style={styles.commentContainer}>
                            <TextInput editable
                                multiline
                                placeholder="Please provide the additional details, Why are you flagging?"
                                placeholderTextColor={'#979797'}
                                value={commentText}
                                onChangeText={text => setCommentText(text)}
                                style={styles.textInputStyle} />
                        </ScrollView>
                    </View>
                )}
            {(selectedGivenGreenFlags?.length === 1 && selectedGivenGreenFlags[0]?.id === item.id &&
                selectedGivenGreenFlags[0].flagType === 'Other') && (
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={styles.suggestTitleTextStyle}>Suggest a flag?</Text>
                    </View>
                )}
        </View >
    );
};
const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 5,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
    imageStyle: {
        width: 23,
        height: 23,
    },
    flagNameTextStyle: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    checkboxStyle: {
        flex: 1,
        marginLeft: -40,
    },
    commentContainer: {
        paddingHorizontal: 13,
        marginVertical: 5,
        width: '100%',
        height: 123,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#cfd3d6',
    },
    textInputStyle: {
        width: 295,
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    suggestTitleTextStyle: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#666666',
        lineHeight: 16,
    },
});

export default ModalGreenFlagItems;