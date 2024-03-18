/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

const ImageContextProvider = ({ children }) => {
    const [selectedImages, updateSelectedImages] = useState([]);
    const [savedImages, setSavedImages] = useState([]);
    const [imageDetails, setImageDetails] = useState([]);
    const [imageOrder, setImageOrder] = useState([]);
    const [profilePicUri, setProfilePicUri] = useState(null);
    const [cardPublicUris, setCardPublicUris] = useState({});

    const updateProfilePicUri = (newProfilePicUri) => {
        // Check if the newProfilePicUri is null and there are no other images
        const noImages = Object.keys(cardPublicUris).length === 0 && newProfilePicUri === null;
        // Find the next available image in the order
        const nextAvailableImageId = imageOrder.find((orderItem) => cardPublicUris[orderItem]);
        // Set the profilePicUri to the next available image or the default image path if no images are available
        const defaultImageUri = 'C:\\Users\\md mursaleen\\Documents\\Shink App\\ShinkApp\\src\\assets\\images\\user.png';
        // Set profilePicUri to the default image if no images are available or the provided URI is null
        setProfilePicUri(noImages ? defaultImageUri : newProfilePicUri || defaultImageUri);
    };

    const contextValue = {
        selectedImages,
        updateSelectedImages,
        savedImages,
        setSavedImages,
        imageDetails,
        setImageDetails,
        imageOrder,
        setImageOrder,
        profilePicUri,
        setProfilePicUri,
        updateProfilePicUri,
        cardPublicUris,
        setCardPublicUris,
    };

    return (
        <ImageContext.Provider value={contextValue}>
            {children}
        </ImageContext.Provider>
    );
};

const useImageContext = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImageContext must be used within an ImageContextProvider');
    }
    return context;
};

export { ImageContextProvider, useImageContext };
