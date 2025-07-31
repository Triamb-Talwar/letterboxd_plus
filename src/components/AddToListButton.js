// src/components/AddToListButton.js

import React, { useState, useEffect } from 'react';
import { isItemSaved, saveItem, removeItem } from '../utils/addToList';

const AddToListButton = ({ type, item, onChange }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isItemSaved(type, item.id));
  }, [type, item.id]);

  const handleClick = () => {
    if (isSaved) {
      removeItem(type, item.id);
    } else {
      saveItem(type, item);
    }
    setIsSaved(!isSaved);
    if (onChange) onChange(); // Notify parent to re-render list
  };

  return (
    <button onClick={handleClick}>
      {isSaved ? '✓ Added' : '➕ Add to List'}
    </button>
  );
};

export default AddToListButton;
