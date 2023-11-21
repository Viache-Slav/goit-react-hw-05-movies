// Modul searchApi.jsx
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

// Funkcja do pobierania aktualnie popularnych filmów (trending)
export const getTrending = async () => {
  // Wywołanie metody GET z wykorzystaniem axios
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day',
    {
      // Dodanie parametru api_key do zapytania
      params: {
        api_key: API_KEY,
      },
    }
  );
  // Zwrócenie danych z odpowiedzi
  return response.data.results;
};

// Funkcja do pobierania recenzji filmu na podstawie jego identyfikatora
export const getReviews = async movieId => {
  const reviews = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return reviews.data.results;
};

// Funkcja do pobierania szczegółowych informacji o filmie na podstawie jego identyfikatora
export const getDetails = async movieId => {
  const movieDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return movieDetails.data;
};

// Funkcja do pobierania informacji o obsadzie filmu na podstawie jego identyfikatora
export const getCast = async movieId => {
  const cast = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return cast.data.cast;
};

// Funkcja do wyszukiwania filmów na podstawie zadanego zapytania
export const searchMovies = async query => {
  const search = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
  return search.data.results;
};