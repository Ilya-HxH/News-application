import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Share 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FavoriteButton from '../components/FavoriteButton';

const ArticleDetailScreen = ({ route, navigation }) => {
  const { article } = route.params;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title} - ${article.url}`,
        url: article.url,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const handleOpenLink = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <FavoriteButton article={article} />
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, article]);

  const defaultImage = 'https://via.placeholder.com/800x400?text=No+Image+Available';

  return (
    <ScrollView style={styles.container} testID="article-detail-screen">
      <Image
        source={{ uri: article.urlToImage || defaultImage }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.source}>
          {article.source?.name || 'Unknown source'} • {formatDate(article.publishedAt)}
        </Text>
        
        <Text style={styles.title}>{article.title}</Text>
        
        {article.author && (
          <Text style={styles.author}>By {article.author}</Text>
        )}
        
        <Text style={styles.content}>
          {article.content || article.description || 'No content available'}
        </Text>
        
        <TouchableOpacity style={styles.readMoreButton} onPress={handleOpenLink}>
          <Text style={styles.readMoreText}>Read full article</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" style={styles.readMoreIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerButton: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  source: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    lineHeight: 32,
  },
  author: {
    fontSize: 16,
    color: '#444',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  readMoreButton: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  readMoreIcon: {
    marginLeft: 8,
  },
});

export default ArticleDetailScreen;