/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Text, View, Alert, Image, StyleSheet, Pressable,
    TouchableOpacity, ActivityIndicator, ScrollView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { viewIconSvg, hideIconSvg, refreshIconSvg } from '../data/SvgImageData';
import { normalize } from '../components/theme';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

const SpotifyMainScreen = () => {
    // Add your existing state variables here
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(false);
    const [token, setToken] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [showNextButton, setShowNextButton] = useState(true);
    const [hasTopArtists, setHasTopArtists] = useState(true);
    const [loading, setLoading] = useState(true);
    const [expandedCards, setExpandedCards] = useState([]);
    const [expandedSongs, setExpandedSongs] = useState([]);
    const [genres, setGenres] = useState([]);

    class Music {
        constructor(topArtists, topSongs, genres) {
            this.Artists = topArtists;
            this.Tracks = topSongs;
            this.Genres = genres;
        }
    }

    const renderArtistCard = (item, index) => {
        const isExpanded = expandedCards.includes(index);
        const handleToggleExpand = () => {
            setExpandedCards(prevExpandedCards => {
                const newExpandedCards = prevExpandedCards.includes(index)
                    ? prevExpandedCards.filter(cardIndex => cardIndex !== index)
                    : [...prevExpandedCards, index];
                console.log('New expanded cards: ', newExpandedCards);
                return newExpandedCards;
            });
        };

        return (
            <View key={index} style={styles.artistCardContainer}>
                <Image source={{ uri: item.images[0]?.url }}
                    style={styles.artistImageStyle} />
                <Text numberOfLines={1.5}
                    ellipsizeMode="tail"
                    style={styles.artistNameTextStyle}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleToggleExpand()}
                    style={[styles.viewButtonContainer, isExpanded && {
                        backgroundColor: '#cfd3d6',
                    }]}>
                    <View style={styles.svgImageContainer}>
                        {isExpanded ? (
                            <SvgXml xml={hideIconSvg} />
                        ) : (
                            <SvgXml xml={viewIconSvg} />
                        )}
                    </View>
                    <Text style={{ color: isExpanded ? '#979797' : '#c680b2' }}>
                        {isExpanded ? 'Hidden' : 'Hide'}
                    </Text>
                </TouchableOpacity>
                {isExpanded && (
                    <TouchableOpacity onPress={() => handleToggleExpand()}
                        style={styles.overlayStyle} />
                )}
            </View>
        );
    };

    const renderSongCard = (item, index) => {
        const isExpanded = expandedSongs.includes(index);
        const handleToggleSongExpand = () => {
            setExpandedSongs(prevExpandedSongs => {
                const newExpandedSongs = prevExpandedSongs.includes(index)
                    ? prevExpandedSongs.filter(songIndex => songIndex !== index)
                    : [...prevExpandedSongs, index];
                console.log('New expanded songs: ', newExpandedSongs);
                return newExpandedSongs;
            });
        };

        return (
            <View key={index} style={styles.songCardContainer}>
                <Image source={{ uri: item.album?.images[0]?.url || item.images[0]?.url }}
                    style={styles.songImageStyle} />
                <Text numberOfLines={1.5} ellipsizeMode="tail"
                    style={styles.songNameTextStyle}>
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => handleToggleSongExpand()}
                    style={[styles.viewButtonContainer,
                    isExpanded && {
                        backgroundColor: '#cfd3d6',
                    }]}>
                    <View style={styles.svgImageContainer}>
                        {isExpanded ? (
                            <SvgXml xml={hideIconSvg} />
                        ) : (
                            <SvgXml xml={viewIconSvg} />
                        )}
                    </View>
                    <Text style={{ color: isExpanded ? '#979797' : '#c680b2' }}>
                        {isExpanded ? 'Hidden' : 'Hide'}
                    </Text>
                </TouchableOpacity>
                {isExpanded && (
                    <TouchableOpacity onPress={() => handleToggleSongExpand()}
                        style={styles.overlayStyle} />
                )}
            </View>
        );
    };

    const handleNextButton = () => {
        // Your logic for the Next button
        // For demonstration, hiding the button after pressing
        setShowNextButton(false);
    };

    return (
        <NavigationContainer independent={true}>
            <View style={styles.container}>
                <ProgressBar progress={0.70} />
                <Text style={styles.titleTextStyle}>Spotify</Text>
                <Tab.Navigator initialRouteName="TopArtists"
                    screenOptions={{
                        tabBarActiveTintColor: '#9e5594',
                        tabBarInactiveTintColor: '#979797',
                        tabBarLabelStyle: styles.tabBarLabelStyle,
                        tabBarStyle: styles.tabBarStyle,
                        tabBarIndicatorStyle: {
                            marginLeft: normalize(10),
                            width: normalize(175),
                            backgroundColor: '#9e5594',
                        },
                        tabBarShowLabel: true,
                    }}>
                    <Tab.Screen name="TopArtists"
                        component={TopArtistsScreen}
                        options={{ title: 'Your favorite artists' }} />
                    <Tab.Screen name="TopSongs"
                        component={TopSongsScreen}
                        options={{ title: 'Your favorite music' }} />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: normalize(0),
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        marginTop: normalize(16),
        marginBottom: normalize(10),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between', // Aligns items to the start and end of the container
    },
    connectedTextStyle: {
        paddingVertical: normalize(12),
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: 'rgba(0, 0, 0, 0.80)',
        textAlign: 'center',
        lineHeight: 21,
    },
    iconStyle: {
        bottom: normalize(5),
        marginBottom: normalize(10),
        marginTop: normalize(10),
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    descriptionTextStyle: {
        marginLeft: normalize(10),
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        textAlign: 'left',
        lineHeight: 21,
    },
    artistListStyle: {
        paddingHorizontal: normalize(8),
        paddingTop: normalize(1),
        paddingBottom: normalize(8.5),
        marginBottom: normalize(5),
        height: '20%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    titleTextStyle: {
        marginTop: normalize(12),
        marginLeft: normalize(15),
        marginBottom: normalize(15),
        fontSize: 32,
        fontWeight: '600',
        color: '#282c3f',
        lineHeight: 42,
    },
    tabBarStyle: {
        paddingVertical: normalize(0),
        height: normalize(45),
        backgroundColor: '#ffffff',
    },
    tabBarLabelStyle: {
        marginBottom: normalize(20),
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        lineHeight: 21,
    },
    artistCardContainer: {
        flex: 1,
        padding: normalize(10),
        margin: normalize(5),
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flexBasis: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    artistImageStyle: {
        width: normalize(54),
        height: normalize(54),
        borderRadius: 27,
    },
    artistNameTextStyle: {
        marginTop: normalize(8),
        // maxHeight: 36, // Maximum height for artist name
        fontSize: 14.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'left',
        lineHeight: 21,
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(100, 100, 100, 0.5)', // Semi-transparent black
        borderRadius: 8,
    },
    overlayStyle: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(100, 100, 100, 0.5)', // Semi-transparent black
        borderRadius: 8,
    },
    songCardContainer: {
        flex: 1,
        padding: normalize(10),
        margin: normalize(5),
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flexBasis: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 8,
    },
    songImageStyle: {
        width: 54,
        height: 54,
        borderRadius: 10,
    },
    songNameTextStyle: {
        marginTop: normalize(8),
        fontSize: 14.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        textAlign: 'left',
        lineHeight: 21,
        overflow: 'hidden',
    },
    songListStyle: {
        paddingHorizontal: normalize(8),
        paddingTop: normalize(1),
        paddingBottom: normalize(14),
        height: '20%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    svgImageContainer: {
        padding: normalize(10),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    viewButtonContainer: {
        padding: normalize(2),
        paddingHorizontal: normalize(15),
        marginTop: normalize(-10),
        marginRight: normalize(10),
        width: '24%',
        height: normalize(33),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e4fa',
        gap: 4,
        borderRadius: 30,
    },
    headerSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    refreshTextStyle: {
        marginRight: normalize(10),
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#c680b2',
    },
    borderStyle: {
        marginVertical: normalize(10),
        marginBottom: normalize(20),
        borderBottomColor: '#cfd3d6',
        borderBottomWidth: 10,
    },
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataTextStyle: {
        marginTop: normalize(5),
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#354e66',
        lineHeight: 21,
    },
    bottomButtonContainer: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    allowButtonContainer: {
        padding: 13,
        marginBottom: normalize(18),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9d4edd',
        borderRadius: 5,
    },
    allowButtonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 23.4,
    },
});

