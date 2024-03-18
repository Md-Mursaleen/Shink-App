/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const ModalReportItems = (
    { item, selectedOptions, setSelectedOptions, selectedReportSubOptionsData,
        isReportItemSelected, setIsReportItemSelected, selectedReportOptions, setSelectedReportSubOptionsData,
    }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [commentText, setCommentText] =
        useState('');

    const handleOptionButtonPressed = (option, { id }) => {
        setSelectedOption(option);
        setIsReportItemSelected(true);
        if (selectedOptions.includes(id)) {
            setSelectedOptions(
                selectedOptions.filter(ID => ID !== id)
            );
        } else {
            if (selectedOptions.length === 1) {
                selectedOptions.splice(0, 1);
                setSelectedOptions([...selectedOptions, id]);
            }
            else {
                setSelectedOptions([...selectedOptions, id]);
            }
        }
        setSelectedReportSubOptionsData([...selectedReportSubOptionsData, {
            reportSubItemName: option.name,
            reportSubItemId: option.id,
        }]);
    };

    // console.log(selectedOptions);
    // console.log(selectedOption);

    const renderOption = (option) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleOptionButtonPressed(option, { id: option.id })}
                    style={styles.optionItemStyle}>
                    <Text style={styles.textStyle}>{option.name}</Text>
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButtonSubContainer}>
                            {selectedOptions[0] === option.id &&
                                <View style={styles.innerCircleStyle} />}
                        </View>
                    </View>
                </TouchableOpacity>
                {(selectedOptions.length === 1 &&
                    selectedOptions[selectedOptions.length - 1] === option.id) && (
                        <View style={{ marginHorizontal: 15 }}>
                            <ScrollView style={styles.commentContainer}>
                                <TextInput editable
                                    multiline
                                    placeholder="Please provide the additional details (Optional)"
                                    placeholderTextColor={'#979797'}
                                    value={commentText}
                                    onChangeText={text => setCommentText(text)}
                                    style={styles.textInputStyle} />
                            </ScrollView>
                        </View>
                    )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {renderOption(item)}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    optionItemStyle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginVertical: 4.9,
        width: '91.5%',
        height: 49,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 6,
    },
    radioButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    radioButtonSubContainer: {
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'grey',
    },
    innerCircleStyle: {
        height: 10,
        width: 10,
        backgroundColor: 'grey',
        borderRadius: 6,
    },
    textStyle: {
        fontSize: 12.3,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
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
});

export default ModalReportItems;