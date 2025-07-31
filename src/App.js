import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from './components/Books';
import Games from './components/Games';
import Movies from './components/Movies';
import Shows from './components/Shows';
import MyList from './components/MyList';
import CustomListCreator from './components/CustomListCreator';
import CustomListViewer from './components/CustomListViewer';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Books</Link> | <Link to="/games">Games</Link>| <Link to="/movies">Movies</Link>| <Link to="/shows">TV Shows</Link>| <Link to="/mylist">My List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/games" element={<Games />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/create-list" element={<CustomListCreator />} />
          <Route path="/view-lists" element={<CustomListViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
