import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesScreen = () => {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState 
        message="You haven't added any articles to favorites yet." 
      />
    );
  }

  return (
    <View style={styles.container} testID="favorites-screen">
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <ArticleCard article={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 16,
  },
});

export default FavoritesScreen;