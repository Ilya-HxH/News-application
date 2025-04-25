import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFavorites, saveFavorite, removeFavorite } from '../utils/storage';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await getFavorites();
                setFavorites(storedFavorites);
            }   catch (error) {
                console.error('Failed to load favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    const addFavorite = async (article) => {
        try {
            const success = await saveFavorite(article);
            if (success) {
                setFavorites(prevFavorites => [...prevFavorites, article]);
            }
            return success;
        }   catch (error) {
            console.error('Failed to add favorites:', error);
            return false;
        }
    };

    const removeFavoriteItem = async (articleUrl) => {
        try {
            const success = await removeFavorite(articleUrl);
            if (success) {
                setFavorites(prevFavorites => 
                    prevFavorites.filter(item => item.url !== articleUrl)
                );
            }
            return success;
        }   catch (error) {
            console.error('Failed to remove favorite:', error);
            return false;
        }
    };

    const isFavorite = (articleUrl) => {
        return favorites.some(item => item.url === articleUrl);
    };

    const value = {
        favorites,
        loading,
        addFavorite,
        removeFavoritE: removeFavoriteItem,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;