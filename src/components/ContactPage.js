// src/components/ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <form>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="social-media">
        <a href="https://www.instagram.com">Instagram</a>
        <a href="https://www.facebook.com">Facebook</a>
        {/* Add other social media links */}
      </div>
    </div>
  );
};

export default ContactPage;
