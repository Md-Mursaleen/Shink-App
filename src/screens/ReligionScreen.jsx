/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';

const ReligionScreen = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API = 'https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql';
            const userid = '8';
            try {
                const response = await fetch(NEW_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                    },
                    body: JSON.stringify({
                        query: `
                            query GetShinkUser($userId: String!) {
                                getShinkUser(userId: $userId) {
                                   religion
                                }
                            }
                        `,
                        variables: { userId: userid },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                if (data && data.data && data.data.getShinkUser) {
                    const user = data.data.getShinkUser;
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const updateReligion = async () => {
        const UPDATE_USER_RELIGION_MUTATION = `
          mutation UpdateUserReligion($userId: String!, $religion: String!) {
            updateShinkUser(input: { userId: $userId, religion: $religion }) {
              userId
              religion
            }
          }
        `;
        try {
            const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query: UPDATE_USER_RELIGION_MUTATION,
                    variables: { userId: '8', religion: selectedOption },
                }),
            });
            const data = await response.json();
            console.log('API Response: ', data);
            console.log('Updated User Data: ', data);
        } catch (error) {
            console.error('Error while updating user religion: ', error);
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = async () => {
        if (selectedOption) {
            await updateReligion();
            console.log('Selected Option: ', selectedOption);
            console.log('Option sent to backend successfully.');
            // Logic for navigating to the next screen or performing any other action
        } else {
            setSelectedOption('Skipped');
            console.log('No option selected. Selected Option set to "Skipped".');
            // Logic for navigating to the next screen or performing any other action
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Religion</Text>
                </TouchableOpacity>
            </LinearGradient>
            <ScrollView style={{ marginBottom: normalize(70) }}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionTextStyle}>What is your Religion?</Text>
                    <View>
                        <OptionButton label="Atheism"
                            onPress={() => setSelectedOption('atheism')}
                            selected={selectedOption === 'atheism'} />
                        <OptionButton label="Budhism"
                            onPress={() => setSelectedOption('budhism')}
                            selected={selectedOption === 'budhism'} />
                        <OptionButton label="Babism"
                            onPress={() => setSelectedOption('babism')}
                            selected={selectedOption === 'babism'} />
                        <OptionButton label="Caodaism"
                            onPress={() => setSelectedOption('caodaism')}
                            selected={selectedOption === 'caodaism'} />
                        <OptionButton label="Christianity"
                            onPress={() => setSelectedOption('christianity')}
                            selected={selectedOption === 'christianity'} />
                        <OptionButton label="Hinduism"
                            onPress={() => setSelectedOption('hinduism')}
                            selected={selectedOption === 'hinduism'} />
                        <OptionButton label="Confucianism"
                            onPress={() => setSelectedOption('confucianism')}
                            selected={selectedOption === 'confucianism'} />
                        <OptionButton label="Druze"
                            onPress={() => setSelectedOption('druze')}
                            selected={selectedOption === 'druze'} />
                        <OptionButton label="Islam"
                            onPress={() => setSelectedOption('islam')}
                            selected={selectedOption === 'islam'} />
                        <OptionButton label="Jews"
                            onPress={() => setSelectedOption('jews')}
                            selected={selectedOption === 'jews'} />
                        <OptionButton label="Judaism"
                            onPress={() => setSelectedOption('judaism')}
                            selected={selectedOption === 'judaism'} />
                        <OptionButton label="Sikhism"
                            onPress={() => setSelectedOption('sikhism')}
                            selected={selectedOption === 'sikhism'} />
                        <OptionButton label="Yazdanism"
                            onPress={() => setSelectedOption('yazdanism')}
                            selected={selectedOption === 'yazdanism'} />
                        <OptionButton label="Jainism"
                            onPress={() => setSelectedOption('jainism')}
                            selected={selectedOption === 'jainism'} />
                        <OptionButton label="Mandaeism"
                            onPress={() => setSelectedOption('mandaeism')}
                            selected={selectedOption === 'mandaeism'} />
                        <OptionButton label="shamanism"
                            onPress={() => setSelectedOption('shamanaism')}
                            selected={selectedOption === 'shamanism'} />
                        <OptionButton label="Shugendo"
                            onPress={() => setSelectedOption('shugendo')}
                            selected={selectedOption === 'shugendo'} />
                        <OptionButton label="Taoism"
                            onPress={() => setSelectedOption('taoism')}
                            selected={selectedOption === 'taoism'} />
                        <OptionButton label="Zoroastrianism"
                            onPress={() => setSelectedOption('zoroastrianism')}
                            selected={selectedOption === 'zoroastrianism'} />
                        <OptionButton label="Agnostics"
                            onPress={() => setSelectedOption('agnostics')}
                            selected={selectedOption === 'agnostics'} />
                        <OptionButton label="Shinto"
                            onPress={() => setSelectedOption('shinto')}
                            selected={selectedOption === 'shinto'} />
                        <OptionButton label="Yarsanism"
                            onPress={() => setSelectedOption('yarsanism')}
                            selected={selectedOption === 'yarsanism'} />
                        <OptionButton label="Baháʼí Faith"
                            onPress={() => setSelectedOption('BaháʼíFaith')}
                            selected={selectedOption === 'BaháʼíFaith'} />
                        <OptionButton label="Cheondogyo"
                            onPress={() => setSelectedOption('cheondogyo')}
                            selected={selectedOption === 'cheondogyo'} />
                        <OptionButton label="Daejongism"
                            onPress={() => setSelectedOption('daejongism')}
                            selected={selectedOption === 'daejongism'} />
                        <OptionButton label="Ryukyuan"
                            onPress={() => setSelectedOption('ryukyuan')}
                            selected={selectedOption === 'ryukyuan'} />
                    </View>
                </View>
            </ScrollView>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}>
                    <Text style={styles.nextButtonTextStyle}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const OptionButton = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}
            style={styles.optionButtonContainer}>
            <Text style={styles.optionButtonTextStyle}>{label}</Text>
            <View style={styles.radioButtonOuterContainer}>
                {selected && <View style={styles.radioButtonInnerContainer} />}
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImageStyle: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: 13,
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    questionContainer: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(15),
    },
    questionTextStyle: {
        marginBottom: normalize(15),
        marginLeft: normalize(5),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    optionButtonContainer: {
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(10),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#b3b3b3',
        borderRadius: 5,
    },
    optionButtonTextStyle: {
        fontSize: 16.5,
        fontWeight: '500',
        // fontFamily: 'AvenirNext-Bold',
        color: '#282c3f',
        lineHeight: 21,
    },
    radioButtonOuterContainer: {
        width: normalize(20),
        height: normalize(20),
        marginRight: normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#9e5594',
        borderRadius: 10,
    },
    radioButtonInnerContainer: {
        width: normalize(10),
        height: normalize(10),
        backgroundColor: '#b3b3b3',
        borderRadius: 5,
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: '5%', // Set margin horizontally to 5% on both sides
        marginBottom: normalize(20), // Adjust margin bottom if needed
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        zIndex: 1,
    },
    nextButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default ReligionScreen;
