/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useReducer } from 'react';

const ProfileContext = createContext();

const profileReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BIO':
            return { ...state, bio: action.payload };
        case 'SET_INTERESTS':
            return { ...state, interests: action.payload };
        case 'SET_PROFILE_STRENGTH':
            return { ...state, profileStrength: action.payload };
        default:
            return state;
    }
};

export const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, {
        bio: '', // Initial bio state
        interests: [], // Initial interests state
        profileStrength: 0,
    });

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileProvider');
    }
    return context;
};
