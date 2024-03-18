/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet, View, Text, Image, TouchableOpacity, Modal,
    ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import { useImageContext, ImageContextProvider } from '../contexts/ImageContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { normalize } from '../components/theme';
import { removeSvg, defaultUserImage } from '../data/SvgImageData';
import RNFS from 'react-native-fs';
import isEqual from 'lodash/isEqual';
import 'react-native-get-random-values';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DraggableFlatList from 'react-native-draggable-flatlist';

const MyPicsScreen = () => {
    const navigation = useNavigation();
    const defaultProfileImage = '../assets/images/user.png';
    const [data, setData] = useState([
        { key: 'item-0', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
        { key: 'item-1', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
        { key: 'item-2', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
        { key: 'item-3', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
        { key: 'item-4', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
        { key: 'item-5', imageUri: null, date: 'N/A', time: '', cdnUrl: null },
    ]);
    const [profilePic, setProfilePic] = useState(require(defaultProfileImage));
    const [previewImage, setPreviewImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const userIdRef = useRef(null);
    const [chosenImage, setChosenImage] = useState(null);
    const [blurredImage, setBlurredImage] = useState(null);
    const [coverPhotoImage, setCoverPhotoImage] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [additionalImagesArray, setAdditionalImagesArray] = useState([]);
    const [additionalImages, setAdditionalImages] = useState({
        blurredImage: null,
        coverPhotoImage: null,
        thumbnailImage: null,
    });
    const initialState = {
        chosenImage: null,
        additionalImages: {
            blurredImage: null,
            coverPhotoImage: null,
            thumbnailImage: null,
        },
    };
    const { profilePicUri, setProfilePicUri } = useImageContext();
    const [itemOrder, setItemOrder] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const [cardPublicUris, setCardPublicUris] = useState({});
    // const [data, setData] = useState(
    //     Array.from({ length: 6 }, (_, index) => ({
    //         id: `item-${index}`,
    //         publicImageUri: null,
    //         date: 'N/A',
    //     }))
    // );
    const [imageOrder, setImageOrder] = useState(
        Array.from({ length: 6 }, (_, index) => `item-${index}`));
    const [newOrder, setNewOrder] = useState([]);
    const [dateArray, setDateArray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [previewImageUri, setPreviewImageUri] = useState('');
    // State variable to manage the dynamic text
    const [randomText, setRandomText] = useState('');
    const dynamicTexts = [
        'Your profile is in the top 10000 profiles globally',
        'Your profile is perfect for women between 35 and 45.',
        'Profiles with 6 pics are 200% more effective than profiles with 1 pic',
        'Please ensure your face is clearly visible in all the pictures.',
        'Travel pics and adventure sports pics get the most likes.',
    ];
    const [profilePicture, setProfilePicture] = useState(null);
    const { profilePicture: contextProfilePicture, setProfilePicture: setProfilePictureContext } = useImageContext();
    const [additionalImageBaseUri, setAdditionalImageBaseUri] = useState(null);
    const [extractedFileName, setExtractedFileName] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Update profile picture when data array changes
        if (data.length > 0 && data[0].cdnUrl) {
            setProfilePicture(data[0].cdnUrl);
        } else {
            // Set profile picture to default SVG image when data array is empty
            setProfilePicture(defaultUserImage);
        }
    }, [data]);

    useEffect(() => {
        if (profilePicture !== null) {
            // Update context when profilePicture changes
            setProfilePicture(profilePicture);
            console.log('profilepic sent: ', profilePicture);
        }
    }, [profilePicture, setProfilePicture]);

    useEffect(() => {
        saveProfilePicture();
        // Update context when profilePicture changes
        setProfilePicture(profilePicture);
        console.log('profilepic sent: ', profilePicture);
    }, [profilePicture, setProfilePicture]);

    useEffect(() => {
        saveProfilePicture();
        // Update context when profilePicture changes
        setProfilePicture(profilePicture);
    }, [profilePicture, setProfilePicture]);

    useEffect(() => {
        saveProfilePicture();
        // Update context when profilePicture changes
        setProfilePicture(profilePicture);
    }, [profilePicture, setProfilePicture]);

    useEffect(() => {
        loadProfilePicture();
    }, []);

    useEffect(() => {
        saveProfilePicture();
    }, [profilePicture]);

    const saveProfilePicture = async () => {
        try {
            if (profilePicture !== null) {
                await AsyncStorage.setItem('profilePicture', profilePicture);
            }
        } catch (error) {
            console.error('Error while saving profile picture: ', error);
        }
    };

    const loadProfilePicture = async () => {
        try {
            const savedProfilePicture = await AsyncStorage.getItem('profilePicture');
            if (savedProfilePicture) {
                setProfilePicture(savedProfilePicture);
            }
        } catch (error) {
            console.error('Error while loading profile picture: ', error);
        }
    };

    useEffect(() => {
        if (data.length > 0 && data[0].cdnUrl) {
            setProfilePicture(data[0].cdnUrl);
        }
    }, [data]);

    useEffect(() => {
        // Update profile picture when data array changes
        if (data.length > 0 && data[0].cdnUrl) {
            setProfilePicture(data[0].cdnUrl);
        }
    }, [data]);

    useEffect(() => {
        loadDataFromLocalStorage();
    }, []);

    useEffect(() => {
        saveDataToLocalStorage(data);
    }, [data]);

    const saveDataToLocalStorage = async (data) => {
        try {
            if (!Array.isArray(data)) {
                console.error('Data is not an array: ', data);
                return;
            }
            await AsyncStorage.setItem('imageData', JSON.stringify(data));
        } catch (error) {
            console.error('Error while saving image data: ', error);
        }
    };

    const loadDataFromLocalStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('imageData');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error while loading image data: ', error);
        }
    };

    useEffect(() => {
        const getRandomText = () => {
            const randomIndex = Math.floor(Math.random() * dynamicTexts.length);
            return dynamicTexts[randomIndex];
        };
        const unsubscribe = navigation.addListener('focus', () => {
            const text = getRandomText();
            setRandomText(text);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        console.log('Profile Picture: ', profilePicture);
    }, [profilePicture]);

    const openGallery = (itemId, key) => {
        console.log('itemId in openGallery: ', itemId);
        console.log('Key in openGallery: ', key);
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (!response.didCancel && !response.error && response.assets.length > 0) {
                const updatedData = [...data];
                const selectedImage = response.assets[0];
                const imageUri = selectedImage.uri;
                const now = new Date();
                const date = now.toLocaleDateString('en-US',
                    { day: 'numeric', month: 'long', year: 'numeric' }); // Format the date
                const time = now.toLocaleTimeString();
                updatedData[itemId] = { imageUri, date, time, key };
                setData(updatedData);
                console.log('Updated Data Array: ', updatedData);
            }
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const NEW_API = 'https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql';
            const userid = '999';
            try {
                const query = `
              query GetShinkUser($userId: String!) {
                getShinkUser(userId: $userId) {
                  images
                }
              }
            `;
                const response = await fetch(NEW_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'da2-cwrojubjkncp7gpd6kvsnlv5sa',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId: userid },
                    }),
                });
                const { data, errors } = await response.json();
                console.log('API Response from fetch user data: ', { data, errors });
                if (data && data.getShinkUser && data.getShinkUser.images) {
                    const images = data.getShinkUser.images.map(image => JSON.parse(image));
                    console.log('Images from graphQL: ', images); // Log images data

                    // Update the state with the updated data
                    setData(prevData => prevData.map((item, index) => {
                        if (index < images.length) {
                            return {
                                ...item,
                                cdnUrl: images[index].coverPhoto,
                            };
                        }
                        return item;
                    }));
                } else {
                    console.log('No images found for this user');
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const graphql = async (extractedFileName, itemId, i, userId) => {
        console.log('Item ID:', itemId);
        var query = `mutation updateShinkUser($input: UpdateShinkUserInput!) {
      updateShinkUser(input: $input) {
        userId
        images
      }
    }`;
        const url = 'https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-cwrojubjkncp7gpd6kvsnlv5sa',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        input: {
                            userId: '999',
                            images: [
                                JSON.stringify({
                                    imageId: extractedFileName,
                                    coverPhoto: `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_coverphoto`.replace('_coverphoto', ''),
                                    blurred: `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_blurred`.replace('_coverphoto', ''),
                                    thumbnail: `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_thumbnail`.replace('_coverphoto', ''),
                                    original: `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_original`.replace('_coverphoto', ''),
                                    faceCropped: `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_cropped_face_0`.replace('_coverphoto', ''),
                                    index: i, // Include itemId as index
                                }),
                            ],
                        },
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response from graphql: ', responseData);
        } catch (error) {
            console.log(error);
        }
    };

    // const sendPostRequest = async (userId, extractedFileName) => {
    //     try {
    //         await fetch('https://u68vjvsejh.execute-api.ap-south-1.amazonaws.com/default/presignedURL', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userid: userId,
    //                 fileName: extractedFileName,
    //             }),
    //         });
    //     } catch (error) {
    //         console.error('Error while sending POST request: ', error);
    //     }
    // };

    const uploadImageToS3 = async (file, userId, itemId) => {
        try {
            const presignedUrlData = await getPresignedUrl(file.name, userId);
            if (presignedUrlData) {
                const { presignedUrl, extractedFileName } = presignedUrlData;
                const s3Response = await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    body: file,
                });
                if (s3Response.ok) {
                    console.log('Image uploaded to S3 successfully');
                    console.log('ExtractedFilename: ', extractedFileName);
                    const cdnUrl = `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_coverphoto`;
                    console.log('cdn url: ', cdnUrl);
                    setData(prevData => {
                        const newData = prevData.map((item, index) => {
                            if (index === itemId) {
                                console.log('Updating item: ', item);
                                console.log('itemId in uploadToS3: ', itemId);
                                return { ...item, cdnUrl };
                            }
                            return item;
                        });
                        console.log('New data: ', newData);
                        return newData;
                    });
                } else {
                    console.error('Failed to upload image to S3. Status: ', s3Response.status);
                }
            }
        } catch (error) {
            console.error('Error while uploading image to S3: ', error);
        }
    };

    // useEffect(() => {
    //     console.log('Data in new useffect: ', data);
    // }, [data]);

    // useEffect(() => {
    //     console.log('Card Public URIs in new useeffect: ', cardPublicUris);
    // }, [cardPublicUris]);

    // useEffect(() => {
    //     console.log('Chosen Image in newuseffect: ', chosenImage);
    // }, [chosenImage]);

    // useEffect(() => {
    //     if (Object.keys(cardPublicUris).length === 0) return;
    //     const updatedData = data.map(item => ({
    //         ...item,
    //         publicImageUri: cardPublicUris[item.id] || null,
    //     }));
    //     setData(updatedData);
    // }, [cardPublicUris]);

    // useEffect(() => {
    //     if (cardPublicUris.length > 0) {
    //         setProfilePicUri(cardPublicUris[0].uri);
    //     }
    // }, [cardPublicUris, setProfilePicUri]);

    // useEffect(() => {
    //     const loadData = async () => {
    //         const storedUris = await loadCardPublicUrisFromStorage();
    //         if (storedUris) {
    //             setCardPublicUris(storedUris);
    //         }
    //     };
    //     loadData();
    // }, []);

    // useEffect(() => {
    //     getBaseUriFromAsyncStorage();
    // }, []);

    // useEffect(() => {
    //     // Shuffle the array of texts and set a random text when the component mounts
    //     const shuffledTexts = dynamicTexts.sort(() => Math.random() - 0.5);
    //     setRandomText(shuffledTexts[0]);
    // }, []);

    // useEffect(() => {
    //     console.log('card data: ', cardPublicUris);
    // }, [cardPublicUris]);

    // useEffect(() => {
    //     console.log('Chosen Image State: ', chosenImage);
    // }, [chosenImage]);

    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    // useEffect(() => {
    //     console.log('data: ', data);
    // }, [data]);

    // useEffect(() => {
    //     // Load data from AsyncStorage when the component mounts
    //     loadDataFromStorage();
    // }, []);

    // // Call this function to save cardPublicUris when it updates
    // const handleCardPublicUrisUpdate = (updatedUris) => {
    //     setCardPublicUris(updatedUris);
    //     saveCardPublicUrisToStorage(updatedUris);
    // };
    // const handleDataUpdate = (updatedData) => {
    //     setData(updatedData);
    //     saveDataToStorage(updatedData);
    // };

    // // Function to set the additional image base URI
    // const setBaseUri = (fileName) => {
    //     if (fileName) {
    //         const baseUri = `https://d2902n7npbzg1t.cloudfront.net/${fileName}`;
    //         setAdditionalImageBaseUri(baseUri);
    //         setExtractedFileName(baseUri);

    //         // Store the base URI in AsyncStorage
    //         AsyncStorage.setItem('additionalImageBaseUri', baseUri);
    //         AsyncStorage.setItem('extractedFileName', baseUri);
    //     }
    // };

    // // Function to save cardPublicUris to AsyncStorage
    // const saveCardPublicUrisToStorage = async (uris) => {
    //     try {
    //         await AsyncStorage.setItem('cardPublicUris', JSON.stringify(uris));
    //         console.log('Card public URIs saved to AsyncStorage');
    //     } catch (error) {
    //         console.error('Error while saving card public URIs to AsyncStorage: ', error);
    //     }
    // };

    // // Function to load cardPublicUris from AsyncStorage
    // const loadCardPublicUrisFromStorage = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('cardPublicUris');
    //         return jsonValue != null ? JSON.parse(jsonValue) : null;
    //     } catch (error) {
    //         console.error('Error while loading card public URIs from AsyncStorage: ', error);
    //         return null;
    //     }
    // };

    // // Function to get the additional image base URI from AsyncStorage
    // const getBaseUriFromAsyncStorage = async () => {
    //     try {
    //         const baseUri = await AsyncStorage.getItem('additionalImageBaseUri');
    //         const extractedFileName = await AsyncStorage.getItem('extractedFileName');
    //         if (baseUri && extractedFileName) {
    //             setAdditionalImageBaseUri(baseUri);
    //             setExtractedFileName(extractedFileName);
    //         }
    //     } catch (error) {
    //         console.error('Error while retrieving base URI from AsyncStorage: ', error);
    //     }
    // };

    const openImagePreview = (uri) => {
        setPreviewImageUri(uri);
        setModalVisible(true);
    };
    const closeImagePreview = () => {
        setModalVisible(false);
    };

    // const fetchUserData = async () => {
    //     try {
    //         const response = await fetch('https://9ni2jo54ce.execute-api.ap-south-1.amazonaws.com/default/getUser', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userid: '3',
    //             }),
    //         });
    //         const data = await response.json();
    //         if (data && data.length > 0 && data[0].name && data[0].userid) {
    //             setUserName(data[0].name);
    //             setUserId(data[0].userid);
    //             // Update userIdRef as well
    //             userIdRef.current = data[0].userid;
    //         }
    //     } catch (error) {
    //         console.error('Error while fetching user data: ', error);
    //     }
    // };

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch('https://9ni2jo54ce.execute-api.ap-south-1.amazonaws.com/default/getUser', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     userid: '3',
    //                 }),
    //             });
    //             const data = await response.json();
    //             if (data && data.length > 0 && data[0].name && data[0].userid) {
    //                 setUserName(data[0].name);
    //                 setUserId(data[0].userid);
    //                 userIdRef.current = data[0].userid;
    //             }
    //         } catch (error) {
    //             console.error('Error while fetching user data: ', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    // const getPresignedUrl = async (fileName, userId) => {
    //     try {
    //         const presignedUrlResponse = await fetch('https://u68vjvsejh.execute-api.ap-south-1.amazonaws.com/default/presignedURL', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 fileName: fileName,
    //                 userid: userId,
    //             }),
    //         });
    //         const presignedUrlData = await presignedUrlResponse.json();

    //         console.log('Presigned URL Response: ', presignedUrlData);

    //         if (!presignedUrlData || !presignedUrlData.url || !presignedUrlData.fileName) {
    //             console.error('Presigned URL response is missing required properties.');
    //             return null;
    //         }
    //         return { presignedUrl: presignedUrlData.url, extractedFileName: presignedUrlData.fileName };
    //     } catch (error) {
    //         console.error('Error while getting presigned URL: ', error);
    //         return null;
    //     }
    // };

    // const openGallery = async (item) => {
    //     try {
    //         await getUserId();
    //         const userId = userIdRef.current;
    //         const userIdPrefix = userId ? `${userId}_` : '';
    //         const options = {
    //             mediaType: 'photo',
    //             includeBase64: false,
    //         };
    //         const response = await launchImageLibrary(options);
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //             return;
    //         }
    //         if (response.errorCode) {
    //             console.log('ImagePicker Error: ', response.errorCode);
    //             return;
    //         }
    //         if (!(response.assets && response.assets.length > 0 && response.assets[0].uri)) {
    //             console.log('Unexpected response:', response);
    //             return;
    //         }
    //         const fileName = `${userIdPrefix}${response.assets[0].fileName}`;
    //         const { presignedUrl, extractedFileName } = await getPresignedUrl(fileName, userId);
    //         if (presignedUrl && extractedFileName) {
    //             // Make a PUT request to the presigned URL
    //             await uploadImageToS3(response.assets[0], presignedUrl, userId, extractedFileName);

    //             // Construct public URI for the image
    //             const publicUri = constructPublicUri(userId, extractedFileName);

    //             // Construct CDN URL for the thumbnail image
    //             const cdnURL = `https://d2902n7npbzg1t.cloudfront.net/${extractedFileName}_thumbnail`;

    //             // Update the dateArray with the current date and time
    //             const currentDate = getCurrentDate();
    //             console.log('Current Date: ', currentDate);
    //             updateDateArray(item.id, currentDate);

    //             // Update the state for chosenImage
    //             setChosenImage(publicUri);
    //             console.log('Chosen Image: ', publicUri);

    //             setCardPublicUris((prevUris) => ({
    //                 ...prevUris,
    //                 [item.id]: publicUri, // Store the publicUri with the card ID as key
    //             }));
    //             console.log('item id: ', item.id);
    //             console.log('Public card: ', cardPublicUris);
    //             console.log('public uri: ', publicUri);

    //             setData(prevData => {
    //                 console.log('Previous data: ', prevData);
    //                 const newData = prevData.map(prevItem =>
    //                     prevItem.id === item.id ? { ...prevItem, publicImageUri: publicUri } : prevItem
    //                 );
    //                 console.log('New data: ', newData);
    //                 return newData;
    //             });

    //             // Set the additional image base URI
    //             setBaseUri(extractedFileName);
    //             // set thumbnail image url
    //             setThumbnailImage(cdnURL);
    //             console.log('cdn url: ', cdnURL);
    //             setRenderKey((prevKey) => prevKey + 1);
    //             const blurredImageUrl = `${additionalImageBaseUri}_blurred`;
    //             const coverPhotoImageUrl = `${additionalImageBaseUri}_coverphoto`;
    //             const thumbnailImageUrl = `${additionalImageBaseUri}_thumbnail`;
    //             const originalImageUrl = `${additionalImageBaseUri}_original`;

    //             // Set additional images using a function that gets the previous state
    //             setAdditionalImages((prevImages) => {
    //                 const newImages = {
    //                     ...prevImages,
    //                     blurredImage: blurredImageUrl,
    //                     coverPhotoImage: coverPhotoImageUrl,
    //                     thumbnailImage: thumbnailImageUrl,
    //                     originalImage: originalImageUrl,
    //                 };

    //                 // Log the new images
    //                 console.log('Additional Images State: ', newImages);
    //                 return newImages;
    //             });
    //             setRenderKey((prevKey) => prevKey + 1);
    //             console.log('Image uploaded successfully. Public URI: ', publicUri);
    //             setForceRender((prev) => !prev);
    //         } else {
    //             console.error('Failed to obtain presigned URL or extracted filename');
    //         }
    //         saveDataToStorage();
    //     } catch (error) {
    //         console.error('Error in openGallery: ', error);
    //     }
    // };

    const getPresignedUrl = async (fileName, userId) => {
        try {
            const presignedUrlResponse = await fetch('https://u68vjvsejh.execute-api.ap-south-1.amazonaws.com/default/presignedURL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: fileName,
                    userid: userId,
                }),
            });
            const presignedUrlData = await presignedUrlResponse.json();
            if (!presignedUrlData || !presignedUrlData.url || !presignedUrlData.fileName) {
                console.error('Presigned URL response is missing required properties.');
                return null;
            }
            const extractedFileName = extractFileNameFromPresignedUrl(presignedUrlData.url);
            return { presignedUrl: presignedUrlData.url, extractedFileName };
        } catch (error) {
            console.error('Error while getting presigned URL: ', error);
            return null;
        }
    };

    const extractFileNameFromPresignedUrl = (presignedUrl) => {
        const fileNameMatches = presignedUrl.match(/\/([^/]+)\?/);
        return fileNameMatches ? fileNameMatches[1] : null;
    };

    // const sendPostRequest = async (userId, extractedFileName) => {
    //     try {
    //         await fetch('https://u68vjvsejh.execute-api.ap-south-1.amazonaws.com/default/presignedURL', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userid: userId,
    //                 fileName: extractedFileName,
    //             }),
    //         });
    //     } catch (error) {
    //         console.error('Error while sending POST request: ', error);
    //     }
    // };

    const constructPublicUri = (userId, extractedFileName) => {
        const s3Bucket = 'shinkimagebucket';
        // return `https://${s3Bucket}.s3.amazonaws.com/${extractedFileName}`;
        return ` https://d2902n7npbzg1t.cloudfront.net/${extractedFileName}_original`;
    };

    // const uploadImageToS3 = async (file, presignedUrl, userId, extractedFileName) => {
    //     try {
    //         console.log('About to make the PUT request to S3');
    //         const s3Response = await fetch(presignedUrl, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'image/jpeg',
    //             },
    //             body: file,
    //         });
    //         console.log('S3 Response: ', s3Response);
    //         if (s3Response.ok) {
    //             console.log('Image uploaded to S3 successfully');
    //             console.log('Filename: ', extractedFileName);

    //             // Save the public URI to AsyncStorage
    //             const publicUri = constructPublicUri(userId, extractedFileName);
    //             await saveImageUriToStorage(extractedFileName, publicUri);
    //         } else {
    //             console.error('Failed to upload image to S3. Status: ', s3Response);
    //         }
    //     } catch (error) {
    //         console.error('Error while uploading image to S3: ', error);
    //     }
    // };

    const saveImageUriToStorage = async (fileName, publicUri) => {
        try {
            if (!fileName || !publicUri) {
                console.error('File name or public URI is missing.');
                return;
            }

            // Get the existing image data from AsyncStorage
            const existingImageData = await AsyncStorage.getItem('imageData');
            const imageData = existingImageData ? JSON.parse(existingImageData) : [];

            // Add the new image URI to the imageData array
            imageData.push({ fileName, publicUri });

            // Save the updated imageData array back to AsyncStorage
            await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
        } catch (error) {
            console.error('Error while saving image URI to AsyncStorage: ', error);
        }
    };

    const loadDataFromStorage = async () => {
        try {
            // Load cardPublicUris and data from AsyncStorage
            const storedCardPublicUris = await AsyncStorage.getItem('cardPublicUris');
            const storedData = await AsyncStorage.getItem('data');
            if (storedCardPublicUris && storedData) {
                // Parse stored data
                const parsedCardPublicUris = JSON.parse(storedCardPublicUris);
                const parsedData = JSON.parse(storedData);

                // Update state with the parsed data immediately
                setCardPublicUris(parsedCardPublicUris);
                setData(parsedData);
                console.log('Data loaded from AsyncStorage');
            }
        } catch (error) {
            console.error('Error while loading data from AsyncStorage: ', error);
        }
    };

    const getUserId = async () => {
        try {
            const response = await fetch('https://9ni2jo54ce.execute-api.ap-south-1.amazonaws.com/default/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: '8',
                }),
            });
            const data = await response.json();
            if (data && data.length > 0 && data[0].name && data[0].userid) {
                setUserName(data[0].name);
                setUserId(data[0].userid);
            }
        } catch (error) {
            console.error('Error while fetching user data: ', error);
        }
        console.log('userid from getUserId: ', userId);
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    // const handleSaveButtonPress = async () => {
    //     let requestBody; // Declare requestBody here
    //     try {
    //         // Prepare the imageData array, filtering out entries with empty image names
    //         const imageData = data
    //             .map(item => ({
    //                 imageName: extractFileNameFromPublicUri(cardPublicUris[item.id]),
    //             }))
    //             .filter(image => image.imageName !== ''); // Filter out entries with empty image names
    //         console.log('Image Data:', imageData);

    //         // Log out the request body before making the fetch request
    //         requestBody = JSON.stringify({
    //             query: `
    //               mutation UpdateUserImages($userId: String!, $images: [AWSJSON]!, $additionalImages: AWSJSON!) {
    //                 updateShinkUser(input: { userId: $userId, images: $images, additionalImages: $additionalImages }) {
    //                   userId
    //                   images
    //                   additionalImages
    //                 }
    //               }
    //             `,
    //             variables: {
    //                 userId: userId,
    //                 images: imageData.map(image => ({
    //                     imageName: image.imageName,
    //                 })),
    //                 additionalImages: {
    //                     coverPhoto: {
    //                         url: `${additionalImageBaseUri}_coverphoto`,
    //                     },
    //                     thumbnail: {
    //                         url: `${additionalImageBaseUri}_thumbnail`,
    //                     },
    //                     blurred: {
    //                         url: `${additionalImageBaseUri}_blurred`,
    //                     },
    //                     original: {
    //                         url: `${additionalImageBaseUri}_original`,
    //                     },
    //                 },
    //             },
    //         });
    //         console.log('Request Body: ', requestBody);

    //         // Make a POST request to update the user with the images
    //         const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-api-key': 'da2-ezrssmav7vfpvipxkvvypidpom',
    //             },
    //             body: requestBody,
    //         });
    //         console.log('GraphQL Endpoint Response: ', response);
    //         if (response.ok) {
    //             console.log('Images updated successfully for the user.');
    //             // Save the image data to AsyncStorage
    //             await AsyncStorage.setItem('imageData', JSON.stringify(imageData));
    //             console.log('Image data saved to AsyncStorage.');
    //         } else {
    //             console.error('Failed to update images for the user. Status: ', response.status);
    //             const errorMessage = await response.text();
    //             console.error('Error Message:', errorMessage);
    //         }
    //     } catch (error) {
    //         console.error('Error while updating images for the user: ', error);
    //     }
    // };

    // const extractFileNameFromPublicUri = (publicUri) => {
    //     if (!publicUri) {
    //         return '';
    //     }
    //     // Split the URI by '/'
    //     const parts = publicUri.split('/');
    //     // Return the last part (filename)
    //     return parts[parts.length - 1];
    // };

    // Function to get the current date
    // const getCurrentDate = () => {
    //     const currentDate = new Date();
    //     const day = currentDate.getDate();
    //     const monthNames = [
    //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    //     ];
    //     const month = monthNames[currentDate.getMonth()];
    //     const year = currentDate.getFullYear();
    //     return `${day} ${month} ${year}`;
    // };

    // Function to get the current date
    // const getCurrentDate = () => {
    //     const currentDate = new Date();
    //     const day = currentDate.getDate();
    //     const monthNames = [
    //         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    //     ];
    //     const month = monthNames[currentDate.getMonth()];
    //     const year = currentDate.getFullYear();
    //     return `${day} ${month} ${year}`;
    // };

    // Function to handle date updates
    // const updateDateArray = (itemId, date) => {
    //     // Update the corresponding date entry only for the specific item
    //     setData((prevData) =>
    //         prevData.map((item) =>
    //             item.id === itemId ? { ...item, date } : item
    //         )
    //     );
    // };

    // const handleDelete = (itemId) => {
    //     // Create a copy of cardPublicUris state
    //     const updatedCardPublicUris = { ...cardPublicUris };

    //     // Remove the selected image from cardPublicUris
    //     delete updatedCardPublicUris[itemId];

    //     // Create a copy of data state
    //     const updatedData = data.map((item) =>
    //         item.id === itemId ? { ...item, publicImageUri: null } : item
    //     );

    //     // Update the state with new data
    //     setCardPublicUris(updatedCardPublicUris);
    //     setData(updatedData);

    //     // Update the newOrder array by removing the deleted item
    //     const updatedNewOrder = newOrder.filter((orderItem) => orderItem.id !== itemId);
    //     setNewOrder(updatedNewOrder);

    //     // Log the updated newOrder array
    //     console.log('Updated newOrder: ', updatedNewOrder);

    //     // Find the next available image in the updated order
    //     const nextAvailableImageId = updatedNewOrder.find(
    //         (orderItem) => updatedCardPublicUris[orderItem.id]
    //     );
    //     if (nextAvailableImageId) {
    //         // Set the next available image as the profile picture
    //         const nextProfilePictureUri = updatedCardPublicUris[nextAvailableImageId.id];
    //         setProfilePicUri(nextProfilePictureUri);
    //         console.log('Next Profile picture updated: ', nextProfilePictureUri);
    //     } else {
    //         // If there are no more available images, set profilePicUri to the local path of the default image
    //         const defaultImageUri = '../assets/images/user.png';
    //         setProfilePicUri(defaultProfileImage.uri);
    //         console.log('No more available images. Profile picture set to default.');
    //     }

    //     // Save the updated data to AsyncStorage
    //     saveDataToStorage();
    //     console.log(`Image with ID ${itemId} is deleted.`);
    //     updateDateArray(itemId, 'N/A');
    // };

    const handleSaveButtonPress = async () => {
        try {
            const userId = '999';
            await clearImagesFieldInGraphQL();
            const uploadPromises = [];
            const cdnUrls = [];
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                if (item.imageUri) {
                    const response = await fetch(item.imageUri);
                    const blob = await response.blob();
                    const presignedUrlData = await getPresignedUrl(blob.name, userId);
                    if (presignedUrlData) {
                        const { presignedUrl, extractedFileName } = presignedUrlData;
                        uploadPromises.push(
                            fetch(presignedUrl, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'image/jpeg',
                                },
                                body: blob,
                            })
                        );
                        const cdnUrl = `https://d2902n7npbzg1t.cloudfront.net/${userId}/${extractedFileName}_coverphoto`;
                        cdnUrls.push(cdnUrl);
                        console.log('userId: ', userId);
                        console.log('extractedFileName: ', extractedFileName);
                        console.log('cdnUrl in save button: ', cdnUrl);
                    }
                }
            }
            await Promise.all(uploadPromises);
            console.log('All files uploaded successfully');
            const graphqlPromises = [];
            for (let i = 0; i < cdnUrls.length; i++) {
                const cdnUrl = cdnUrls[i];
                const extractedFileName = cdnUrl.split('/').pop();
                const imageId = i === 0 ? 'profilepicture' : 'imageId';
                graphqlPromises.push(graphql(extractedFileName, imageId, i, userId));
            }
            await Promise.all(graphqlPromises);
            console.log('All data sent to GraphQL successfully');
        } catch (error) {
            console.error('Error while uploading files: ', error);
        }
    };

    const clearImagesFieldInGraphQL = async () => {
        try {
            const mutation = `
                mutation ClearUserImages($userId: String!) {
                    updateShinkUser(input: {
                        userId: $userId,
                        images: []
                    }) {
                        userId
                        images
                    }
                }
            `;
            const response = await fetch('https://6zdkqxsh5nb57gljtisvt3rxre.appsync-api.ap-south-1.amazonaws.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        userId: '999',
                    },
                }),
            });
            const responseData = await response.json();
            console.log('API Response from updateShinkUser: ', responseData);
        } catch (error) {
            console.error('Error while clearing user images: ', error);
        }
    };

    const saveDataToStorage = async () => {
        try {
            // Save cardPublicUris and data to AsyncStorage simultaneously
            await AsyncStorage.setItem('cardPublicUris', JSON.stringify(cardPublicUris));
            await AsyncStorage.setItem('data', JSON.stringify(data));
            console.log('Data saved to AsyncStorage');
        } catch (error) {
            console.error('Error while saving data to AsyncStorage: ', error);
        }
    };

    // const loadDataFromStorage = async () => {
    //     try {
    //         // Load cardPublicUris and data from AsyncStorage
    //         const storedCardPublicUris = await AsyncStorage.getItem('cardPublicUris');
    //         const storedData = await AsyncStorage.getItem('data');
    //         if (storedCardPublicUris && storedData) {
    //             // Parse stored data
    //             const parsedCardPublicUris = JSON.parse(storedCardPublicUris);
    //             const parsedData = JSON.parse(storedData);

    //             // Handle the absence of the dateTime field (remove it if necessary)
    //             const cleanedData = parsedData.map((item) => {
    //                 // Remove the dateTime field if present
    //                 const { dateTime, ...rest } = item;
    //                 return rest;
    //             });

    //             // Update state with the cleaned data
    //             setCardPublicUris(parsedCardPublicUris);
    //             setData(cleanedData);
    //             console.log('Data loaded from AsyncStorage');
    //         }
    //     } catch (error) {
    //         console.error('Error while loading data from AsyncStorage: ', error);
    //     }
    // };

    // useEffect(() => {
    //     // Load data from AsyncStorage when the component mounts
    //     loadDataFromStorage();
    // }, []);

    // const onDragEnd = ({ data: updatedData }) => {
    //     // Update the state with the new order after dragging
    //     const newOrder = updatedData.map((item) => ({ id: item.id, publicImageUri: item.publicImageUri }));
    //     setItemOrder(newOrder);
    //     console.log('Updated Order of Items: ', newOrder);

    //     // Update the data state with the new order
    //     setData(updatedData);

    //     // Update the cardPublicUris state with the new order directly
    //     const updatedUris = {};
    //     updatedData.forEach((item) => {
    //         updatedUris[item.id] = item.publicImageUri;
    //     });
    //     console.log('Updated cardPublicUris: ', updatedUris);

    //     // Call a function to handle the side effects
    //     handleDragEnd(updatedUris, newOrder);
    // };

    const deleteImage = async (imageId, index) => {
        const userId = '972'; // Assuming you have the user ID
        const NEW_API = 'https://ialzbzns5rgfvih4mkiodrpeti.appsync-api.ap-south-1.amazonaws.com/graphql';
        try {
            const mutation = `
          mutation DeleteImage($userId: String!, $imageId: String!) {
            deleteImage(userId: $userId, imageId: $imageId)
          }
        `;
            const response = await fetch(NEW_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'da2-kzjqngazhngz7blym6iljtphny',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { userId, imageId },
                }),
            });
            const { data, errors } = await response.json();
            console.log('API Response from delete image: ', { data, errors });
            if (data && data.deleteImage) {
                console.log('Image deleted successfully');

                // Update the state to reflect the deletion
                setData(prevData => {
                    const newData = [...prevData];
                    newData.splice(index, 1);
                    return newData;
                });
            } else {
                console.log('Failed to delete image');
            }
        } catch (error) {
            console.error('Error while deleting image: ', error);
        }
    };

    const handleDelete = async (item) => {
        try {
            const imageUriToDelete = data[item]?.imageUri;
            await removeImageFromLocalStorage(imageUriToDelete);
            setData(prevData => {
                const updatedData = [...prevData];
                updatedData[item] = { ...updatedData[item], imageUri: null, cdnUrl: null, date: null };
                return updatedData;
            });
            await clearImagesFieldInGraphQL();
            console.log('User images cleared successfully');
        } catch (error) {
            console.error('Error while clearing user images: ', error);
        }
    };

    const removeImageFromLocalStorage = async (imageUri) => {
        try {
            const storedData = await AsyncStorage.getItem('imageData');
            if (!storedData) return;
            let images = JSON.parse(storedData);
            images = images.filter(image => image !== imageUri);
            await AsyncStorage.setItem('imageData', JSON.stringify(images));
        } catch (error) {
            console.error('Error while removing image data: ', error);
        }
    };

    // const handleDragEnd = (updatedUris, newOrder) => {
    //     // Update the dateArray based on the new order
    //     const updatedDateArray = newOrder.map((orderItem) => {
    //         const orderIndex = newOrder.findIndex((item) => item.id === orderItem.id);
    //         return orderIndex !== -1 ? dateArray[orderIndex] : 'N/A';
    //     });

    //     // Perform side effects, e.g., logging
    //     console.log('New Order of Images: ', newOrder);

    //     // Set the cardPublicUris state
    //     setCardPublicUris(updatedUris);

    //     // Extract the first image from the updated order
    //     const firstImage = updatedUris[newOrder[0].id];

    //     if (firstImage) {
    //         // Update the profile picture URI using the context function
    //         setProfilePicUri(firstImage);
    //         console.log('Profile picture updated: ', firstImage);
    //     }

    //     // Set the dateArray state
    //     setDateArray(updatedDateArray);

    //     // Save the new order and dateArray to AsyncStorage
    //     saveNewOrderToStorage(newOrder);
    //     saveDateArrayToStorage(updatedDateArray);
    // };

    // const saveDateArrayToStorage = async (dateArray) => {
    //     try {
    //         // Save dateArray to AsyncStorage
    //         await AsyncStorage.setItem('dateArray', JSON.stringify(dateArray));
    //         console.log('DateArray saved to AsyncStorage');
    //     } catch (error) {
    //         console.error('Error while saving dateArray to AsyncStorage: ', error);
    //     }
    // };

    // const saveNewOrderToStorage = async (order) => {
    //     try {
    //         // Save newOrder to AsyncStorage
    //         await AsyncStorage.setItem('newOrder', JSON.stringify(order));
    //         console.log('New Order saved to AsyncStorage');
    //     } catch (error) {
    //         console.error('Error while saving newOrder to AsyncStorage: ', error);
    //     }
    // };

    // Function to handle drag end and save reordered data
    const handleDragEnd = ({ data: newData }) => {
        const reorderedData = [];
        newData.forEach((item) => {
            const index = parseInt(item.replace('item-', ''));
            reorderedData.push(data[index]);
        });
        setData(reorderedData);
        saveDataToLocalStorage(reorderedData);
        if (reorderedData.length > 0 && reorderedData[0].cdnUrl) {
            setProfilePictureContext(reorderedData[0].cdnUrl);
        }
    };

    // useEffect(() => {
    //     // Load data from AsyncStorage when the component mounts
    //     loadDataFromStorage();
    // }, []);

    const renderItem = ({ item, drag, isActive }) => {
        const isImageUploaded = !!cardPublicUris[item.id];
        const imageUrl = isImageUploaded ? `${cardPublicUris[item.id]}` : null;
        console.log('image url constructed dring rendering: ', imageUrl);
        const { imageUri } = data[item] || { imageUri: null };
        const { date, view } = data[item] || { date: 'N/A', view: 0 };

        return (
            <TouchableWithoutFeedback onPress={() => closeImagePreview()}>
                <View style={styles.container}>
                    <TouchableOpacity onLongPress={() => drag()}
                        style={[styles.cardContainer, isActive && { backgroundColor: 'lightgrey' }]}>
                        {imageUri ? (
                            <TouchableOpacity onPress={() => { /* Do nothing if image is already uploaded */ }}>
                                <View style={styles.plusSignContainer}>
                                    <Image source={{ uri: imageUri }}
                                        style={styles.thumbnailImageStyle} />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => openGallery(item, item.key)}>
                                <View style={styles.plusSignContainer}>
                                    {!imageUri && (
                                        <Text style={styles.plusSignTextStyle}>+</Text>
                                    )}
                                    {data[item]?.imageUri && (
                                        <Image source={{ uri: data[item].imageUri }}
                                            style={styles.choosenImageStyle} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                        {/* <View style={styles.cardContentContainer}>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateTextStyle}>Date: {date}</Text>
                                <Text style={styles.dateTextStyle}>Time: N/A</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}
                                style={styles.deleteIconContainer}>
                                <Image source={require('../assets/images/delete-icon.jpg')}
                                    style={styles.deleteIconStyle} />
                            </TouchableOpacity>
                        </View> */}
                        {/* Child Section */}
                        <View style={styles.childSectionStyle}>
                            <Text style={styles.textStyle}>Date: <Text style={[styles.textStyle
                                , { color: '#354e66' }]}>{date}</Text></Text>
                            <Text style={styles.textStyle}>Views: <Text style={[styles.textStyle
                                , { color: '#354e66' }]}>{view}</Text></Text>
                            <Text style={styles.textStyle}>Time: <Text style={[styles.textStyle
                                , { color: '#354e66' }]}>32 people spent 3 minutes on it</Text></Text>
                        </View>
                        {/* Delete Icon */}
                        <TouchableOpacity onPress={() => handleDelete(item)}
                            style={styles.deleteIconContainer}>
                            <Image source={require('../assets/images/delete-icon.jpg')}
                                style={styles.deleteIconStyle} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {/* <Modal animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => closeImagePreview()}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={styles.modalContainer}>
                                <Image source={{ uri: previewImageUri }}
                                    style={styles.previewImageStyle} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal> */}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <ImageContextProvider>
            <View style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.purpleBarStyle}>
                    {/* Back Button and Title Text */}
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={styles.rowContainer}>
                        <Image source={require('../assets/images/white-left-arrow.png')}
                            style={styles.backImageStyle} />
                        <Text style={styles.titleTextStyle}>My Pics</Text>
                    </TouchableOpacity>
                </LinearGradient>
                {/* Heading Container */}
                <View style={styles.headingContainer}>
                    <Text style={styles.headingTextStyle}>Add up to 6 photos</Text>
                </View>
                {/* Text Container */}
                <View style={{ padding: normalize(10) }}>
                    {/* Inner Container */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.profileTextContainer}>
                            <Text style={styles.middleTextStyle}>{randomText}</Text>
                        </View>
                        {/* <Text style={styles.middleSubTextStyle}>These 6 photos are public</Text> */}
                    </View>
                </View>
                {/* Heading Container */}
                {/* <View style={styles.headingContainer}>
                <Text style={styles.headingTextStyle}>Add up to 6 photos</Text>
            </View> */}
                {/* Additional Container */}
                {/* <View style={styles.middleContainer}>
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.middleGradientStyle}>
                    <Text style={styles.middleTextStyle}>Your Profile Has Reached Top 10%</Text>
                </LinearGradient>
                <Text style={styles.middleSubTextStyle}>These 6 photos are public</Text>
            </View> */}
                {/* PublicCard Component with Drag-and-Drop */}
                <View style={{ flex: 1 }}>
                    <DraggableFlatList data={Object.keys(data)}
                        vertical
                        renderItem={({ item, index, drag, isActive }) =>
                            renderItem({ item, index, drag, isActive })}
                        keyExtractor={(item) => item}
                        onDragEnd={() => handleDragEnd()} />
                </View>
                {/* Modal for Image Preview */}
                {/* <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}
                        style={styles.closeModalButtonContainer}>
                        <Image source={require('../assets/images/close-icon.png')}
                            style={styles.closeModalIconStyle} />
                    </TouchableOpacity>
                    {previewImage !== null && selectedImages[previewImage] ? (
                        <Image source={{ uri: selectedImages[previewImage] }}
                            style={styles.enlargedImageStyle} />
                    ) : (
                        <Text>No image selected</Text>
                    )}
                </View>
            </Modal> */}
                {/* Save Button with Linear Gradient */}
                <LinearGradient start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#c680b2', '#9e5594', '#7b337e']}
                    style={styles.saveButtonContainer}>
                    <TouchableOpacity onPress={() => handleSaveButtonPress()}
                        style={styles.saveBottomButtonContainer}>
                        <Text style={styles.saveBottomButtonTextStyle}>Save</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </ImageContextProvider>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    purpleBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        width: '100%',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backImageStyle: {
        width: normalize(17),
        height: normalize(17),
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginLeft: normalize(13),
        fontSize: 23.5,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 32,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingContainer: {
        padding: normalize(17),
        backgroundColor: '#ffffff',
    },
    headingTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 21,
    },
    publicCardContainer: {
        paddingHorizontal: normalize(15),
        paddingTop: normalize(15),
        marginBottom: normalize(60),
    },
    cardContainer: {
        paddingVertical: normalize(8),
        paddingHorizontal: normalize(18),
        // marginHorizontal: normalize(20),
        marginBottom: normalize(10),
        width: '92%', // Take full width
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        gap: 10,
    },
    plusSignContainer: {
        width: normalize(80),
        height: normalize(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    plusSignTextStyle: {
        fontSize: 25,
        fontWeight: '400',
        color: '#282c3f',
    },
    middleContainer: {
        paddingHorizontal: normalize(14),
        marginTop: normalize(12),
        // marginBottom: 10,
        width: '78%',
        alignSelf: 'center',
    },
    middleGradientStyle: {
        marginBottom: normalize(8),
        borderRadius: normalize(4),
        overflow: 'hidden',
    },
    middleTextStyle: {
        fontSize: 13.5,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 21,
    },
    middleSubTextStyle: {
        marginTop: normalize(5),
        marginBottom: normalize(10),
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#9e5594',
        textAlign: 'center',
        lineHeight: 16,
    },
    saveButtonContainer: {
        position: 'absolute',
        top: normalize(640),
        bottom: normalize(0),
        left: normalize(0),
        right: normalize(0),
        marginTop: normalize(10),
        marginLeft: normalize(12),
        marginRight: normalize(12),
        // width: '95%',
        height: normalize(50),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 1,
    },
    saveBottomButtonContainer: {
        paddingLeft: normalize(100),
        paddingRight: normalize(100),
        width: '92%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    saveBottomButtonTextStyle: {
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 24,
    },
    thumbnailImageStyle: {
        width: normalize(50),
        height: normalize(50),
        borderRadius: 8,
    },
    selectedImageStyle: {
        width: normalize(60),
        height: normalize(60),
        resizeMode: 'cover',
        borderRadius: 5,
    },
    closeModalButtonContainer: {
        position: 'absolute',
        top: normalize(20),
        right: normalize(20),
    },
    closeModalIconStyle: {
        width: normalize(25),
        height: normalize(25),
        resizeMode: 'contain',
    },
    enlargedImageStyle: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    childSectionStyle: {
        flex: 1,
        padding: normalize(10),
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#282c3f',
        lineHeight: 18,
    },
    deleteIconContainer: {
        position: 'absolute',
        right: normalize(10),
        alignSelf: 'center',
    },
    deleteIconStyle: {
        width: normalize(25),
        height: normalize(25),
        resizeMode: 'contain',
    },
    // Additional styles for the modal
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    previewImageStyle: {
        width: normalize(300),
        height: normalize(300),
        borderRadius: 8,
    },
    // grayBoxContainer: {
    //     width: 50,
    //     height: 50,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'lightgray',
    //     borderRadius: 8,
    // },
    // cardContentContainer: {
    //     marginLeft: 0,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // dateContainer: {
    //     flexDirection: 'column',
    //     alignItems: 'flex-start',
    //     marginRight: 140,
    // },
    // dateTextStyle: {
    //     fontSize: 12,
    //     color: '#354e66',
    // },
    // deleteButtonStyle: {
    //     width: 20,
    //     height: 20,
    // },
    profileTextContainer: {
        padding: normalize(10),
        marginVertical: normalize(10),
        alignItems: 'center',
        backgroundColor: '#5e2f85',
        borderRadius: 5,
    },
});

export default MyPicsScreen;

