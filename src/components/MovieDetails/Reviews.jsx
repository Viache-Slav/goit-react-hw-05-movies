// src/components/MovieDetails/Reviews.js
import React, { useEffect, useState } from 'react';

const Reviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
            if (!movieId) {
            console.log('Waiting for movieId in Reviews...');
            return;
            }

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=fe36e1a920a96782eff1e1dab760f0ae&language=en-US&page=1`
            );
            const data = await response.json();
            setReviews(data.results);
            console.log('Reviews:', data);
        } catch (error) {
            console.error('Error fetching movie reviews:', error);
        }
  };

  fetchMovieReviews();
}, [movieId]);

if (!reviews || reviews.length === 0) {
  return <div>No reviews available.</div>;
}

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
