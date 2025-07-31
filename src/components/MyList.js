import React, { useState, useEffect } from 'react';
import { getSavedItems } from '../utils/addToList';
import AddToListButton from './AddToListButton';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-dom';

const MyList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allTypes = ['Movies', 'Books', 'Games', 'Shows'];
    const allItems = allTypes.flatMap(type =>
      getSavedItems(type).map(item => {
        const fullItem = { ...item, type };
        return fullItem;
      })
    );
    setItems(allItems);
  }, []);

  return (
    <div className="app">
      <h1>🎬📚🎮📺 My List</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/create-list')}>➕ Create Custom List</button>
        <button onClick={() => navigate('/view-lists')} style={{ marginLeft: '10px' }}>
          📂 View My Lists
        </button>
      </div>

      <div className="book-list">
        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          items.map(item => (
            <div key={`${item.type}-${item.id}`} className="book-card">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="media-image"
                />
              ) : (
                <div className="no-cover">No Cover</div>
              )}
              <h3>{item.title}</h3>
              <p>
                <strong>Rating:</strong>{' '}
                {typeof item.rating === 'number' || typeof item.rating === 'string'
                  ? item.rating
                  : item.rating?.average ?? 'N/A'}
              </p>
              <AddToListButton type={item.type} item={item} />
              <ReviewForm type={item.type} itemId={item.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyList;