/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ModalReportItems = (
    { item, selectedReportOptions, setSelectedReportOptions,
        selectedReportOptionsData, setIsReportModalOpened, setIsReportItemsModalOpened, setSelectedReportOptionsData,
    }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (selectedOption !== null) {
            setIsReportItemsModalOpened(true);
            setIsReportModalOpened(false);
        }
    }, [selectedOption, setIsReportItemsModalOpened, setIsReportModalOpened, setSelectedReportOptions]);

    const handleOptionButtonPressed = (option) => {
        setSelectedOption(option);
        // if (selectedReportOptionsData?.filter((optionItem) => optionItem.id === option.id).length > 0) {
        //     setSelectedReportOptionsData(
        //         selectedReportOptionsData.filter((optionItem) => optionItem.id !== option.id)
        //     );
        // } else {
        //     if (selectedReportOptionsData.length === 1) {
        //         selectedReportOptionsData.splice(0, 1);
        //         setSelectedReportOptionsData([...selectedReportOptionsData, {
        //             reportItemName: option.name,
        //             reportGivenToId: '5',
        //             reportItemId: option.id,
        //             userid: '0',
        //         }]);
        //     }
        //     else {
        //         setSelectedReportOptions([...selectedReportOptionsData, {
        //             reportItemName: option.name,
        //             reportGivenToId: '5',
        //             reportItemId: option.id,
        //             userid: '0',
        //         }]);
        //     }
        // }
        setSelectedReportOptionsData([...selectedReportOptionsData, {
            reportItemName: option.name,
            reportItemId: option.id,
        }]);
        setSelectedReportOptions([...selectedReportOptions, option.name]);
    };

    const renderOption = (option) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleOptionButtonPressed(option)}
                    style={styles.optionItemStyle}>
                    <Text style={styles.textStyle}>{option.name}</Text>
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButtonSubContainer}>
                            {selectedOption === option &&
                                <View style={styles.innerCircleStyle} />}
                        </View>
                    </View>
                </TouchableOpacity>
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
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    optionItemStyle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginVertical: 4.9,
        width: '91.5%',
        height: 49.5,
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default ModalReportItems;