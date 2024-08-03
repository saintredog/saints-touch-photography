// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<Gallery />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
