import React from 'react';
import { StatusBar, SafeAreaView, View, Text } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/constants/theme';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <AppNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;