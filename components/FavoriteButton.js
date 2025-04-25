import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoriteButton = ({ article, size = 24 }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

    useEffect(() => {
        setIsCurrentFavorite(isFavorite(article.url));
    }, [article, isFavorite]);

    const toggleFavorite = async () => {
        if (isCurrentFavorite) {
            await removeFavorite(article.url);
        } else {
            await addFavorite(article);
        }
        setIsCurrentFavorite(!isCurrentFavorite);
    };

    return (
        <TouchableOpacity style={StyleSheet.button} onPress={toggleFavorite} testID="favorite-button">
            <Ionicons
                name={isCurrentFavorite ? 'heart'  : 'heart-outline'}
                size={size}
                color={isCurrentFavorite ? '#ff0000' : '#000000'}
                testID={isCurrentFavorite ? "heart-filled" : "heart-outline"}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
});

export default FavoriteButton;