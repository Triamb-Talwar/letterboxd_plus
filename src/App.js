// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AllMediaPage from './pages/AllMediaPage';
import CustomListViewer from './pages/CustomListViewer';
import Navbar from './components/Navbar';
import CreateCustomList from './pages/CreateCustomList';
import PrivateRoute from './components/PrivateRoute';

import { auth } from './firebase';
import { saveUserProfile, getUserProfile } from './utils/firebaseUtils';

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await saveUserProfile(user.uid, {
            email: user.email,
            name: user.displayName || 'No Name',
            photoURL: user.photoURL || null,
            joinedAt: new Date().toISOString(),
          });
          console.log("✅ User saved to Firestore");

          const profile = await getUserProfile(user.uid);
          console.log("📦 User profile fetched from Firestore:", profile);
        } catch (error) {
          console.error("🔥 Firestore error:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AllMediaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom-lists"
            element={
              <PrivateRoute>
                <CustomListViewer />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-list"
            element={
              <PrivateRoute>
                <CreateCustomList />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
