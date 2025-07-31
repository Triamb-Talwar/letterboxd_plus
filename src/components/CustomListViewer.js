import React, { useState, useEffect } from 'react';
import { getAllCustomLists } from '../utils/customLists';

const CustomListViewer = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(getAllCustomLists());
  }, []);

  return (
    <div className="app">
      <h2>📂 Your Custom Lists</h2>
      {lists.length === 0 ? (
        <p>No lists created yet.</p>
      ) : (
        lists.map(list => (
          <div key={list.listName} className="custom-list-block">
            <h3>{list.listName} ({list.type})</h3>
            <div className="book-list">
              {list.items.map(item => (
                <div key={item.id} className="book-card">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="media-image" />
                  ) : (
                    <div className="no-cover">No Cover</div>
                  )}
                  <h4>{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomListViewer;
