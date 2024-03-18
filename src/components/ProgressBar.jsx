/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bar } from 'react-native-progress';
import { normalize } from './theme';

const ProgressBarComponent = ({ progress }) => {
    const navigation = useNavigation();
    const [progressed, setProgressed] = useState(0);

    useEffect(() => {
        setProgressed(progress);
    }, [progress]);

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                style={styles.previousButtonContainer}>
                <Image source={require('../assets/images/left-arrow.png')}
                    style={styles.imageStyle} />
            </TouchableOpacity>
            <Bar progress={progressed} width={285} height={4}
                color={'#9d4edd'} unfilledColor={'#e0e0e0'} borderWidth={0} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: normalize(7.5),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
});
export default ProgressBarComponent;