export default SpotifyMainScreen;

const TopArtistsScreen = ({ route }) => {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCards, setExpandedCards] = useState([]);
    const [hiddenArtists, setHiddenArtists] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('spotifyAccessToken');
                if (storedToken) {
                    setToken(storedToken);
                    fetchTopArtists(storedToken);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to retrieve access token', error);
            }
        };
        fetchToken();
    }, []);

    const fetchTopArtists = async token => {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/me/top/artists?limit=15',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                },
            );
            const data = await response.json();
            setArtists(data.items);
            setLoading(false);
            await AsyncStorage.setItem('topArtists', JSON.stringify(data.items));
        } catch (error) {
            console.error('Error while fetching top artists: ', error);
            setLoading(false);
        }
    };
    const handleSave = async () => {
        try {
            const topArtistsData = await AsyncStorage.getItem('topArtists');
            const topArtists = topArtistsData ? JSON.parse(topArtistsData) : [];
            await AsyncStorage.setItem('hiddenArtists', JSON.stringify(hiddenArtists));
            navigation.navigate('Agreement', { topArtists, hiddenArtists });
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    };

    const renderArtistCard = (item, index) => {
        const isExpanded = expandedCards.includes(item.id);
        const handleToggleExpand = () => {
            setExpandedCards(prevExpandedCards => {
                const newExpandedCards = prevExpandedCards.includes(item.id)
                    ? prevExpandedCards.filter(id => id !== item.id)
                    : [...prevExpandedCards, item.id];

                // Update the hiddenArtists array based on the newExpandedCards
                const updatedHiddenArtists = artists.reduce((acc, artist) => {
                    if (newExpandedCards.includes(artist.id)) {
                        return acc;
                    } else {
                        return [...acc, artist.id];
                    }
                }, []);
                setHiddenArtists(updatedHiddenArtists);
                console.log(updatedHiddenArtists);
                return newExpandedCards;
            });
        };

        return (
            <View key={index} style={styles.artistCardContainer}>
                <Image source={{ uri: item.images[0]?.url }}
                    style={styles.artistImageStyle} />
                <Text numberOfLines={1.5}
                    ellipsizeMode="tail"
                    style={styles.artistNameTextStyle}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleToggleExpand()}
                    style={[styles.viewButtonContainer, isExpanded && {
                        backgroundColor: '#cfd3d6',
                    }]}>
                    <View style={styles.svgImageContainer}>
                        {isExpanded ? (
                            <SvgXml xml={hideIconSvg} />
                        ) : (
                            <SvgXml xml={viewIconSvg} />
                        )}
                    </View>
                    <Text style={{ color: isExpanded ? '#979797' : '#c680b2' }}>
                        {isExpanded ? 'Hidden' : 'Hide'}
                    </Text>
                </TouchableOpacity>
                {isExpanded && (
                    <TouchableOpacity onPress={() => handleToggleExpand()}
                        style={styles.overlayStyle} />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.descriptionTextStyle, { marginLeft: 10 }]}>
                            Choose artists which you want to show on your profile.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        fetchTopArtists(token);
                    }}
                        style={styles.viewButtonContainer}>
                        <View style={styles.svgImageContainer}>
                            <SvgXml xml={refreshIconSvg} />
                        </View>
                        <Text style={styles.refreshTextStyle}>Refresh</Text>
                    </TouchableOpacity>
                    <View style={styles.borderStyle} />
                </View>
            </View>
            {/* Horizontal Rule */}
            {artists ? (
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3498db"
                            style={styles.loadingIndicatorStyle} />
                    ) : artists.length ? (
                        <View style={styles.artistListStyle}>
                            {artists.map((artist, index) => renderArtistCard(artist, index))}
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTextStyle}>
                                No top artists to display
                            </Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataTextStyle}>
                        No top artists to display
                    </Text>
                </View>
            )}
            <View style={styles.bottomButtonContainer}>
                <Pressable onPress={() => handleSave()}
                    style={styles.allowButtonContainer}>
                    <Text style={styles.allowButtonTextStyle}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};
