// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './MovieDetails/Cast';
import Reviews from './MovieDetails/Reviews';
import MovieList from './Home/MovieList';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/movies/:movieId/cast" element={<Cast />} />
        <Route path="/movies/:movieId/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
};

export default App;
