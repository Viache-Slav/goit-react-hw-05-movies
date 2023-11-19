// src/components/MovieDetails/Cast.js
import React, { useEffect, useState } from 'react';

const Cast = ({ movieId }) => {
    const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
        try {
            if (!movieId) {
              console.log('Waiting for movieId in Cast...');
              return;
            }

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fe36e1a920a96782eff1e1dab760f0ae&language=en-US`
            );
            const data = await response.json();
            setCast(data.cast);
            console.log('Cast:', data);
        } catch (error) {
            console.error('Error fetching movie credits:', error);
        }
        };

        fetchMovieCredits();
    }, [movieId]);

  if (!cast || cast.length === 0) {
    return <div>No cast information available.</div>;
  }

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
