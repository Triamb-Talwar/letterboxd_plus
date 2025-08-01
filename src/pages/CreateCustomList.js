import React, { useState } from 'react';
import { searchMedia } from '../utils/mediaFetcher';

const CreateCustomList = () => {
  const [listName, setListName] = useState('');
  const [mediaType, setMediaType] = useState('Movies');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = async () => {
    const data = await searchMedia(mediaType, query);
    setResults(data);
  };

  const handleAdd = (item) => {
    setSelectedItems((prev) => [...prev, { ...item, type: mediaType }]);
  };

  const handleSave = () => {
    if (!listName.trim()) return alert('List name required.');

    const savedLists = JSON.parse(localStorage.getItem('customLists') || '{}');
    savedLists[listName] = selectedItems;
    localStorage.setItem('customLists', JSON.stringify(savedLists));

    alert(`Saved list "${listName}" with ${selectedItems.length} item(s).`);
    setListName('');
    setSelectedItems([]);
    setResults([]);
    setQuery('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a Custom List</h2>

      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div>
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option>Movies</option>
          <option>Shows</option>
          <option>Books</option>
          <option>Games</option>
        </select>

        <input
          type="text"
          placeholder={`Search ${mediaType}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '150px',
              textAlign: 'center',
            }}
          >
            {item.image ? (
              <img src={item.image} alt={item.title} style={{ width: '100%' }} />
            ) : (
              <div>No Image</div>
            )}
            <h4 style={{ fontSize: '14px' }}>{item.title}</h4>
            <button onClick={() => handleAdd(item)}>Add</button>
          </div>
        ))}
      </div>

      <hr />

      <h3>Items in List</h3>
      <ul>
        {selectedItems.map((item, idx) => (
          <li key={`${item.id}-${idx}`}>
            {item.title} ({item.type})
          </li>
        ))}
      </ul>

      <button onClick={handleSave} disabled={!selectedItems.length}>
        Save List
      </button>
    </div>
  );
};

export default CreateCustomList;
