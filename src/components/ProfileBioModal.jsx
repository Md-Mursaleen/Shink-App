/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { closeModalIconSvg } from '../data/SvgImageData';
import LinearGradient from 'react-native-linear-gradient';

const ProfileBioModal = ({ visible, onSave, onClose, initialBio }) => {
    const [bio, setBio] = useState(initialBio);
    const maxCharacterLimit = 100;
    const isOverLimit = bio.length > maxCharacterLimit;

    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.purpleBarStyle}>
                    <TouchableOpacity onPress={() => onClose()}>
                        {/* <Text style={styles.closeButtonTextStyle}>Close</Text> */}
                        <SvgXml xml={closeModalIconSvg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSave(bio)}>
                        <Text style={styles.saveButtonTextStyle}>Save</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.bioTextInputContainer}>
                    <TextInput style={[styles.bioTextInputStyle,
                    isOverLimit && { borderColor: '#eb4335' }, // Apply styles conditionally
                    ]}
                        placeholder="Type your bio"
                        placeholderTextColor={'#282c3f'}
                        multiline
                        numberOfLines={5}
                        value={bio}
                        onChangeText={(text) => setBio(text)} />
                    {/* Character count display inside TextInput */}
                    <Text style={[styles.characterCountTextStyle,
                    isOverLimit ? { color: '#eb4335' } : { color: '#000000' },
                    ]}>
                        {bio.length}/{maxCharacterLimit} characters
                    </Text>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.32)',
    },
    purpleBarStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveButtonTextStyle: {
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    closeButtonTextStyle: {
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    bioTextInputContainer: {
        position: 'relative',
        padding: 20,
        marginTop: 56,
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    bioTextInputStyle: {
        padding: 20,
        width: '100%',
        height: 110,
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 16,
        // borderWidth: 1,
        // borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    characterCountTextStyle: {
        position: 'absolute',
        bottom: '25%',
        right: '10%',
        fontSize: 11,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#979797',
        lineHeight: 15,
    },
});

export default ProfileBioModal;


