import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMedia } from '../utils/mediaFetcher';

const CreateCustomList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingList = location.state?.listName || null;

  const [listName, setListName] = useState('');
  const [mediaType, setMediaType] = useState('Movies');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // 🧠 On load: populate from existing list if editing
  useEffect(() => {
    if (editingList) {
      const savedLists = JSON.parse(localStorage.getItem('customLists') || '{}');
      const existingItems = savedLists[editingList] || [];
      setListName(editingList);
      setSelectedItems(existingItems);
    }
  }, [editingList]);

  const handleSearch = async () => {
    const data = await searchMedia(mediaType, query);
    setResults(data);
  };

  const handleAdd = (item) => {
    const exists = selectedItems.some(
      (x) => x.id === item.id && x.type === mediaType
    );
    if (exists) return;

    setSelectedItems((prev) => [
      ...prev,
      {
        id: item.id,
        title: item.title,
        image: item.image || null,
        type: mediaType,
      },
    ]);
  };

  const handleRemove = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (!listName.trim()) return alert('List name required.');
    if (!selectedItems.length) return alert('Add at least one item.');

    const savedLists = JSON.parse(localStorage.getItem('customLists') || '{}');
    savedLists[listName] = selectedItems; // ✅ Overwrite only this list
    localStorage.setItem('customLists', JSON.stringify(savedLists));

    alert(`List "${listName}" saved with ${selectedItems.length} item(s).`);
    navigate('/'); // ✅ Optional: go back to homepage or lists
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{editingList ? 'Edit' : 'Create'} a Custom List</h2>

      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        disabled={!!editingList} // Prevent renaming during edit
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
        {results.map((item) => {
          const alreadyAdded = selectedItems.some(
            (x) => x.id === item.id && x.type === mediaType
          );

          return (
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
              {alreadyAdded ? (
                <button disabled>Added</button>
              ) : (
                <button onClick={() => handleAdd(item)}>Add</button>
              )}
            </div>
          );
        })}
      </div>

      <hr />

      <h3>Items in List</h3>
      <ul>
        {selectedItems.map((item, idx) => (
          <li key={`${item.id}-${idx}`}>
            {item.title} ({item.type}){' '}
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSave}>Save List</button>
    </div>
  );
};

export default CreateCustomList;
