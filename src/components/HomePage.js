// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-image">
        {/* Add your hero image here */}
      </div>
      <div className="intro">
        <h1>Welcome to Saint's Touch Photography</h1>
        <p>Capturing moments with a touch of elegance and creativity.</p>
        <div className="cta-buttons">
          <Link to="/portfolio" className="btn">View Portfolio</Link>
          <Link to="/contact" className="btn">Book a Session</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
