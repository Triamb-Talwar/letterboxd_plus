import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import AllMediaPage from './pages/AllMediaPage';
import CreateCustomList from './pages/CreateCustomList';
import CustomListViewer from './pages/CustomListViewer';

// Wrapper to extract :listName param and pass to CustomListViewer
const CustomListViewerWrapper = () => {
  const { listName } = useParams();
  return <CustomListViewer listName={decodeURIComponent(listName)} />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AllMediaPage />} />
      <Route path="/create-list" element={<CreateCustomList />} />
      <Route path="/view-list" element={<CustomListViewer />} />
    </Routes>
  </Router>
);

export default App;
