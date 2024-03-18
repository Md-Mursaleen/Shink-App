/* eslint-disable prettier/prettier */
// ProfilePictureWithOutline.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useProfileContext } from '../contexts/ProfileContext';

const ProfilePictureWithOutline = ({ source }) => {
    const { state } = useProfileContext();
    console.log('ProfileContext value:', state);
    const strength = state.profileStrength;
    console.log('Strength:', strength); // Log the strength value
    const borderColor = getBorderColor(strength);
    const customBorderStyle = getCustomBorderStyle(borderColor, strength);

    useEffect(() => {
        console.log('ProfilePictureWithOutline re-rendered. Strength:', strength);
    }, [strength]);

    return (
        <View style={[styles.profilePictureContainer, customBorderStyle]}>
            <Image source={source} style={styles.profilePictureStyle} />
        </View>
    );
};

const getBorderColor = (strength) => {
    if (strength >= 80) {
        return '#00ff00';
    } else if (strength >= 50) {
        return '#fff00'; // Yellow color for medium strength
    } else {
        return '#ff0000'; // Red color for low strength
    }
};

const getCustomBorderStyle = (color, strength) => {
    const whitePortionMap = {
        10: 0.9,
        20: 0.8,
        30: 0.7,
        40: 0.6,
        50: 0.5,
        60: 0.4,
        70: 0.3,
        80: 0.2,
        90: 0.1,
        100: 0,
    };

    const whitePortion = whitePortionMap[strength] || 0;

    return {
        borderColor: color,
        borderWidth: 3,
        borderRadius: circleSize / 2,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 10,
        // Use transparent border for a portion of the border
        borderStyle: 'solid',
        // Adjust the width of the transparent border based on the white portion
        borderImage: `linear-gradient(to right, ${color}, ${color} ${whitePortion * 100}%, 
            white ${whitePortion * 100}%, white 100%) 1 100%`,
    };
};

const circleSize = 115;

const styles = StyleSheet.create({
    profilePictureContainer: {
        width: circleSize,
        height: circleSize,
    },
    profilePictureStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: circleSize / 2, // Border radius (half of circle size)
    },
});

export default ProfilePictureWithOutline;
