import React, { useState } from 'react';
import axios from 'axios';
import AddToListButton from '../components/AddToListButton';

const Shows = () => {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);

  const searchShows = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      setShows(res.data);
    } catch (err) {
      console.error('TV show search failed:', err);
      alert('TV show search failed!');
    }
  };

  return (
    <div className="app">
      <h2>📺 TV Show Search</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchShows}>Search</button>
      </div>

      <div className="book-list">
        {shows.map(({ show }) => (
          <div className="book-card" key={show.id}>
            {show.image?.medium ? (
              <img src={show.image.medium} alt={show.name} />
            ) : (
              <div className="no-cover">No Poster</div>
            )}
            <h3>{show.name}</h3>
            <p><strong>Language:</strong> {show.language || 'N/A'}</p>
            <p><strong>Premiered:</strong> {show.premiered?.slice(0, 4) || 'N/A'}</p>
            <AddToListButton type="Shows" item={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
