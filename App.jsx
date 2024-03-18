/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/contexts/AppContext';
import { ImageContextProvider } from './src/contexts/ImageContext';
import { ProfileProvider } from './src/contexts/ProfileContext';
import { WebSocketProvider } from './src/contexts/WebSocketContext';
import RootNavigation from './src/navigation/RootNavigation';

LogBox.ignoreAllLogs();

function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider>
          <ImageContextProvider>
            <ProfileProvider>
              <WebSocketProvider>
                <RootNavigation />
              </WebSocketProvider>
            </ProfileProvider>
          </ImageContextProvider>
        </AppProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
