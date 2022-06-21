import React from 'react';
import 'react-native-gesture-handler';

import AppRouter from './src/routes/app.routes';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NativeBaseProvider>
              <AppRouter />
            </NativeBaseProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
  );
}
