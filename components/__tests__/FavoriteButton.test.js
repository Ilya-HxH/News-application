import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import FavoriteButton from '../FavoriteButton';
import { FavoritesProvider, useFavorites } from '../../contexts/FavoritesContext';

jest.mock('../../contexts/FavoritesContext', () => {
  const originalModule = jest.requireActual('../../contexts/FavoritesContext');
  
  return {
    ...originalModule,
    useFavorites: jest.fn(),
  };
});

describe('FavoriteButton Component', () => {
  const mockArticle = {
    title: 'Test Article',
    url: 'https://example.com/test',
  };

  const mockFavoritesContext = {
    isFavorite: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    useFavorites.mockReturnValue(mockFavoritesContext);
  });

  it('renders heart outline when article is not a favorite', () => {
    const { getByTestId } = render(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );
    
    expect(getByTestId('heart-outline')).toBeTruthy();
  });

  it('renders filled heart when article is a favorite', () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true);
    
    const { getByTestId } = render(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );
    
    expect(getByTestId('heart-filled')).toBeTruthy();
  });

  it('calls addFavorite when button is pressed and article is not a favorite', async () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    const { getByTestId } = render(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );
    
    await act(async () => {
      fireEvent.press(getByTestId('favorite-button'));
    });
    
    expect(mockFavoritesContext.addFavorite).toHaveBeenCalledWith(mockArticle);
    expect(mockFavoritesContext.removeFavorite).not.toHaveBeenCalled();
  });

  it('calls removeFavorite when button is pressed and article is a favorite', async () => {
    mockFavoritesContext.isFavorite.mockReturnValue(true);
    
    const { getByTestId } = render(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );
    
    await act(async () => {
      fireEvent.press(getByTestId('favorite-button'));
    });
    
    expect(mockFavoritesContext.removeFavorite).toHaveBeenCalledWith(mockArticle.url);
    expect(mockFavoritesContext.addFavorite).not.toHaveBeenCalled();
  });

  it('changes icon after toggling favorite status', async () => {
    mockFavoritesContext.isFavorite.mockReturnValue(false);
    
    const { getByTestId, rerender } = render(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );
    
    expect(getByTestId('heart-outline')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('favorite-button'));
    });

    mockFavoritesContext.isFavorite.mockReturnValue(true);

    rerender(
      <FavoritesProvider>
        <FavoriteButton article={mockArticle} />
      </FavoritesProvider>
    );

    expect(getByTestId('heart-filled')).toBeTruthy();
  });
});