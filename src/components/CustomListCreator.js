import React, { useState, useEffect } from 'react';
import { getSavedItems } from '../utils/addToList';
import { saveCustomList } from '../utils/customLists';

const CustomListCreator = () => {
  const [listName, setListName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const allTypes = ['Movies', 'Books', 'Games', 'Shows'];
    const allItems = allTypes.flatMap(type =>
      getSavedItems(type).map(item => ({ ...item, type }))
    );
    setItems(allItems);
  }, []);

  const toggleItem = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!listName.trim()) {
      alert('Please enter a list name.');
      return;
    }

    const selectedItems = items.filter(item => selectedIds.includes(item.id));
    saveCustomList(listName, selectedItems);
    alert('List saved!');
    setListName('');
    setSelectedIds([]);
  };

  return (
    <div className="app">
      <h2>Create Custom List</h2>
      <input
        type="text"
        placeholder="List name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <div className="book-list">
        {items.map(item => (
          <div
            key={`${item.id}-${item.type}`}
            className={`book-card ${selectedIds.includes(item.id) ? 'selected' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <img src={item.image} alt={item.title} className="media-image" />
            <h3>{item.title}</h3>
            <p className="media-type">{item.type}</p>
          </div>
        ))}
      </div>

      <button onClick={handleCreate}>Create List</button>
    </div>
  );
};

export default CustomListCreator;
