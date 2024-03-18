/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import { closeSvg, heartSvg, mySvgString, checkmarkSvg } from '../data/SvgImageData';
import Swiper from 'react-native-deck-swiper';
import Category from './Category';
import ModalItems from './ModalItems';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';

const HomeComponent = ({ users, navigation }) => {
  const swiperRef = useRef(null);
  const modalizeRef = useRef(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [index, setIndex] = useState(0);

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
    const match = driveLink.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  }

  return (
    <>
      <Modalize ref={modalizeRef}
        snapPoint={425}
        onClose={() => setIsModalOpened(false)}
        onBackButtonPressed={() => setIsModalOpened(false)}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <FontAwesome5 name="user-circle" size={34} color={'#959595'}
              style={styles.iconStyle} />
            <Text style={styles.userNameTextStyle}>Sana</Text>
            <View style={styles.modalFlagButtonContainer}>
              <View style={[styles.flagButtonContainer,
              { backgroundColor: '#34a853' }]}>
                <Text style={styles.textStyle}>80</Text>
                <Foundation name="flag" size={16} color={'#ffffff'} />
              </View>
              <View style={[styles.flagButtonContainer,
              { backgroundColor: '#eb4335' }]}>
                <Text style={styles.textStyle}>80</Text>
                <Foundation name="flag" size={16} color={'#ffffff'} />
              </View>
            </View>
            <ModalItems />
          </View>
        </ScrollView>
      </Modalize>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Feather name="menu" size={24} color={'#979797'} />
          <Pressable style={styles.headerSubContainer}
            onPress={() => navigation.navigate('MyFlags')}>
            <Text style={styles.flagTextStyle}>My Flags</Text>
            <Image source={require('../assets/images/green-flag.png')}
              style={styles.flagImageStyle} />
            <Image source={require('../assets/images/red-flag.png')}
              style={styles.flagImageStyle} />
          </Pressable>
        </View>
        <Swiper ref={swiperRef} cards={users} renderCard={(user) => {
          return (
            <>
              <View style={styles.swiperCardContainer}>
                <Image source={{ uri: `https://drive.google.com/uc?export=view&id=${getFileId(user.userData.img1)}` }}
                  style={styles.imageStyle} />
              </View>
              <View style={styles.swiperContentContainer}>
                <Text style={styles.userTextStyle}>
                  {user.userData.name + " "}
                </Text>
                <Text style={styles.userTextStyle}>
                  {user.userData.age + " "}
                </Text>
                <SvgXml xml={checkmarkSvg} width="24" height="24"
                  style={styles.checkMarkImageStyle} />
              </View>
            </>
          );
        }}
          onSwipedLeft={(cardIndex) => {
            setIndex(cardIndex + 1);
          }}
          onSwipedRight={(cardIndex) => {
            setIndex(cardIndex + 1);
          }}
          onSwipedAll={() => {
            console.log('All cards have been swiped.');
          }}
          cardIndex={index}
          backgroundColor={'transparent'}
          stackSize={2}
          verticalSwipe={false} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleLeftSwipe()}
            style={styles.buttonImageStyle}>
            <SvgXml xml={closeSvg} width="50%" height="50%" />
          </TouchableOpacity>
          <SvgXml xml={mySvgString} width="178" height="60" onPress={() => onOpenModal()}
            style={styles.buttonFlagImageStyle} />
          <TouchableOpacity onPress={() => handleRightSwipe()}
            style={styles.buttonImageStyle}>
            <SvgXml xml={heartSvg} width="70%" height="70%" />
          </TouchableOpacity>
        </View>
      </View>
      {isModalOpened === false && (
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }} >
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  swiperContentContainer: {
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "-15%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  name: {
    marginTop: '143%', // Spacing from the top of the card
    fontSize: 24, // Example size, adjust as needed
    fontWeight: 'bold', // Makes the name stand out
    color: '#000000', // Dark text color for readability
    textAlign: 'center', // Center-align text
  },
  bio: {
    paddingHorizontal: 12, // Padding on the sides
    marginBottom: 10, // Spacing between the name and bio
    fontSize: 16, // Smaller text size for the bio
    color: '#666666', // Lighter text color for the bio
    textAlign: 'center', // Center-align text
  },
  swiperCardContainer: {
    marginTop: '2%',
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
    padding: 20,
    marginTop: '140%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonImageStyle: {
    width: 42,
    height: 42,
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
    width: 42,
    height: 42,
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
    marginTop: 40,
    alignSelf: 'center',
  },
  userNameTextStyle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  modalFlagButtonContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagButtonContainer: {
    marginHorizontal: 5,
    width: 82,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  textStyle: {
    marginRight: 9,
    color: '#ffffff',
  },
  bottomContainer: {
    padding: 20,
    marginTop: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userTextStyle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#ffffff",
    lineHeight: 42,
  },
  headerContainer: {
    padding: 13.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  headerSubContainer: {
    width: 120,
    height: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  flagImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  flagTextStyle: {
    marginRight: 5,
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
});

export default HomeComponent;
