import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import NewListScreen from '../screens/NewsListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = () => {
    return (
        <Stack.Navigator
            screenOptions = {{
                headerStyle: {
                    backgroundColor: '#f4f4f4',
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="NewsList"
                component = {NewListScreen}
                options={{ title: 'Latest News' }}
            />
            <Stack.Screen 
                name="ArticleDetail"
                component = {ArticleDetailScreen}
                options={{ title: 'Article' }}
            />
        </Stack.Navigator>
    );
};

const FavoriteStack = () => {
    return (
        <Stack.Navigator
            screenOptions = {{
                headerStyle: {
                    backgroundColor: '#f4f4f4',
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="FavoritesList"
                component = {FavoritesScreen}
                options={{ title: 'My Favorites' }}
            />
            <Stack.Screen 
                name="ArticleDetail"
                component = {ArticleDetailScreen}
                options={{ title: 'Article' }}
            />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'News') {
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                        }   else if (route.name === 'Favorites') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: '#0066cc',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
                >
                    <Tab.Screen name="News" component={NewsStack} />
                    <Tab.Screen name="Favorites" component={FavoriteStack} />
                </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;