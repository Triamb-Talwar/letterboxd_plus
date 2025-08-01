// src/pages/AllMediaPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaSearchBar from '../components/MediaSearchBar';
import MediaGrid from '../components/MediaGrid';
import { searchMedia } from '../utils/mediaFetcher';
import { saveItem as addToList } from '../utils/addToList';

const AllMediaPage = () => {
  const [results, setResults] = useState([]);
  const [setMediaType] = useState('Movies');
  const navigate = useNavigate();

  const handleSearch = async (type, query) => {
    setMediaType(type);
    const media = await searchMedia(type, query);
    setResults(media);
  };

  const handleAdd = (item, listName) => {
    addToList(listName, item);
    alert(`${item.title} added to ${listName}!`);
  };

  return (
    <div className="app">
      <h2>Search & Add Media</h2>

      {/* Navigation buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/create-list')} style={{ marginRight: '10px' }}>
          Create New List
        </button>
        <button onClick={() => navigate('/custom-lists')}>
          View My Lists
        </button>
      </div>

      <MediaSearchBar onSearch={handleSearch} />
      <MediaGrid items={results} onAdd={handleAdd} />
    </div>
  );
};

export default AllMediaPage;
