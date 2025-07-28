import React, { useState } from 'react';
import AddToListButton from '../components/AddToListButton';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(data.docs.slice(0, 10));
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>📚 Book Tracker</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="book-list">
        {books.map(book => (
          <div className="book-card" key={book.key}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author_name?.join(', ')}</p>
            <p><strong>First Published:</strong> {book.first_publish_year || 'N/A'}</p>
            <AddToListButton type="Books" item={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
