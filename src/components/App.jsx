// Modul App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from 'components/Home/Home';
import { StyledLink, Nav } from './App.styled';

// Leniwe ładowanie komponentów za pomocą funkcji lazy
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

// Główny komponent aplikacji
export const App = () => {
  return (
    <>
      {/* Blok nawigacyjny */}
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </Nav>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Trasy komponentow */}
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};