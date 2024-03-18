/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { attachmentSvg, closeIconSvg, ellipseSvg } from '../data/SvgImageData';
import { launchImageLibrary } from 'react-native-image-picker';
import { normalize } from '../components/theme';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';

const EditBirthDateNextScreen = () => {
    const navigation = useNavigation();
    const [buttonColor, setButtonColor] = useState('#ffffff');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Update button color based on navigation bar gradient colors
        setButtonColor('#ffffff');
    }, []);

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
                                    birthDate
                                    name
                                    userId
                                }
                            }
                        `,
                        variables: { userId: userid },
                    }),
                });
                const data = await response.json();
                console.log('API Response: ', data);
                if (data && data.data && data.data.getShinkUser) {
                    const { name, userId } = data.data.getShinkUser;
                    setName(name);
                    setUserId(userId);
                }
            } catch (error) {
                console.error('Error while fetching user data: ', error);
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    // Modify the getPresignedUrl function to extract the filename from the response
    const getPresignedUrl = async (fileName, userId) => {
        try {
            const presignedUrlResponse = await fetch('https://s73ojp5x77.execute-api.ap-south-1.amazonaws.com/default/presignedUrlForBirthdateVerification', {
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
            console.log('Presigned URL Response: ', presignedUrlData);
            if (!presignedUrlData || !presignedUrlData.url || !presignedUrlData.fileName) {
                console.error('Presigned URL response is missing required properties');
                return null;
            }
            return {
                presignedUrl: presignedUrlData.url,
                extractedFileName: presignedUrlData.fileName,
            };
        } catch (error) {
            console.error('Error while getting presigned URL: ', error);
            return null;
        }
    };

    const uploadFileToS3 = async (file, userId, fileName) => {
        try {
            // Get presigned URL for the file
            const { presignedUrl, extractedFileName } = await getPresignedUrl(file.name, userId);

            // Check if presigned URL exists
            if (presignedUrl && extractedFileName) {
                // Append file extension to the extracted filename
                const filenameWithExtension = `${extractedFileName}.${file.fileExtension}`;

                // Make PUT request to presigned URL to upload the file
                const response = await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.fileExtension === 'pdf' ? 'application/pdf' : 'image/jpeg',
                    },
                    body: file.fileExtension === 'pdf' ? file.uri : file.data, // Use appropriate body based on file type
                });

                // Check if upload was successful
                if (response.ok) {
                    console.log('File uploaded successfully: ', filenameWithExtension);
                    // Perform any additional actions if needed
                } else {
                    console.error('Failed to upload file: ', filenameWithExtension);
                }
            } else {
                console.error('Failed to obtain presigned URL for file: ', file.name);
            }
        } catch (error) {
            console.error('Error while uploading file: ', error);
        }
    };

    const handlePreviousButtonPressed = () => {
        navigation.goBack();
    };

    const handleNextButtonPressed = async () => {
        try {
            // Iterate over selected files
            for (const file of selectedFiles) {
                // Get presigned URL and filename for each file
                const { presignedUrl, extractedFileName } = await getPresignedUrl(file.name, userId);

                // Check if presigned URL and filename exist
                if (presignedUrl && extractedFileName) {
                    // Upload the file to S3 using the presigned URL and filename
                    await uploadFileToS3(file, userId, extractedFileName);
                } else {
                    console.error('Failed to obtain presigned URL or filename for file: ', file.name);
                }
            }

            // Once all files are uploaded, you can trigger the Lambda function
            const lambdaResponse = await fetch('https://s73ojp5x77.execute-api.ap-south-1.amazonaws.com/default/presignedUrlForBirthdateVerification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userId,
                }),
            });
            if (lambdaResponse.ok) {
                console.log('Lambda function triggered successfully');
                // Handle the Lambda function response if needed
            } else {
                console.error('Failed to trigger Lambda function');
            }
            navigation.navigate('EditBirthDate', { success: true });
            console.log('Success value sent: ', true);
        } catch (error) {
            console.error('Error handling next button press: ', error);
        }
    };

    const handleAttachDocumentPressed = async () => {
        try {
            const response = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });
            console.log('Document Picker Response: ', response);
            if (Array.isArray(response) && response.length > 0) {
                const { uri, name, type, size } = response[0];
                if (name) {
                    const fileExtension = name.split('.').pop().toLowerCase();
                    const allowedFileTypes = ['jpg', 'jpeg', 'png', 'pdf'];
                    if (allowedFileTypes.includes(fileExtension) || type.toLowerCase().includes('pdf')) {
                        let sizeUnit = 'Bytes';
                        let sizeFormatted = size;
                        if (size >= 1024 * 1024 * 1024) {
                            sizeFormatted = (size / (1024 * 1024 * 1024)).toFixed(2);
                            sizeUnit = 'GB';
                        } else if (size >= 1024 * 1024) {
                            sizeFormatted = (size / (1024 * 1024)).toFixed(2);
                            sizeUnit = 'MB';
                        } else if (size >= 1024) {
                            sizeFormatted = (size / 1024).toFixed(2);
                            sizeUnit = 'KB';
                        }
                        setSelectedFiles(prevFiles => [
                            ...prevFiles,
                            { uri, name, fileExtension, sizeFormatted, sizeUnit },
                        ]);
                    } else {
                        console.log('Unsupported file type: ', type);
                    }
                } else {
                    console.log('Error: Name property is undefined in the document picker response');
                }
            } else {
                console.log('Error: Document picker response is empty or not an array');
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('User canceled document selection');
            } else {
                console.log('Error selecting document: ', error);
            }
        }
    };

    const handleDeleteDocument = (index) => {
        setSelectedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#c680b2', '#9e5594', '#7b337e']}
                style={styles.navigationBarStyle}>
                <TouchableOpacity onPress={() => handlePreviousButtonPressed()}
                    style={styles.rowContainer}>
                    <Image source={require('../assets/images/white-left-arrow.png')}
                        style={styles.backImageStyle} />
                    <Text style={styles.titleTextStyle}>Birthday?</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={styles.inputContainer}>
                <Text style={styles.labelTextStyle}>User ID</Text>
                <TextInput value={userId}
                    onChangeText={(value) => setUserId(value)}
                    placeholder="User ID"
                    style={styles.textInputStyle} />
                <Text style={styles.labelTextStyle}>Name</Text>
                <TextInput value={name}
                    onChangeText={(value) => setName(value)}
                    placeholder="Name"
                    style={styles.textInputStyle} />
                <Text style={styles.labelTextStyle}>Email</Text>
                <TextInput value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Email"
                    style={styles.textInputStyle} />
                <TextInput value={additionalDetails}
                    onChangeText={setAdditionalDetails}
                    multiline={true}
                    placeholder="Please provide additional details (Optional)"
                    style={styles.additionalDetailsTextInputStyle} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.selectedFilesSubContainer}>
                        {selectedFiles.map((file, index) => (
                            <View key={index}
                                style={styles.selectedFileItemContainer}>
                                {file.fileExtension === 'pdf' ? (
                                    <Image source={require('../assets/images/pdf.png')}
                                        style={styles.iconStyle} />
                                ) : (
                                    <Image source={{ uri: file.uri }}
                                        style={styles.imageIconStyle} />
                                )}
                                <View style={styles.fileDetailsContainer}>
                                    <Text style={styles.fileNameTextStyle}>{file.name}</Text>
                                    <Text style={styles.fileSizeTextStyle}>{`${file.sizeFormatted} ${file.sizeUnit}`}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleDeleteDocument(index)}>
                                    <SvgXml xml={closeIconSvg}
                                        width={normalize(20)} height={normalize(20)} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => handleAttachDocumentPressed()}
                    style={styles.attachDocumentButtonContainer} >
                    {/* {selectedFiles ? (
                        <View style={styles.selectedImageContainer}>
                            <Image source={{ uri: selectedImage }}
                                style={styles.attachmentImageStyle} />
                            <View style={styles.imageDetailsContainer}>
                                <View style={styles.fileNameAndSizeContainer}>
                                    <View style={styles.fileNameContainer}>
                                        <Text style={styles.imageFileNameTextStyle}
                                            numberOfLines={2}>{selectedFileName}</Text>
                                        <SvgXml xml={ellipseSvg} style={styles.ellipseIconStyle} />
                                    </View>
                                    {imageSize && (
                                        <Text style={styles.imageSizeTextStyle} numberOfLines={1}>
                                            {selectedFileName.length > 30 ? imageSize : ''}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <SvgXml onPress={handleDeleteImage}
                                xml={closeIconSvg} style={styles.attachmentIconStyle} />
                        </View>
                    ) : (
                        <>
                            <SvgXml xml={attachmentSvg} style={styles.attachmentIconStyle} />
                            <Text style={styles.attachDocumentButtonTextStyle}>Attach Document</Text>
                        </>
                    )} */}
                    <SvgXml xml={attachmentSvg}
                        style={styles.attachmentIconStyle} />
                    <Text style={styles.attachDocumentButtonTextStyle}>Attach Document</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={() => handleNextButtonPressed()}>
                    <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#c680b2', '#9e5594', '#7b337e']}
                        style={[styles.buttonContainer,
                        { backgroundColor: buttonColor }]}>
                        <Text style={styles.buttonTextStyle}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: normalize(0),
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
    },
    navigationBarStyle: {
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(20),
        width: '100%',
        height: normalize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    inputContainer: {
        paddingHorizontal: normalize(20),
        marginTop: normalize(20),
        width: '100%',
    },
    labelTextStyle: {
        marginBottom: normalize(8),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    textInputStyle: {
        padding: normalize(10),
        marginBottom: normalize(10),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    additionalDetailsLabelTextStyle: {
        marginTop: normalize(20),
        marginBottom: normalize(8),
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 16,
    },
    additionalDetailsTextInputStyle: {
        padding: normalize(10),
        marginBottom: normalize(15),
        height: normalize(120), // Adjust height as needed
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    attachDocumentButtonContainer: {
        padding: normalize(8),
        flexDirection: 'row', // Ensure child elements are arranged horizontally
        alignItems: 'center', // Align children vertically in the center
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 5,
    },
    attachmentIconStyle: {
        marginRight: normalize(10),
        width: normalize(20),
        height: normalize(20),
    },
    ellipseIconStyle: {
        marginRight: normalize(5),
        marginLeft: normalize(5), // Add margin left for centering
        width: normalize(10),
        height: normalize(10),
    },
    fileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachDocumentButtonTextStyle: {
        fontSize: 15.5,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        lineHeight: 21,
    },
    selectedImageContainer: {
        flexDirection: 'row', // Ensure child elements are arranged horizontally
        alignItems: 'center', // Align children vertically in the center
    },
    attachmentImageStyle: {
        marginRight: normalize(10),
        width: normalize(50), // Adjust as needed
        height: normalize(50), // Adjust as needed
    },
    imageDetailsContainer: {
        flex: 1,
        marginLeft: normalize(10),
    },
    imageFileNameTextStyle: {
        marginRight: normalize(5),
        fontSize: 10,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        flexShrink: 1,
    },
    imageSizeTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
        flexShrink: 1,
    },
    fileNameAndSizeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    bottomButtonContainer: {
        paddingHorizontal: normalize(20),
        marginTop: 'auto',
        width: '100%',
        flexDirection: 'column',
    },
    buttonContainer: {
        padding: normalize(13),
        marginBottom: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'AvenirNext-Regular',
        color: '#ffffff',
        lineHeight: 23.4,
    },
    selectedFilesSubContainer: {
        marginTop: normalize(10),
        gap: normalize(4),
    },
    selectedFileItemContainer: {
        padding: normalize(10),
        marginTop: normalize(5),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cfd3d6',
        borderRadius: 10,
        gap: 1,
    },
    iconStyle: {
        width: normalize(30),
        height: normalize(30),
        resizeMode: 'contain',
    },
    imageIconStyle: {
        width: normalize(30),
        height: normalize(30),
        resizeMode: 'cover',
    },
    fileDetailsContainer: {
        flex: 1,
        marginLeft: normalize(10),
    },
    fileNameTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000', // Text color
    },
    fileSizeTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'AvenirNext-Regular',
        color: '#000000',
    },
});


export default EditBirthDateNextScreen;
