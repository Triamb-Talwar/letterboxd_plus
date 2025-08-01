// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>{' | '}
      <Link to="/custom-lists">Custom Lists</Link>{' | '}
      {user ? (
        <>
          <span style={{ marginLeft: '10px' }}>Welcome, {user.email}</span>
          <button onClick={() => { logout(); navigate('/'); }} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
          <Link to="/signup" style={{ marginLeft: '10px' }}>Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
