// src/components/MovieDetails/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!movieId) {
          console.log('Waiting for movieId...');
          return;
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=fe36e1a920a96782eff1e1dab760f0ae&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
        console.log('Movie Details:', data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      <p>Rating: {movieDetails.vote_average}</p>
      <p>Release Date: {movieDetails.release_date}</p>

      <Link to={`/movies/${movieId}/cast`}>Cast</Link>
      <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>

      <Cast movieId={movieId} />
      <Reviews movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
