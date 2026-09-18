import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000/api/movies';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load movies');
        return response.json();
      })
      .then(setMovies)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="container">
      <header><h1>Movie Catalog</h1><p>Movies delivered by the Flask API.</p></header>
      {error && <p role="alert">{error}</p>}
      {!error && movies.length === 0 && <p>Loading movies…</p>}
      <section className="grid" aria-label="Movie list">
        {movies.map((movie) => (
          <article className="card" key={movie.id}>
            <h2>{movie.title}</h2><p>{movie.genre}</p><span>{movie.year}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
