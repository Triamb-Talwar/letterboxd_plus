import React, { useState } from 'react';
import AddToListButton from '../components/AddToListButton';

function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query.trim()) {
      console.log('[DEBUG] Empty query — skipping search.');
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
    console.log('[DEBUG] Search URL:', url);

    try {
      const res = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TMBD_ACESS_TOKEN}`,
        },
      });

      console.log('[DEBUG] Raw Response:', res);
      if (!res.ok) {
        console.error(`[ERROR] TMDb request failed with status ${res.status}: ${res.statusText}`);
        const errorText = await res.text();
        console.error('[ERROR] Response body:', errorText);
        alert(`Search failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log('[DEBUG] Parsed JSON data:', data);

      if (!Array.isArray(data.results)) {
        console.error('[ERROR] Unexpected response format. No "results" array found.');
        return;
      }

      const formatted = data.results.map((movie) => ({
        id: movie.id,
        imdbID: movie.id.toString(),
        Title: movie.title,
        Year: movie.release_date?.slice(0, 4),
        Poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      }));

      console.log('[DEBUG] Formatted movie data:', formatted);
      setMovies(formatted);
    } catch (err) {
      console.error('[ERROR] TMDb fetch threw an exception:', err);
      alert('Movie search failed due to a network error.');
    }
  };

  return (
    <div className="app">
      <h2>🎬 Movie Search</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="book-list">
        {movies.map((movie) => (
          <div className="book-card" key={movie.id}>
            {movie.Poster ? (
              <img src={movie.Poster} alt={movie.Title} className="media-image" />
            ) : (
              <div className="no-cover">No Poster</div>
            )}
            <h3>{movie.Title}</h3>
            <p><strong>Year:</strong> {movie.Year}</p>
            <AddToListButton type="Movies" item={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
