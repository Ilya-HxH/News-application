import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArticleCard from '../ArticleCard';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from '../../contexts/FavoritesContext';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('ArticleCard Component', () => {
  const mockArticle = {
    source: { id: 'test-source', name: 'Test Source' },
    author: 'Test Author',
    title: 'Test Article Title',
    description: 'This is a test article description',
    url: 'https://example.com/test-article',
    urlToImage: 'https://example.com/test-image.jpg',
    publishedAt: '2025-04-20T12:30:45Z',
    content: 'Test article content'
  };

  const renderComponent = (article = mockArticle) => {
    return render(
      <NavigationContainer>
        <FavoritesProvider>
          <ArticleCard article={article} />
        </FavoritesProvider>
      </NavigationContainer>
    );
  };

  it('renders article correctly', () => {
    const { getByText, getByTestId } = renderComponent();

    expect(getByTestId('article-title')).toBeTruthy();
    expect(getByText('Test Article Title')).toBeTruthy();
    expect(getByText('Test Source')).toBeTruthy();
    expect(getByText('This is a test article description')).toBeTruthy();
  });

  it('formats the date correctly', () => {
    const { getByText } = renderComponent();
    
    const dateText = getByText(/Apr 20, 2025/i);
    expect(dateText).toBeTruthy();
  });

  it('handles missing article data gracefully', () => {
    const incompleteArticle = {
      title: 'Just a title',
      url: 'https://example.com/minimal-article'
    };
    
    const { getByText } = renderComponent(incompleteArticle);
    
    expect(getByText('Just a title')).toBeTruthy();
    expect(getByText('Unknown source')).toBeTruthy();
    expect(getByText('No description available')).toBeTruthy();
    expect(getByText('Unknown date')).toBeTruthy();
  });

  it('navigates to article detail when pressed', () => {
    const { getByTestId } = renderComponent();
    
    const mockNavigate = require('@react-navigation/native').useNavigation().navigate;
    

    fireEvent.press(getByTestId('article-card'));
    

    expect(mockNavigate).toHaveBeenCalledWith('ArticleDetail', { article: mockArticle });
  });
});