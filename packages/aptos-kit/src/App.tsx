/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Aptos from './pages/Aptos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aptos" element={<Aptos />} />
    </Routes>
  );
}

export default App;
