// Modul Rewiews.jsx 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import funkcji getReviews z modułu searchApi oraz AuthorStyle z pliku stylów
import { getReviews } from 'consts/searchApi';
import { AuthorStyle } from './Reviews.styled';

const Reviews = () => {
  // Pobranie identyfikatora filmu z parametrów adresu
  const { movieId } = useParams();
  // Stan komponentu do przechowywania danych o recenzjach
  const [reviews, setReviews] = useState([]);

  // Efekt useEffect wywoływany po zamontowaniu komponentu, pobiera recenzje dla danego filmu
  useEffect(() => {
    // Funkcja asynchroniczna do pobierania recenzji
    const asyncFunc = async () => {
      try {
        // Ustawienie stanu reviews za pomocą funkcji getReviews z identyfikatorem filmu
        setReviews(await getReviews(movieId));
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [movieId]); // Zależność useEffect od zmiany identyfikatora filmu

  return (
    <ul>
    {/* Warunek sprawdzający czy są dostępne recenzje dla filmu */}
      {reviews.length === 0 ? (
        // Komunikat w przypadku braku recenzji
        <li style={{ listStyle: 'none' }}>
          We don't have any reviews for this movie
        </li>
      ) : (
        // Mapowanie recenzji i renderowanie komponentów dla każdej recenzji
        reviews.map(review => (
          <li key={review.id}>
          {/* Wykorzystanie stylizowanego komponentu dla autora recenzji */}
            <AuthorStyle>Author: {review.author}</AuthorStyle>
            {/* Wyświetlenie treści recenzji */}
            <p>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Reviews;