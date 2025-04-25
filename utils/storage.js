import AsyncStorage from '@react-native-async-storage/async-storage';


const FAVORITES_KEY = '@news_app_favorites';

export const getFavorites = async () => {
    try {
        const favoritesJSON = await AsyncStorage.getItem(FAVORITES_KEY);
        return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    }   catch (error) {
        console.error('Error retrieving favorites:', error);
        return [];
    }
};

export const saveFavorite = async (article) => {
    try {
        const favorites = await getFavorites();

        const existingIndex = favorites.findIndex(item => item.url === article.url);

        if (existingIndex === -1) {
            const updatedFavorites = [...favorites, article];
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
            return true;
        }

        return false;
    }   catch (error) {
        console.error('Error saving favorite:', error);
        return false;
    }
};

export const removeFavorite = async (articleUrl) => {
    try {
        const favorites = await getFavorites();
        const updatedFavorites = favorites.filter(item => item.url !== articleUrl);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return true;
    }   catch (error) {
        console.error('Error removing favorite:', error);
        return false;
    }
};

export const checkIsFavorite = async (articleUrl) => {
    try {
        const favorites = await getFavorites();
        return favorites.some(item => item.url === articleUrl);
    }   catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }
};