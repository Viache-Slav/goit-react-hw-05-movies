// Modul MovieDetails.jsx 
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getDetails } from 'consts/searchApi';
import { Button, MovieImage, Wrapper, Paragraph, } from './MovieDetails.styled';

const MovieDetails = () => {
  // Pobranie identyfikatora filmu z parametrów adresu URL
  const { movieId } = useParams();
  // Użycie stanu movieDetails i funkcji setMovieDetails do przechowywania danych o filmie
  const [movieDetails, setMovieDetails] = useState({});
  // Użycie stanu genres i funkcji setGenres do przechowywania informacji o gatunkach filmu
  const [genres, setGenres] = useState([]);
  // Użycie hooka useNavigate do nawigacji pomiędzy stronami
  let navigate = useNavigate();

  // Efekt useEffect wywoływany po zamontowaniu komponentu lub zmianie identyfikatora filmu
  useEffect(() => {
    // Funkcja asynchroniczna do pobierania szczegółowych danych o filmie
    const asyncFunc = async () => {
      try {
        // Wywołanie funkcji getDetails z identyfikatorem filmu
        const movieDetails = await getDetails(movieId);
        // Ustawienie stanu movieDetails za pomocą pobranych danych
        setMovieDetails(movieDetails);
        // Ustawienie stanu genres za pomocą gatunków filmu
        setGenres(movieDetails.genres);
      } catch (error) {
        // Obsługa błędów w przypadku nieudanego pobierania danych
        console.log('Error fetching movie details:', error);
      }
    };
    asyncFunc();
  }, [movieId]); // Zależność useEffect od zmiany identyfikatora filmu

  // Renderowanie komponentu MovieDetails
  return (
    <>
    {/* Przycisk powrotu do poprzedniej strony */}
      <Button onClick={() => navigate(-1)}>Go back</Button>
      {/* Warunek sprawdzający, czy dane o filmie zostały pobrane */}
      {movieDetails && (
        <>
        {/* Sekcja zawierająca szczegóły filmu */}
          <Wrapper>
            {/* Sekcja zawierająca obraz filmu */}
            <MovieImage>
              {/* Wyświetlenie obrazu filmu z dynamicznie generowanym adresem URL */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                alt={movieDetails?.title}
                width={250}
              />
            </MovieImage>
            {/* Sekcja zawierająca tytuł, ocenę, opis i gatunki filmu */}
            <div>
              <h2>{movieDetails?.title}</h2>
              <div>User score: {movieDetails?.vote_average}</div>
              <h3>Overview</h3>
              <p>{movieDetails?.overview}</p>
              <h4>Genres</h4>
              {/* Wyświetlenie gatunków filmu w formie paragrafów */}
              {genres.map(genre => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
          </Wrapper>
          {/* Dodatkowe informacje */}
          <Paragraph>Additional information</Paragraph>
          {/* Lista linków do stron Cast i Reviews z wykorzystaniem komponentu Link */}
          <ul>
            <li>
              {/* Link do strony z obsadą filmu */}
              <Link to="cast">Cast</Link>
            </li>
            <li>
              {/* Link do strony z recenzjami filmu */}
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          {/* Outlet do renderowania dzieci komponentu w zależności od aktualnej ścieżki */}
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;