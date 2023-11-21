// Modul Home.jsx 
import React, { useEffect, useState } from 'react';

import { getTrending } from 'consts/searchApi';
import { StyledLink } from './Home.styled';

export const Home = () => {
  // Użycie hooka useState do utworzenia stanu trendingMovies
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Użycie hooka useEffect do pobrania listy popularnych filmów po zamontowaniu komponentu
  useEffect(() => {
    // Wywołanie funkcji getTrending, która zwraca popularne filmy
    getTrending().then(trendingMovies => {
      // Ustawienie stanu trendingMovies za pomocą pobranej listy filmów
      setTrendingMovies(trendingMovies);
    });
  }, []); // Pusta zależność oznacza, że useEffect zostanie wykonany tylko raz po zamontowaniu komponentu

  // Renderowanie komponentu Home
  return (
    <>
    {/* Nagłówek informujący o aktualnych popularnych filmach */}
    <StyledLink to="/">
      <h2 className="trending-header">Trending today</h2>
    </StyledLink>
      {/* Warunek sprawdzający, czy istnieją popularne filmy */}
      {trendingMovies.map(movie => {
        // Destrukturyzacja obiektu filmu na title i id
        const { title, id } = movie;
        // Renderowanie komponentu StyledLink do nawigacji do strony szczegółów filmu
        return (
          <StyledLink to={`/movies/${id}`} key={id}>
            {title}
          </StyledLink>
        );
      })}
    </>
  );
};

