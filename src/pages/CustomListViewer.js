import React, { useState, useEffect } from 'react';
import { getReview, getRating, saveReview, saveRating } from '../utils/reviews';
import { searchMedia } from '../utils/mediaFetcher';
import { auth } from '../firebase';
import {
  saveCustomList,
  deleteCustomList,
  getCustomLists,
} from '../utils/firebaseUtils';

const CustomListViewer = () => {
  const [savedLists, setSavedLists] = useState({});
  const [selectedList, setSelectedList] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [reviewInputs, setReviewInputs] = useState({});
  const [ratingInputs, setRatingInputs] = useState({});

  // NEW states to cache loaded reviews and ratings
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('Movies');
  const [searchResults, setSearchResults] = useState([]);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const loadLists = async () => {
      const localLists = JSON.parse(localStorage.getItem('customLists') || '{}');
      setSavedLists(localLists);

      if (uid) {
        try {
          const cloudLists = await getCustomLists(uid);
          const merged = { ...localLists };
          cloudLists.forEach((list) => {
            merged[list.name] = list.items || [];
          });
          setSavedLists(merged);
          localStorage.setItem('customLists', JSON.stringify(merged));
        } catch (e) {
          console.error('Failed to load lists from Firestore:', e);
        }
      }
    };
    loadLists();
  }, [uid]);

  // NEW: load reviews & ratings when selectedList or savedLists change
  useEffect(() => {
    if (!selectedList) return;

    const fetchReviewsRatings = async () => {
      const items = savedLists[selectedList] || [];
      const revs = {};
      const rats = {};

      for (const item of items) {
        revs[item.id] = await getReview(item.id);
        rats[item.id] = await getRating(item.id);
      }

      setReviews(revs);
      setRatings(rats);
    };

    fetchReviewsRatings();
  }, [selectedList, savedLists]);

  const persistList = async (name, items) => {
    const updated = {
      ...savedLists,
      [name]: items
    };
    setSavedLists(updated);
    localStorage.setItem('customLists', JSON.stringify(updated));
    if (uid) {
      try {
        await saveCustomList(uid, name.toLowerCase().replace(/\s+/g, '-'), {
          name,
          items,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to save list to Firestore:', err);
      }
    }
  };

  const handleSelectList = (listName) => {
    setSelectedList(listName);
    setEditingItemId(null);
  };

  const handleDelete = async (listName) => {
    if (!window.confirm(`Delete list "${listName}"?`)) return;
    const updated = { ...savedLists };
    delete updated[listName];
    setSavedLists(updated);
    localStorage.setItem('customLists', JSON.stringify(updated));
    if (selectedList === listName) setSelectedList(null);

    if (uid) {
      try {
        const listId = listName.toLowerCase().replace(/\s+/g, '-');
        await deleteCustomList(uid, listId);
      } catch (err) {
        console.error('Failed to delete list from Firestore:', err);
      }
    }
  };

  const handleEdit = (itemId) => {
    setEditingItemId(itemId);
    setReviewInputs({ ...reviewInputs, [itemId]: reviews[itemId] || '' });
    setRatingInputs({ ...ratingInputs, [itemId]: ratings[itemId] || 0 });
  };

  const handleSave = async (itemId) => {
    await saveReview(itemId, reviewInputs[itemId]);
    await saveRating(itemId, ratingInputs[itemId]);
    setEditingItemId(null);

    // Update local cached reviews and ratings after save
    setReviews((prev) => ({ ...prev, [itemId]: reviewInputs[itemId] }));
    setRatings((prev) => ({ ...prev, [itemId]: ratingInputs[itemId] }));
  };

  const handleSearch = async () => {
    const results = await searchMedia(mediaType, searchQuery);
    setSearchResults(results);
  };

  const handleAddToList = (item) => {
    const updatedItems = [...(savedLists[selectedList] || []), {
      id: item.id,
      title: item.title,
      image: item.image || null,
      type: mediaType,
    }];
    persistList(selectedList, updatedItems);
  };

  const handleRemoveFromList = (id) => {
    const updatedItems = savedLists[selectedList].filter((i) => i.id !== id);
    persistList(selectedList, updatedItems);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Custom Lists</h2>

      {Object.keys(savedLists).length === 0 ? (
        <p>No custom lists found.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.keys(savedLists).map((name) => (
              <div
                key={name}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  cursor: 'pointer',
                  background: selectedList === name ? '#f0f0f0' : 'white',
                }}
                onClick={() => handleSelectList(name)}
              >
                <strong>{name}</strong>
                <br />
                <small>{savedLists[name]?.length || 0} items</small>
                <br />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(name);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {selectedList && (
            <>
              <hr />
              <h3>Items in "{selectedList}"</h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {savedLists[selectedList]?.map((item) => {
                  const currentReview = reviews[item.id];
                  const currentRating = ratings[item.id];

                  return (
                    <div
                      key={item.id}
                      style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        width: '200px',
                        background: '#fafafa',
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%' }} />
                      ) : (
                        <div>No Image</div>
                      )}

                      <div style={{ fontSize: '14px', marginTop: '5px' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: 'gray' }}>{item.type}</div>

                      {editingItemId === item.id ? (
                        <>
                          <textarea
                            rows="3"
                            style={{ width: '100%', marginTop: '5px' }}
                            value={reviewInputs[item.id]}
                            onChange={(e) =>
                              setReviewInputs({ ...reviewInputs, [item.id]: e.target.value })
                            }
                          />
                          <div>
                            Rating:{' '}
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                style={{
                                  cursor: 'pointer',
                                  color: ratingInputs[item.id] >= star ? 'gold' : '#ccc',
                                }}
                                onClick={() =>
                                  setRatingInputs({ ...ratingInputs, [item.id]: star })
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <button onClick={() => handleSave(item.id)}>Save</button>
                        </>
                      ) : (
                        <>
                          <p><strong>Review:</strong> {currentReview || 'No review'}</p>
                          <p><strong>Rating:</strong> {renderStars(currentRating || 0)}</p>
                          <button onClick={() => handleEdit(item.id)}>Edit Review</button>
                        </>
                      )}

                      <button
                        onClick={() => handleRemoveFromList(item.id)}
                        style={{ marginTop: '5px', background: '#ffd4d4' }}
                      >
                        Remove from this list
                      </button>
                    </div>
                  );
                })}
              </div>

              <hr />
              <h3>Add or Remove Media</h3>

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ margin: '0 10px' }}
                />
                <button onClick={handleSearch}>Search</button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                {searchResults.map((item) => {
                  const alreadyInList = savedLists[selectedList]?.some((x) => x.id === item.id);
                  return (
                    <div
                      key={item.id}
                      style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        width: '150px',
                        textAlign: 'center',
                        backgroundColor: alreadyInList ? '#eaffea' : '#fff',
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%' }} />
                      ) : (
                        <div>No Image</div>
                      )}
                      <h4 style={{ fontSize: '14px' }}>{item.title}</h4>
                      {alreadyInList ? (
                        <button onClick={() => handleRemoveFromList(item.id)}>Remove</button>
                      ) : (
                        <button onClick={() => handleAddToList(item)}>Add</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomListViewer;
