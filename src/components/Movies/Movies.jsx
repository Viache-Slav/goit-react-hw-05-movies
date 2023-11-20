// Modul Movies.jsx 
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// Import funkcji searchMovies z modułu searchApi oraz stylów z pliku Movies.styled
import { searchMovies } from 'consts/searchApi';
import { FormStyled, Input, Button } from './Movies.styled';

const Movies = () => {
  // Użycie hooka useSearchParams do obsługi parametrów zapytania w adresie URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Użycie stanu moviesList i funkcji setMoviesList do przechowywania danych o wyszukanych filmach
  const [moviesList, setMoviesList] = useState([]);
  // odczytujemy nazwę zapytania z parametru linku, a jeżeli jej nie ma to mamy pusty string
  const query = searchParams.get('query') ?? '';

  // Efekt useEffect wywoływany po zamontowaniu komponentu lub zmianie parametru zapytania
  useEffect(() => {
    // Funkcja asynchroniczna do wyszukiwania filmów
    const asyncFunc = async () => {
      try {
        // Ustawienie stanu moviesList za pomocą funkcji searchMovies z aktualną nazwą zapytania
        setMoviesList(await searchMovies(query));
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [query]); // Zależność useEffect od zmiany nazwy zapytania

   // Funkcja obsługująca submit formularza, ustawiająca nową nazwę zapytania i resetująca wartość pola input
   const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.query;
    setSearchParams({ query: input.value });
    input.value = '';
  };

  // Renderowanie formularza i listy filmów
  return (
    <>
    {/* Formularz do wyszukiwania filmów */}
      <FormStyled onSubmit={handleSubmit}>
        {/* atrybut name określa nazwę pola, atrybut defaultValue ustawia początkową wartość */}
        <Input type="text" name="query" defaultValue={query} required />
        <Button type="submit">Search</Button>
      </FormStyled>
      {/* Lista filmów wyświetlana jako linki do ich stron detali */}
      <ul>
        {moviesList.map(movie => (
          <li key={movie.id}>
            {/* Użycie komponentu Link do stworzenia linku do strony detali filmu */}
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;