import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FavoriteButton from './FavoriteButton';

const ArticleCard = ({ article }) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('ArticleDetail', { article });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image+Available';

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} testID="article-card">
      <Image
        source={{ uri: article.urlToImage || defaultImage }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.source}>{article.source?.name || 'Unknown source'}</Text>
        <Text style={styles.title} numberOfLines={2} testID="article-title">
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description || 'No description available'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          <FavoriteButton article={article} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  contentContainer: {
    padding: 16,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default ArticleCard;