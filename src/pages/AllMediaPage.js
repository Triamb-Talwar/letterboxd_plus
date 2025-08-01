// src/pages/AllMediaPage.js

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MediaGrid from '../components/MediaGrid';
import { saveItem as addToList } from '../utils/addToList';
import '../styles/AllMediaPage.css';

const AllMediaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || [];

  const handleAdd = (item, listName) => {
    addToList(listName, item);
    alert(`${item.title} added to ${listName}!`);
  };

  return (
    <div className="app">
      <h2>Search & Add Media</h2>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/create-list')} style={{ marginRight: '10px' }}>
          Create New List
        </button>
        <button onClick={() => navigate('/custom-lists')}>
          View My Lists
        </button>
      </div>

      <MediaGrid items={results} onAdd={handleAdd} />
    </div>
  );
};

export default AllMediaPage;
