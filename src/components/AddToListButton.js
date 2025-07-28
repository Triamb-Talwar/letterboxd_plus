// src/components/AddToListButton.js
import React, { useState, useEffect } from 'react';
import { isItemSaved, saveItem, removeItem } from '../utils/addToList';

function AddToListButton({ type, item }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isItemSaved(type, item.id));
  }, [type, item.id]);

  const toggleSave = () => {
    if (isSaved) {
      removeItem(type, item.id);
    } else {
      saveItem(type, item);
    }
    setIsSaved(!isSaved);
  };

  return (
    <button onClick={toggleSave} className="add-to-list-btn">
      {isSaved ? '✅ Added' : '➕ Add to List'}
    </button>
  );
}

export default AddToListButton;
