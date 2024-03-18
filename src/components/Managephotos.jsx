/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImgixClient from '@imgix/js-core';
import Icon from 'react-native-vector-icons/FontAwesome';

const Managephotos = ({ onDragRelease, userid }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const imgix = new ImgixClient({ domain: 'shink-874395619.imgix.net' });

  useEffect(() => {
    console.log('Data on mount:', data);
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openContextMenu = (item) => {
    setSelectedImage(item);
    showDeleteConfirmation();
  };

  const showDeleteConfirmation = () => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: deleteImage },
      ],
      { cancelable: false },
    );
  };

  const deleteImage = () => {
    console.log(selectedImage)
    const newData = data.map((img) => (img.key === selectedImage.key ? { ...img, thumbnailUrl: null } : img));
    setData(newData);
  };

  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selected = {
          key: `image_${new Date().getTime()}`,
          name: response.fileName,
          thumbnailUrl: response.uri,
          date: new Date().toLocaleString(),
          views: Math.floor(Math.random() * 100),
          time: Math.floor(Math.random() * 60),
        };

        setData([...data, selected]);
        setModalVisible(false);
      }
    });
  };

  const generateThumbnailUrl = (imageName) => {
    const imgixParams = {
      fit: 'crop',
      crop: 'faces',
      w: 100,
      h: 100,
    };
    return imgix.buildURL(
      `public/images/74386824-a844-4a60-ac7d-6f2298a9086b/${imageName}`,
      imgixParams,
    );
  };

  const imageNames = [
    'app1.jpg',
    'app2.jpg',
    'app3.jpg',
    'app4.jpg',
    'app5.jpg',
    'app6.jpg',
    'app7.jpg',
  ];

  const publicLimit = 6;
  const privateLimit = 4;
  const totalPlaceholders = publicLimit + privateLimit;

  const initialData = Array.from({ length: totalPlaceholders }).map((_, index) => {
    const isPublic = index < publicLimit;
    const isPrivate = index >= publicLimit && index < totalPlaceholders;
    const imageName = isPublic || isPrivate ? imageNames[index % imageNames.length] : null;
    return {
      key: `image_${index}_${isPublic ? 'public' : 'private'}`,
      name: imageName,
      thumbnailUrl: isPublic || isPrivate ? generateThumbnailUrl(imageName) : null,
      date: isPublic || isPrivate ? new Date().toLocaleString() : null,
      views: isPublic || isPrivate ? Math.floor(Math.random() * 100) : null,
      time: isPublic || isPrivate ? Math.floor(Math.random() * 60) : null,
    };
  });

  const [data, setData] = useState(initialData);
  console.log(data)

  const renderImageCard = (item, index, isPublic) => (
    <TouchableOpacity
      key={index}
      onPress={() => console.log(`Clicked ${item.key}`)}
      onLongPress={() => openContextMenu(item)}
      style={styles.ImgcardContainer}>
      <View style={styles.thumbnailContainer}>
        {item.thumbnailUrl ? (
          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        ) : (
          <Text style={styles.placeholderText} onPress={toggleModal}>+</Text>
        )}
      </View>
      {item.thumbnailUrl && (
        <View style={styles.detailsContainer}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Date: {item.date}
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Views: {item.views}
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            Time: {item.time} mins
          </Text>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => openContextMenu(item)}>
            <Icon name="trash" size={23} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const getRemainingPhotos = isPublic => {
    const currentPhotos = data.filter(
      item =>
        item.thumbnailUrl && item.key.includes(isPublic ? 'public' : 'private'),
    );
    const currentCount = currentPhotos.length;
    console.log(currentCount)
    return isPublic
      ? Math.max(0, publicLimit - currentCount)
      : Math.max(0, privateLimit - currentCount);
  };

  const isSectionEmpty = isPublic => {
    const sectionData = data.slice(
      isPublic ? 0 : publicLimit,
      isPublic ? publicLimit : totalPlaceholders,
    );
    return !sectionData.some((item) => item.thumbnailUrl);
  };

  console.log("answer ye aa rha", getRemainingPhotos(true));

  const handleImageOption = (option) => {
    switch (option) {
      case 'gallery':
        console.log("open gallery");
        break;
      case 'camera':
        console.log("open camera");
        break;
      case 'facebook':
        console.log("open facebook");
        break;
      case 'instagram':
        console.log("open instagram");
        break;
      default:
        break;
    }
    toggleModal();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Manage Your Photos</Text>
      <View style={styles.publicContainer}>
        <Text style={styles.profileStat}>Your profile has reached the top 10%</Text>
        <Text style={styles.publicHeading}>Public Section</Text>
        <Text style={styles.subtitle}>These 6 photos are public</Text>
        <ScrollView>
          <View style={styles.cardContainer}>
            <ScrollView>
              {data.slice(0, publicLimit).map((item, index) => renderImageCard(item, index, true))}
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.addMoreButton,
            {
              backgroundColor: getRemainingPhotos(true) > 0 ? '#F0E4EA' : '#FFFF',
            },
          ]}
          disabled={getRemainingPhotos(true) === 0}
          onPress={toggleModal}
        >
          <Text style={styles.addMoreButtonText}>Add More Photos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.privateContainer}>
        <Text style={styles.privateHeading}>Private Section</Text>
        <Text style={styles.subtitle}>You could add 4 photos</Text>
        <ScrollView>
          <View style={styles.cardContainer}>
            <ScrollView>
              {data.slice(publicLimit, totalPlaceholders).map((item, index) =>
                renderImageCard(item, index, false)
              )}
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.addMoreButton,
            {
              backgroundColor: getRemainingPhotos(false) > 0 ? '#F0E4EA' : 'white',
            },
          ]}
          disabled={getRemainingPhotos(false) === 0}
          onPress={toggleModal}
        >
          <Text style={styles.addMoreButtonText}>
            {privateLimit -
              data
                .slice(publicLimit, totalPlaceholders)
                .filter((item) => item.thumbnailUrl).length}{' '} More Photos left
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={toggleModal}
              underlayColor="#CCCCCC"
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
            <Text style={styles.modalHeading}>Select an Image</Text>
            <TouchableOpacity style={styles.imageOption} onPress={() => handleImageOption('gallery')}>
              <Icon name="image" size={40} color="#333" />
              <Text style={styles.optionText}>Upload from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageOption} onPress={() => handleImageOption('camera')}>
              <Icon name="camera" size={40} color="#333" />
              <Text style={styles.optionText}>Click a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageOption} onPress={() => handleImageOption('facebook')}>
              <Icon name="facebook" size={40} color="#3b5998" />
              <Text style={styles.optionText}>Add from Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageOption} onPress={() => handleImageOption('instagram')}>
              <Icon name="instagram" size={40} color="#e4405f" />
              <Text style={styles.optionText}>Add from Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  publicContainer: {
    backgroundColor: '#F0E4FA',
    borderRadius: 10,
    padding: 13,
    marginBottom: 20,
  },
  privateContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  publicHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  privateHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridItem: {
    width: 120,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    width: '80%',
    height: '70%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    backgroundColor: '#CBDCCB',
    margin: 5,
    borderRadius: 10,
  },
  imageInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  ImgcardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 4, // Adjust as needed
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    width: '25%', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    aspectRatio: 1,
  },
  thumbnail: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  profileStat: {
    color: '#fff',
    display: 'flex',
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 10,
    borderRadius: 5,
    backgroundColor: '#5E2F85',
  },
  addMoreButton: {
    backgroundColor: '#fff',
    borderColor: '#5E2F85',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 0,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '95%', // Adjust as needed
  },

  addMoreButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addMoreButtonContainer: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center', // Align to the center of the screen
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default Managephotos;
