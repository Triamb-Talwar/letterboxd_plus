// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AllMediaPage from './pages/AllMediaPage';
import CustomListViewer from './pages/CustomListViewer';
import Navbar from './components/Navbar';
import CreateCustomList from './pages/CreateCustomList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <AllMediaPage />
            </PrivateRoute>
            } />
          <Route path="/custom-lists" element={
            <PrivateRoute>
            <CustomListViewer />
            </PrivateRoute>
            } />
          <Route path="/create-list" element={
            <PrivateRoute>
            <CreateCustomList />
            </PrivateRoute>
            } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
