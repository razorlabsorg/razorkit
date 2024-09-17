/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mevm from './pages/Evm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mevm" element={<Mevm />} />
    </Routes>
  );
}

export default App;
