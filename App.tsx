import React from 'react';
import 'react-native-gesture-handler';
import { Dashboard } from './src';

import { GestureHandlerRootView } from 'react-native-gesture-handler'; 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Dashboard />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
