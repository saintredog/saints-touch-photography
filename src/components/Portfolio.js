// src/components/Portfolio.js
import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <div className="categories">
        <Link to="/portfolio/portraits" className="category">Portraits</Link>
        <Link to="/portfolio/weddings" className="category">Weddings</Link>
        <Link to="/portfolio/boudoir" className="category">Boudoir</Link>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
};

export default Portfolio;
