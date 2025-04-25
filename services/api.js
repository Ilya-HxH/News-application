const API_KEY = 'fde04e0e197f4a0096affceeff581289';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country = 'us', category = 'technology', page = 1) => {
    try {
        const response = await fetch(
            `${BASE_URL}/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        return await response.json();
    }   catch (error) {
        console.error('Error fetching top headlines:', error);
        throw error;
    }
};

export const searchArticles = async (query, page = 1) => {
    try {
        const response = await fetch(
            `${BASE_URL}/everything?q=${query}&page=${page}&apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to search articles');
        }

        return await response.json();
    }   catch (error) {
        console.error('Error searching articless: ', error);
        throw error;
    }
};

export const fetchBySource = async (source, page = 1) => {
    try {
        const response = await fetch(
            `${BASE_URL}/everything?sources=${source}&page=${page}&apiKey=${API_KEY}`
        );

        if (!response.ok){
            throw new Error('Failed to fetch articles by source');
        }

        return await response.json();
    }   catch (error) {
        console.error('Error fetching articles by source:', error);
        throw error;
    }
};