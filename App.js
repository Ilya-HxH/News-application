import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App () {
    return (
        <FavoritesProvider>
            <StatusBar style="auto"/>
            <AppNavigator />
        </FavoritesProvider>
    );
}
