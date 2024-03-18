/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext, useContext } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState();
    const value = { ws, setWs };

    const handleWebSocket = async (id) => {
        const newWs = new
            WebSocket(`wss://fuule4re7f.execute-api.ap-south-1.amazonaws.com/production/?id=${id}`);
        newWs.onopen = () => {
            console.log('WebSocket connection is opened');
            setWs(newWs);  // Set the new WebSocket instance in the context
        };
        newWs.onclose = () => {
            console.log('WebSocket connection is closed');
        };
        newWs.onerror = (e) => {
            console.log('WebSocket error: ', e);
        };
        newWs.onmessage = (e) => {
            console.log('WebSocket message is received: ', e.data);
        };
    };

    const getUserData = async () => {
        try {
            const currentUser = await getCurrentUser();
            handleWebSocket(currentUser.data.userId);
        } catch (error) {
            console.log('Websocket user not signed in');
        }
    };

    useEffect(() => {
        // Open a new WebSocket connection when the component mounts
        let myId;
        const getMyId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            console.log('userid', userId);
            myId = userId;
            handleWebSocket(userId);
        };
        // getMyId();
        getUserData();
    }, []);

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
