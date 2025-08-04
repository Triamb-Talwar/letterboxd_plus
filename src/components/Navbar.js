// src/components/Navbar.js
import React, { useEffect, useState } from 'react'; // ✅ added useEffect/useState
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase'; // ✅ added
import { doc, getDoc } from 'firebase/firestore'; // ✅ added
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // ✅

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const ref = doc(db, 'users', user.uid);
          const snapshot = await getDoc(ref);
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.username) setUsername(data.username);
            else setUsername(null);
          }
        } catch (err) {
          console.error('Failed to fetch username:', err);
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
    };

    fetchUsername();
  }, [user]); // ✅ refetch when user changes

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>{' | '}
      <Link to="/custom-lists">Custom Lists</Link>{' | '}
      {user ? (
        <>
          <Link to="/profile" style={{ marginLeft: '10px' }}>Profile</Link>{' | '}{/* ✅ Profile link */}
          <span style={{ marginLeft: '10px' }}>
            Welcome, {username || user.email}
          </span>
          <button
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            style={{ marginLeft: '10px' }}
          >
            Logout
          </button>
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
