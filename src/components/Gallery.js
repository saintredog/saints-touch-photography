// src/components/Gallery.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Gallery = () => {
  const { category } = useParams();
  return (
    <div className="gallery">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Gallery</h2>
      {/* Add images for the specific category */}
    </div>
  );
};

export default Gallery;