const TopSongsScreen = ({ route }) => {
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSongs, setExpandedSongs] = useState([]);
    const [hiddenSongs, setHiddenSongs] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('spotifyAccessToken');
                if (storedToken) {
                    setToken(storedToken);

                    // Fetch data when token is set
                    fetchTopSongs(storedToken);
                }
            } catch (error) {
                console.log(error);
                Alert.alert(
                    'Error',
                    'Failed to retrieve access token',
                    error,
                );
            }
        };
        fetchToken();
    }, []);

    const fetchTopSongs = async token => {
        try {
            const response = await fetch(
                'https://api.spotify.com/v1/me/top/tracks?limit=15',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                },
            );
            const data = await response.json();
            setSongs(data.items);
            setLoading(false);
            await AsyncStorage.setItem('topSongs', JSON.stringify(data.items));
        } catch (error) {
            console.error('Error while fetching top songs: ', error);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const topSongsData = await AsyncStorage.getItem('topSongs');
            const topSongs = topSongsData ? JSON.parse(topSongsData) : [];
            await AsyncStorage.setItem('hiddenSongs', JSON.stringify(hiddenSongs));
            navigation.navigate('Agreement', { topSongs, hiddenSongs });
        } catch (error) {
            console.error('Error while saving data: ', error);
        }
    };

    const renderSongCard = (item, index) => {
        const isExpanded = expandedSongs.includes(item.id);

        const handleToggleSongExpand = () => {
            setExpandedSongs(prevExpandedSongs => {
                const newExpandedSongs = prevExpandedSongs.includes(item.id)
                    ? prevExpandedSongs.filter(id => id !== item.id)
                    : [...prevExpandedSongs, item.id];

                const updatedHiddenSongs = songs.reduce((acc, song) => {
                    if (newExpandedSongs.includes(song.id)) {
                        return acc;
                    } else {
                        return [...acc, song.id];
                    }
                }, []);
                setHiddenSongs(updatedHiddenSongs);
                console.log(updatedHiddenSongs);
                return newExpandedSongs;
            });
        };

        return (
            <View key={index} style={styles.songCardContainer}>
                <Image source={{ uri: item.album?.images[0]?.url || item.images[0]?.url }}
                    style={styles.songImageStyle} />
                <Text numberOfLines={1.5} ellipsizeMode="tail"
                    style={styles.songNameTextStyle}>
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => handleToggleSongExpand()}
                    style={[styles.viewButtonContainer,
                    isExpanded && {
                        backgroundColor: '#cfd3d6',
                    }]}>
                    <View style={styles.svgImageContainer}>
                        {isExpanded ? (
                            <SvgXml xml={hideIconSvg} />
                        ) : (
                            <SvgXml xml={viewIconSvg} />
                        )}
                    </View>
                    <Text style={{ color: isExpanded ? '#979797' : '#c680b2' }}>
                        {isExpanded ? 'Hidden' : 'Hide'}
                    </Text>
                </TouchableOpacity>
                {isExpanded && (
                    <TouchableOpacity onPress={() => handleToggleSongExpand()}
                        style={styles.overlayStyle} />
                )}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.descriptionTextStyle, { marginLeft: 10 }]}>
                            Choose songs which you want to show on your profile.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        fetchTopSongs(token);
                    }}
                        style={styles.viewButtonContainer}>
                        <View style={styles.svgImageContainer}>
                            <SvgXml xml={refreshIconSvg} />
                        </View>
                        <Text style={styles.refreshTextStyle}>Refresh</Text>
                    </TouchableOpacity>
                    <View style={styles.borderStyle} />
                </View>
            </View>
            {songs ? (
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3498db"
                            style={styles.loadingIndicatorStyle} />
                    ) : songs.length ? (
                        <View style={styles.songListStyle}>
                            {songs.map((song, index) => renderSongCard(song, index))}
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTextStyle}>
                                No top artists to display
                            </Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataTextStyle}>
                        No top songs to display
                    </Text>
                </View>
            )}
            <View style={styles.bottomButtonContainer}>
                <Pressable onPress={() => handleSave()}
                    style={styles.allowButtonContainer}>
                    <Text style={styles.allowButtonTextStyle}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};
