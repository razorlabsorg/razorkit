/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sui from './pages/Sui';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sui" element={<Sui />} />
    </Routes>
  );
}

export default App;
