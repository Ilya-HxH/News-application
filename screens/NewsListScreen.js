import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import useFetch from '../hooks/useFetch';
import { fetchTopHeadlines, searchArticles } from '../services/api';

const NewsListScreen = () => {
    const [category, setCategory] = useState('technology');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fetchFunction = async () => {
        if (isSearching && searchQuery.trim()) {
            return searchArticles(searchQuery);
        } else {
            return fetchTopHeadlines('us', category);
        }
    };

    const { data, loading, error, refreshing, handleRefresh } = useFetch(
        fetchFunction,
        [category, isSearching, searchQuery]
    );

    const articles = data?.articles || [];

    const clearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    };

    const categories = [
        'technology',
        'business',
        'health',
        'science',
        'sports',
        'entertainment'
    ];

    const renderCategoryButtons = () => {
        return (
            <View style={styles.categoriesContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryButton,
                                category === item && styles.activeCategoryButton
                            ]}
                            onPress={() => {
                                setCategory(item);
                                setIsSearching(false);
                            }}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === item && styles.activeCategoryText
                                ]}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    const renderSearchBar = () => {
        return (
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search news..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                    disabled={!searchQuery.trim()}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setIsSearching(true);
        }
    };

    if (loading && !refreshing) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={handleRefresh} />;
    }

    return (
        <View style={styles.searchContainer}>
            {renderSearchBar()}

            {!isSearching && renderCategoryButtons()}

            {isSearching && (
                <View style={styles.searchInfo}>
                    <Text style={styles.searchInfoText}>
                        Results for: "{searchQuery}"
                    </Text>
                    <TouchableOpacity onPress={clearSearch}>
                        <Text style={styles.clearSearch}>Clear</Text>
                    </TouchableOpacity>
                </View>
            )}

            {articles.length === 0 ? (
                <EmptyState
                    message={
                        isSearching
                            ? `No results found for "${searchQuery}"`
                            : `No articles available in ${category}`
                    }
                />
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.url}
                    renderItem={({ item }) => <ArticleCard article={item} />}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    searchContainer: {
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 4,
    },
    searchButton: {
        backgroundColor: '#0066cc',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // Добавляет тень
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    categoriesContainer: {
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 8,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCategoryButton: {
        backgroundColor: '#0066cc',
    },
    categoryText: {
        fontSize: 14,
        color: '#666',
    },
    activeCategoryText: {
        color: '#fff',
    },
    searchInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchInfoText: {
        fontSize: 14,
        color: '#666',
    },
    clearSearch: {
        fontSize: 14,
        color: '#0066cc',
        fontWeight: 'bold',
    },
    listContent: {
        padding: 16,
    },
    listItem: {
        marginBottom: 10,
    },
});


export default NewsListScreen;