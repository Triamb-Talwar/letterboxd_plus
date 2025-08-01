// src/components/MediaGrid.js

import React from 'react';
import MediaItemCard from './MediaItemCard';
import '../styles/MediaGrid.css';

const MediaGrid = ({ items, onAdd }) => {
  return (
    <div className="book-list">
      {items.map(item => (
        <MediaItemCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default MediaGrid;
