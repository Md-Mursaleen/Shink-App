/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    Text, View, Alert, Image,
    StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Pressable,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { hideIconSvg, refreshIconSvg, viewSvg } from '../data/SvgImageData';
import { normalize } from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';

const MusicPreferenceScreen = ({ navigation }) => {
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
    const [userMusicPreferences, setUserMusicPreferences] = useState({});

    class Music {
        constructor(topArtists, topSongs, genres) {
            this.Artists = topArtists;
            this.Tracks = topSongs;
            this.Genres = genres;
        }
    }

    useEffect(() => {
        setIsConnected(true);

        // Fetch top artists
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('spotifyAccessToken');
                if (storedToken) {
                    setToken(storedToken);
                    // Fetch data when token is set
                    fetchTopArtists(storedToken);
                    fetchTopSongs(storedToken);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to retrieve access token.');
                navigation.navigate('Spotify');
            }
        };
        fetchToken();
        if (isConnected) {
            fetchTopArtists();
        }
    }, [isConnected]);

    useEffect(() => {
        // Create userMusicPreferences object when topArtists and genres are updated
        const myuserMusicPreferences = new Music(topArtists, topSongs, genres);
        setUserMusicPreferences(myuserMusicPreferences);
        console.log(userMusicPreferences);
    }, [topArtists, topSongs, genres]);

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
            setTopArtists(data.items);
            setLoading(false);
            const allGenres = topArtists.flatMap(artist => artist.genres);
            const genreCounts = allGenres.reduce((counts, genre) => {
                counts[genre] = (counts[genre] || 0) + 1;
                return counts;
            }, {});
            const sortedGenres = Object.entries(genreCounts)
                .map(([genre, count]) => ({ genre, count }))
                .sort((a, b) => b.count - a.count);
            setGenres(sortedGenres);
        } catch (error) {
            console.error('Error while fetching top artists: ', error);
            setLoading(false);
        }
    };
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
            setTopSongs(data.items);
        } catch (error) {
            console.error('Error while fetching top songs: ', error);
        }
    };

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
                <Text style={styles.artistNameTextStyle} numberOfLines={1.5}
                    ellipsizeMode="tail">
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => handleToggleExpand()}
                    style={[styles.viewButtonContainer, isExpanded && {
                        backgroundColor: '#cfd3d6',
                    }]}>
                    <View style={styles.svgImageContainer}>
                        {isExpanded ? (
                            <SvgXml xml={hideIconSvg} />
                        ) : (
                            <SvgXml xml={viewSvg} />
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
                <Text style={styles.songNameTextStyle} numberOfLines={1.5}
                    ellipsizeMode="tail">
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
                            <SvgXml xml={viewSvg} />
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
        <View style={styles.container}>
            <ProgressBar progress={0.4} />
            <View style={styles.headerContainer}>
                <Text style={styles.descriptionTextStyle}>
                    Your favorite artists
                </Text>
                <Pressable onPress={() => {
                    fetchTopArtists(token);
                    fetchTopSongs(token);
                }}
                    style={[styles.viewButtonContainer,
                    {
                        paddingHorizontal: normalize(15),
                        marginRight: normalize(10),
                        marginTop: normalize(-5),
                        width: '24%',
                        height: normalize(33),
                        borderRadius: 30,
                    }]}>
                    <View style={[styles.svgImageContainer,
                    { marginRight: 0 }]}>
                        <SvgXml xml={refreshIconSvg} />
                    </View>
                    <Text style={{ marginRight: 10, color: '#c680b2' }}>Refresh</Text>
                </Pressable>
            </View>
            {topArtists ? (
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3498db"
                            style={styles.loadingIndicatorStyle} />
                    ) : topArtists.length ? (
                        <View style={styles.artistListStyle}>
                            {topArtists.map((artist, index) => renderArtistCard(artist, index))}
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTextStyle}>
                                😓 Oops! No top artists to display
                            </Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataTextStyle}>
                        😓 Oops! No top artists to display
                    </Text>
                </View>
            )}
            <Text style={styles.descriptionTextStyle}>
                Your favorite Music
            </Text>
            {topSongs ? (
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3498db"
                            style={styles.loadingIndicatorStyle} />
                    ) : topSongs.length ? (
                        <View style={styles.songListStyle}>
                            {topSongs.map((song, index) => renderSongCard(song, index))}
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTextStyle}>
                                😓 Oops! No top songs to display
                            </Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataTextStyle}>
                        😓 Oops! No top songs to display
                    </Text>
                </View>
            )}
            <View style={styles.bottomButtonContainer}>
                <Pressable onPress={() => {
                    AsyncStorage.setItem('music', JSON.stringify(userMusicPreferences));
                    navigation.navigate('Agreement');
                }}
                    style={styles.allowButtonContainer}>
                    <Text style={styles.allowButtonTextStyle}>Next</Text>
                </Pressable>
            </View>
        </View>
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
        width: 54,
        height: 54,
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
    viewButtonContainer: {
        padding: normalize(2),
        marginTop: normalize(8),
        width: '75%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e4fa',
        borderRadius: 12,
        gap: 4,
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
    svgImageContainer: {
        padding: normalize(10),
        marginRight: normalize(25),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
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

export default MusicPreferenceScreen;
