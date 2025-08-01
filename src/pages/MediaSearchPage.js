import React, { useState } from 'react';
import { searchMedia } from '../utils/mediaFetcher';
import MediaItemCard from '../components/MediaItemCard';
import { saveItem } from '../utils/addToList';

const MediaSearchPage = () => {
  const [type, setType] = useState('Movies');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const data = await searchMedia(type, query);
    setResults(data);
  };

  const handleSave = (item) => {
    saveItem(type, item);
    alert(`${item.title} saved to ${type}!`);
  };

  return (
    <div className="app">
      <h2>Search Media</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Movies</option>
        <option>Books</option>
        <option>Games</option>
        <option>Shows</option>
      </select>

      <input
        type="text"
        placeholder={`Search ${type}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="book-list">
        {results.map((item) => (
          <MediaItemCard key={item.id} item={item}>
            <button onClick={() => handleSave(item)}>Save</button>
          </MediaItemCard>
        ))}
      </div>
    </div>
  );
};

export default MediaSearchPage;
