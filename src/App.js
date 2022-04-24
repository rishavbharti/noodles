import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CountryView from './pages/CountryView';
import BrandView from './pages/BrandView';

import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path=':country' element={<CountryView />} />
        <Route path='/brand/:brand' element={<BrandView />} />
      </Routes>
    </div>
  );
}

export default App;
