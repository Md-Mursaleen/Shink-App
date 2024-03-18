/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View, ScrollView, SafeAreaView, StyleSheet, Text,
  Pressable, Image, TouchableOpacity, ImageBackground,
  TextInput, Modal,
} from 'react-native';
import { closeSvg, heartSvg, notificationIconSvg } from '../data/SvgImageData';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import { normalize } from '../components/theme';
import { useWebSocket } from '../contexts/WebSocketContext';
import { DataStore } from 'aws-amplify/datastore';
import { ShinkUser } from '../models';
import Swiper from 'react-native-deck-swiper';
import Category from '../components/Category';
import ModalItems from '../components/ModalItems';
import HomeLoader from '../components/HomeLoader';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import InViewPort from '@coffeebeanslabs/react-native-inviewport';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const modalizeRef = useRef(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [index, setIndex] = useState(0);
  const { ws, setWs } = useWebSocket();
  const [dataFetchError, setDataFetchError] = useState(false);
  const [matchedModalVisible, setMatchedModalVisible] = useState(false);
  const [matchedMessage, setMatchedMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [visibleElement, setVisibleElement] = useState('');
  const [dataStoreUser, setDataStoreUser] = useState();

  const onOpenModal = () => {
    modalizeRef.current?.open();
    setIsModalOpened(true);
  };

  const handleLeftSwipe = () => {
    swiperRef.current.swipeLeft();
    setIndex(index + 1);
  };

  const handleRightSwipe = () => {
    swiperRef.current.swipeRight();
    setIndex(index + 1);
  };

  function getFileId(driveLink) {
    const match = driveLink?.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  }

  const fetchData = async () => {
    try {
      setDataFetchError(false);
      setLoading(true);
      // Replace 'your-url' with the actual URL you want to fetch from
      const response = await fetch(
        'https://wphfsmzto7.execute-api.ap-south-1.amazonaws.com/default/pythonDB',
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error in fetching data: ', error);
      setLoading(false);
      setDataFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWebSocket = async (id) => {
    const newWs = new WebSocket(
      `wss://fuule4re7f.execute-api.ap-south-1.amazonaws.com/production/?id=${id}`,
    );
    newWs.onopen = () => {
      console.log('WebSocket connection is opened');
      setWs(newWs); // Set the new WebSocket instance in the context
    };
    newWs.onclose = () => {
      console.log('WebSocket connection is closed');
    };
    newWs.onerror = e => {
      console.log('WebSocket error: ', e);
    };
    newWs.onmessage = e => {
      console.log('WebSocket message is received: ', e.data);
    };
  };

  const dataStoreFunction = async () => {
    console.log('Datastore function');
    try {
      const date_time = new Date();
      const isoDateTime = date_time.toISOString();
      const _user = await DataStore.save(
        new ShinkUser({
          bio: 'test bio',
          birthDate: '2001-12-03',
          datePreference: 'Friendship',
          datePreferenceAgeMax: 30,
          datePreferenceAgeMin: 22,
          datePreferenceGender: 'Female',
          datePreferenceOrientation: 'Straight',
          dislikes: [{ category: 'Substance', subCategory: ['Cigarettes'] }],
          gender: 'Male',
          givenGreenFlags: [{ category: 'Looks', subCategory: ['Cute'] }],
          givenRedFlags: [{ category: 'Substance', subCategory: ['Cigarettes'] }],
          images: [{
            ImageId: '1',
            original: 'https://d2902n7npbzg1t.cloudfront.net/3/3_029f3128b5274280948a9aca07455bf9_thumbnail',
          }],
          interests: [{ category: 'Entertainment', subCategory: ['Watching movies'] }],
          isAgreementCompleted: true,
          isVerified: false,
          leftSwipes: ['123'],
          likes: [{ category: 'Nature', subCategory: ['Hiking'] }],
          location: { lat: 12.9716, lon: 77.5946 },
          matches: ['222'],
          name: 'Test User Datastore1',
          phoneNumber: '+919876543210',
          receivedGreenFlags: [{ category: 'Looks', subCategory: ['Cute'] }],
          receivedRedFlags: [{ category: 'Substance', subCategory: ['Cigarettes'] }],
          relationshipStatus: 'Single',
          reports: [{ category: 'Substance', subCategory: ['Cigarettes'] }],
          rightSwipes: ['222'],
          sexuality: 'Heterosexual',
          socketInfo: { socketId: '123', connectionInfo: 'online' },
          spotifyMusicInterests: { genre: 'Pop', artist: 'Adele' },
          subscriptionInfo: { plan: 'Free', expiryDate: '2022-12-31' },
          userId: '1a2b3c4d',
          //updatedAt: isoDateTime,
          //createdAt: isoDateTime,
          //_version: 1,
          //_deleted: false,
          //_lastChangedAt: isoDateTime,
        })
      );
      console.log('Type of object: ', _user);
      setDataStoreUser(_user);
      console.log('Datastore user: ', _user);
    } catch (error) {
      console.error('Error datastore: ', error);
    }
  };

  const queryDataStore = async () => {
    const toDelete = await DataStore.query(ShinkUser, '1a2b3c4d');
    console.log('Datastore user: ', toDelete);
  };

  async function syncData() {
    try {
      await DataStore.sync();
      console.log('Sync successful');
    } catch (error) {
      console.error('Sync failed', error);
    }
  }

  useEffect(() => {
    fetchData();
    // queryDataStore();
    // dataStoreFunction();
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        handleWebSocket(userId);
      } catch (e) {
        console.log(e);
      }
    };
    getUserId();
  }, []);

  const elementOnScreen = (element, isVisible) => {
    if (isVisible) {
      setVisibleElement(element);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        {/* Replace ActivityIndicator with your Loader component if you have a custom one */}
        <HomeLoader size="large" />
      </SafeAreaView>
    );
  }

  const handleOnPress = () => {
    navigation.navigate('MyFlags');
  };

  const handleUserSwipe = async (swipedUser, swipe) => {
    try {
      const response = await fetch(
        'https://hfthbu4cs6.execute-api.ap-south-1.amazonaws.com/default/handleSwipes',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: userId,
            swipedUserId: swipedUser.userData.userId,
            swipe: swipe,
          }),
        },
      );
      const data = await response.json();
      if (data.message === 'match') {
        setMatchedModalVisible(true);
        const myMatches = await AsyncStorage.getItem('myMatches');
        const newMatch = {
          userId: swipedUser.userData.userId,
          name: swipedUser.userData.name,
          image: swipedUser.userData.images[0].faceCropped,
        };
        if (myMatches === null) {
          await AsyncStorage.setItem('myMatches', JSON.stringify([newMatch]));
        } else {
          const existingMatches = JSON.parse(myMatches);
          const matchExists = existingMatches.some(
            match => match.userId === newMatch.userId,
          );
          if (!matchExists) {
            const newMatches = [...existingMatches, newMatch];
            await AsyncStorage.setItem('myMatches', JSON.stringify(newMatches));
          }
        }
      }
    } catch (error) {
      console.error('Error in fetching data: ', error);
    }
  };

  const aggregateUserCategories = interests => {
    let allInterests = [];
    interests?.forEach(interest => {
      allInterests = allInterests.concat(interest.subCategory);
    });
    return allInterests;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Feather name="menu"
          size={24}
          color={'#979797'}
          onPress={() => console.log('Pressed')} />
        {/* <Pressable onPress={() => handleOnPress()}
          style={styles.headerSubContainer}>
          <Text style={styles.flagTextStyle}>My Flags</Text>
          <Image source={require('../assets/images/green-flag.png')}
            style={styles.flagImageStyle} />
          <Image source={require('../assets/images/red-flag.png')}
            style={styles.flagImageStyle} />
        </Pressable> */}
        <SvgXml xml={notificationIconSvg} />
      </View>
      <Swiper ref={swiperRef}
        cards={users}
        containerStyle={styles.swiperContainerStyle}
        marginTop={normalize(35)}
        renderCard={user => {
          return (
            <ScrollView>
              <TouchableOpacity activeOpacity={1}
                delay={1000}
                style={{ borderRadius: 1 }}>
                <View style={styles.swiperCardContentContainer}>
                  <InViewPort onChange={isVisible => {
                    elementOnScreen('Current Profile Photo', isVisible);
                  }}>
                    <ImageBackground source={{
                      uri: `https://drive.google.com/uc?export=view&id=${getFileId(
                        user?.userData.images[0].original,
                      )}`,
                    }}
                      style={styles.imageBackgroundStyle}>
                      <LinearGradient start={{ x: 0.5, y: 0.0 }}
                        end={{ x: 0.5, y: 3 }}
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                        style={styles.linearGradientStyle}>
                        <Text style={styles.cardUserNameTextStyle}>
                          {user?.userData.name + ' '}
                        </Text>
                        <Text style={styles.userAgeTextStyle}>
                          {user?.userData.age + ' '}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </InViewPort>
                  <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
                      <InViewPort delay={1000}
                        onChange={isVisible => {
                          elementOnScreen('Interests', isVisible);
                        }}>
                        <Category heading={'Interests'}
                          categories={aggregateUserCategories(
                            user?.userData.interests,
                          )} />
                      </InViewPort>
                      <InViewPort delay={1000}
                        onChange={isVisible => {
                          elementOnScreen('Likes', isVisible);
                        }}>
                        <Category heading={'Likes'}
                          categories={aggregateUserCategories(
                            user?.userData.likePreferences,
                          )} />
                      </InViewPort>
                      <InViewPort delay={1000}
                        onChange={isVisible => {
                          elementOnScreen('Dislikes', isVisible);
                        }}>
                        <Category heading={'Dikes'}
                          categories={aggregateUserCategories(
                            user?.userData.dislikePreferences,
                          )} />
                      </InViewPort>
                    </View>
                  </View>
                  <InViewPort delay={1000}
                    onChange={isVisible => {
                      elementOnScreen('Profile Picture', isVisible);
                    }}>
                    <Image source={{
                      uri: `https://drive.google.com/uc?export=view&id=${getFileId(
                        user?.userData.images[0].original,
                      )}`,
                    }}
                      style={[styles.imageBackgroundStyle,
                      { marginVertical: normalize(10) }]} />
                  </InViewPort>
                  <InViewPort delay={1000}
                    onChange={isVisible => {
                      elementOnScreen('Profile Picture', isVisible);
                    }}>
                    <Image source={{
                      uri: `https://drive.google.com/uc?export=view&id=${getFileId(
                        user?.userData.images[0].original,
                      )}`,
                    }}
                      style={[styles.imageBackgroundStyle,
                      { marginVertical: normalize(10) }]} />
                  </InViewPort>
                  <InViewPort delay={1000}
                    onChange={isVisible => {
                      elementOnScreen('Profile Picture', isVisible);
                    }}>
                    <Image source={{
                      uri: `https://drive.google.com/uc?export=view&id=${getFileId(
                        user?.userData.images[0].original,
                      )}`,
                    }}
                      style={[styles.imageBackgroundStyle,
                      { marginVertical: normalize(10), marginBottom: normalize(100) }]} />
                  </InViewPort>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
        cardStyle={styles.cardStyle}
        backgroundColor="transparent"
        onSwipedLeft={cardIndex => {
          handleUserSwipe(users[cardIndex], 'leftSwipe');
          setIndex(cardIndex + 1);
        }}
        onSwipedRight={cardIndex => {
          handleUserSwipe(users[cardIndex], 'rightSwipe');
          setIndex(cardIndex + 1);
        }}
        onSwipedAll={() => {
          console.log('All cards have been swiped');
        }}
        cardIndex={index}
        verticalSwipe={false}
        stackSize={3}
        stackScale={5}
        stackSeparation={14} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleLeftSwipe()}
          style={styles.buttonImageStyle}>
          <SvgXml xml={closeSvg} />
        </TouchableOpacity>
        <View style={styles.lineStyle} />
        <Pressable onPress={() => onOpenModal()}
          style={styles.flagsContainer}>
          <View style={[styles.flagContainer, { borderColor: '#34a853' }]}>
            <Text style={[styles.totalFlagTextStyle, { color: '#34a853' }]}>
              {users[index]?.userData?.green}
            </Text>
            <Image source={require('../assets/images/green-flag.png')}
              style={styles.flagImageStyle} />
          </View>
          <View style={[styles.flagContainer, { borderColor: '#eb4335' }]}>
            <Text style={[styles.totalFlagTextStyle, { color: '#eb4335' }]}>
              {users[index]?.userData?.red}
            </Text>
            <Image source={require('../assets/images/red-flag.png')}
              style={styles.flagImageStyle} />
          </View>
        </Pressable>
        <TouchableOpacity onPress={() => handleRightSwipe()}
          style={styles.buttonImageStyle}>
          <SvgXml xml={heartSvg} width="70%" height="70%" />
        </TouchableOpacity>
      </View>
      <Modalize ref={modalizeRef}
        snapPoint={425}
        onClose={() => setIsModalOpened(false)}
        onBackButtonPressed={() => setIsModalOpened(false)}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Image source={require('../assets/images/profile-icon.png')}
              style={styles.iconStyle} />
            <Text style={styles.userNameTextStyle}>
              {users[index]?.userData?.name}
            </Text>
            <View style={styles.modalFlagButtonContainer}>
              <View style={[
                styles.flagButtonContainer,
                { backgroundColor: '#34a853' },
              ]}>
                <Text style={styles.textStyle}>
                  {users[index]?.userData?.green}
                </Text>
                <Image source={require('../assets/images/white-flag.png')}
                  style={styles.whiteFlagImageStyle} />
              </View>
              <View style={[
                styles.flagButtonContainer,
                { backgroundColor: '#eb4335' },
              ]}>
                <Text style={styles.textStyle}>
                  {users[index]?.userData?.red}
                </Text>
                <Image source={require('../assets/images/white-flag.png')}
                  style={styles.whiteFlagImageStyle}
                />
              </View>
            </View>
            <ModalItems />
          </View>
        </ScrollView>
      </Modalize>
      <Modal animationType="fade"
        visible={matchedModalVisible}>
        <View style={styles.matchedModalContainer}>
          <View style={styles.matchedModalImageContainer}>
            <Image source={require('../assets/images/matched-user1.png')}
              style={[styles.matchedModalImageStyle, { zIndex: 2 }]} />
            <Image source={require('../assets/images/matched-user2.png')}
              style={[styles.matchedModalImageStyle, { left: normalize(-15) }]} />
          </View>
          <Text style={styles.matchedModalTextStyle}>You Matched</Text>
          <TextInput multiline
            placeholder="Send a message"
            placeholderTextColor={'#282c3f'}
            numberOfLines={100}
            value={matchedMessage}
            onChangeText={text => setMatchedMessage(text)}
            style={styles.matchedModalTextInputStyle} />
          <TouchableOpacity style={[styles.matchedModalButtonContainer,
          { marginTop: normalize(13) }]}>
            <Text style={[styles.matchedModalButtonTextStyle, {
              color: '#ffffff',
            }]}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMatchedModalVisible(!matchedModalVisible)}
            style={[styles.matchedModalButtonContainer,
            { marginTop: normalize(83) }]}>
            <Text style={[styles.matchedModalButtonTextStyle, {
              alignSelf: 'flex-end',
              color: '#979797',
            }]}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <View style={styles.container}>
        <ScrollView>
          {users.length !== 0 && (
            <>
              <Modalize
                ref={modalizeRef}
                snapPoint={425}
                onClose={() => setIsModalOpened(false)}
                onBackButtonPressed={() => setIsModalOpened(false)}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}>
                <ScrollView style={styles.modalContainer}>
                  <View style={styles.modalSubContainer}>
                    <Image
                      source={require('../assets/images/profile-icon.png')}
                      style={styles.iconStyle}
                    />
                    <Text style={styles.userNameTextStyle}>
                      {users[index]?.userData?.name}
                    </Text>
                    <View style={styles.modalFlagButtonContainer}>
                      <View
                        style={[
                          styles.flagButtonContainer,
                          { backgroundColor: '#34a853' },
                        ]}>
                        <Text style={styles.textStyle}>
                          {users[index]?.userData?.green}
                        </Text>
                        <Image
                          source={require('../assets/images/white-flag.png')}
                          style={styles.whiteFlagImageStyle}
                        />
                      </View>
                      <View
                        style={[
                          styles.flagButtonContainer,
                          { backgroundColor: '#eb4335' },
                        ]}>
                        <Text style={styles.textStyle}>
                          {users[index]?.userData?.red}
                        </Text>
                        <Image
                          source={require('../assets/images/white-flag.png')}
                          style={styles.whiteFlagImageStyle}
                        />
                      </View>
                    </View>
                    <ModalItems />
                  </View>
                </ScrollView>
              </Modalize>
              <View style={styles.headerContainer}>
                <Feather
                  name="menu"
                  size={24}
                  color={'#979797'}
                  onPress={() => console.log('Pressed')}
                />
                <Pressable
                  onPress={() => handleOnPress()}
                  style={styles.headerSubContainer}>
                  <Text style={styles.flagTextStyle}>My Flags</Text>
                  <Image
                    source={require('../assets/images/green-flag.png')}
                    style={styles.flagImageStyle}
                  />
                  <Image
                    source={require('../assets/images/red-flag.png')}
                    style={styles.flagImageStyle}
                  />
                </Pressable>
              </View>
              <View style={styles.contentContainer}>
                <Swiper
                  ref={swiperRef}
                  cards={users}
                  renderCard={user => {
                    return (
                      <>
                        <View style={styles.swiperCardContainer}>
                          <Image source={{ uri: `https://drive.google.com/uc?export=view&id=${getFileId(user.userData.img1)}` }}
                            style={styles.imageStyle} />
                        </View>
                        <View style={styles.swiperContentContainer}>
                          <Text style={styles.userTextStyle}>
                            {user?.userData?.name + ' '}
                          </Text>
                          <Text style={styles.userTextStyle}>
                            {user?.userData?.age + ' '}
                          </Text>
                          <SvgXml
                            xml={checkmarkSvg}
                            width="24"
                            height="24"
                            style={styles.checkMarkImageStyle}
                          />
                        </View>
                      </>
                    );
                  }}
                  onSwipedLeft={cardIndex => {
                    setIndex(cardIndex + 1);
                  }}
                  onSwipedRight={cardIndex => {
                    setIndex(cardIndex + 1);
                  }}
                  onSwipedAll={() => {
                    console.log('All cards have been swiped.');
                  }}
                  cardIndex={index}
                  backgroundColor={'transparent'}
                  stackSize={2}
                  verticalSwipe={false}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleLeftSwipe()}
                    style={styles.buttonImageStyle}>
                    <SvgXml xml={closeSvg} />
                  </TouchableOpacity>
                  <View style={styles.lineStyle} />
                  <Pressable
                    onPress={() => onOpenModal()}
                    style={styles.flagsContainer}>
                    <View
                      style={[styles.flagContainer, { borderColor: '#34a853' }]}>
                      <Text
                        style={[styles.totalFlagTextStyle, { color: '#34a853' }]}>
                        {users[index]?.userData?.green}
                      </Text>
                      <Image
                        source={require('../assets/images/green-flag.png')}
                        style={styles.flagImageStyle}
                      />
                    </View>
                    <View
                      style={[styles.flagContainer, { borderColor: '#eb4335' }]}>
                      <Text
                        style={[styles.totalFlagTextStyle, { color: '#eb4335' }]}>
                        {users[index]?.userData?.red}
                      </Text>
                      <Image
                        source={require('../assets/images/red-flag.png')}
                        style={styles.flagImageStyle}
                      />
                    </View>
                  </Pressable>
                  <TouchableOpacity
                    onPress={() => handleRightSwipe()}
                    style={styles.buttonImageStyle}>
                    <SvgXml xml={heartSvg} width="70%" height="70%" />
                  </TouchableOpacity>
                </View>
              </View>
              {isModalOpened === false && (
                <View style={styles.bottomContainer}>
                  <View style={{ flex: 1 }}>
                    <Category heading={'My Matching Interests'}
                      categories={users[index].matchingInterests} />
                    <Category heading={'My Info'}
                      categories={[users[index].userData.status, users[index].userData.location,
                      users[index].userData.for]} />
                    <Category heading={'My Interests'}
                      categories={[users[index].userData.inter1, users[index].userData.inter2,
                      users[index].userData.inter3, users[index].userData.inter4,
                      users[index].userData.inter5, users[index].userData.inter6,
                      users[index].userData.inter7, users[index].userData.inter8,
                      users[index].userData.inter9]} />
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View> */}
    </SafeAreaView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '90%',
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  swiperContentContainer: {
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '-15%',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  name: {
    marginTop: '143%', // Spacing from the top of the card
    fontSize: 24, // Example size, adjust as needed
    fontWeight: 'bold', // Makes the name stand out
    color: '#000000', // Dark text color for readability
    textAlign: 'center', // Center-align text
  },
  bio: {
    paddingHorizontal: normalize(12), // Padding on the sides
    marginBottom: normalize(10), // Spacing between the name and bio
    fontSize: 16, // Smaller text size for the bio
    color: '#666666', // Lighter text color for the bio
    textAlign: 'center', // Center-align text
  },
  swiperCardContainer: {
    marginTop: '-14%',
    height: '82%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  buttonContainer: {
    padding: normalize(20),
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  buttonImageStyle: {
    width: normalize(42),
    height: normalize(42),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: '#000000', // Shadow is black
    shadowOffset: {
      width: 0,
      height: 2, // Shadow is applied to the bottom
    },
    shadowOpacity: 0.1, // Lower opacity for a greyish tone
    shadowRadius: 4, // The blur radius of the shadow
    elevation: 3, // Elevation for Android
  },
  buttonFlagImageStyle: {
    width: normalize(42),
    height: normalize(42),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000', // Shadow is black
    shadowOffset: {
      width: 0,
      height: 2, // Shadow is applied to the bottom
    },
    shadowOpacity: 0.1, // Lower opacity for a greyish tone
    shadowRadius: 4, // The blur radius of the shadow
    elevation: 2, // Elevation for Android
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(53, 78, 102, 0.1)',
  },
  modalSubContainer: {
    marginTop: 'auto',
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  iconStyle: {
    marginTop: normalize(30),
    alignSelf: 'center',
  },
  userNameTextStyle: {
    marginTop: normalize(25),
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 21,
  },
  cardUserNameTextStyle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
  userAgeTextStyle: {
    marginTop:normalize(3),
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    color: '#ffffff',
  },
  modalFlagButtonContainer: {
    marginTop: normalize(18),
    marginBottom: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagButtonContainer: {
    marginHorizontal: normalize(6),
    width: normalize(84),
    height: normalize(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textStyle: {
    marginRight: 3,
    color: '#ffffff',
  },
  bottomContainer: {
    paddingVertical: normalize(20),
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userTextStyle: {
    fontSize: 31,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 42,
  },
  headerContainer: {
    padding: normalize(13.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  headerSubContainer: {
    width: normalize(120),
    height: normalize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  flagImageStyle: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
  },
  flagTextStyle: {
    marginRight: normalize(5),
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'AvenirNext-Regular',
    color: '#9d4edd',
    lineHeight: 21,
  },
  checkMarkImageStyle: {
    marginLeft: '1%',
    marginBottom: '2%',
    alignSelf: 'flex-end',
  },
  whiteFlagImageStyle: {
    width: normalize(16),
    height: normalize(16),
    resizeMode: 'contain',
  },
  flagsContainer: {
    paddingHorizontal: normalize(13),
    paddingVertical: normalize(13),
    marginRight: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 8,
  },
  flagContainer: {
    paddingHorizontal: normalize(12),
    marginHorizontal: normalize(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.6,
    borderRadius: 30,
  },
  totalFlagTextStyle: {
    marginRight: normalize(5),
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'AvenirNext-Bold',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.4,
  },
  imageBackgroundStyle: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: normalize(495),
    backgroundColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
    borderRadius: 10,
  },
  linearGradientStyle: {
    position: 'absolute',
    bottom: normalize(0),
    paddingHorizontal: normalize(20),
    width: '100%',
    height: normalize(70),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  swiperContainerStyle: {
    flex: 1,
    overflow: 'hidden',
  },
  swiperCardContentContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(252, 252, 252)',
    overflow: 'hidden',
  },
  cardStyle: {
    marginTop: normalize(-20),
    height: normalize(600),
    borderRadius: 10,
    overflow: 'hidden',
  },
  matchedModalContainer: {
    padding: normalize(20),
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#381545',
  },
  matchedModalImageContainer: {
    width: normalize(125),
    height: normalize(72),
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  matchedModalImageStyle: {
    width: normalize(72),
    height: normalize(72),
  },
  matchedModalTextStyle: {
    marginTop: normalize(16),
    fontSize: normalize(24),
    alignSelf: 'center',
    color: '#ffffff',
  },
  matchedModalTextInputStyle: {
    padding: normalize(10),
    marginTop: normalize(26),
    width: '100%',
    height: normalize(100),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cfd3d6',
    borderRadius: normalize(8),
    fontSize: normalize(13),
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular',
    color: '#000000',
    lineHeight: normalize(16),
  },
  matchedModalButtonContainer: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    backgroundColor: '#7b337e',
    alignSelf: 'flex-end',
    borderRadius: normalize(4),
  },
  matchedModalButtonTextStyle: {
    fontSize: 12,
    fontWeight: '400',
  },
});
