// Games.js
import React, { useState } from 'react';
import axios from 'axios';
import AddToListButton from '../components/AddToListButton'; // ✅ import button

const Games = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);

  const searchGames = async () => {
    try {
      const apiKey = process.env.REACT_APP_RAWG_API_KEY;
      const res = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          key: apiKey,
          search: query
        }
      });
      setGames(res.data.results);
    } catch (err) {
      console.error('Game Search Failed:', err);
      alert('Game search failed!');
    }
  };

  return (
    <div className="app">
      <h1>🎮 Game Tracker</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search games..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchGames}>Search</button>
      </div>

      <div className="book-list">
        {games.map((game) => (
          <div key={game.id} className="book-card">
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <h3>{game.name}</h3>
            <p><strong>Rating:</strong> {game.rating}</p>

            {/* ✅ Add to My List button */}
            <AddToListButton type="Games" item={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
