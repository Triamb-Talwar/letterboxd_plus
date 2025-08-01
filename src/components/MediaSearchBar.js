// src/components/MediaSearchBar.js
import React, { useState } from 'react';

const MediaSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Movies');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(type, query.trim());
    }
  };

  return (
    <div className="search-bar">
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Movies</option>
        <option>Books</option>
        <option>Games</option>
        <option>Shows</option>
      </select>
      <input
        type="text"
        placeholder="Search media..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default MediaSearchBar;
