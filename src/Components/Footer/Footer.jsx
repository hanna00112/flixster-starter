import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Hanna Abrahem Flixster.</p>
      <nav className="footer-nav">
        <a href="#privacy" className="footer-link">Privacy Policy</a>
        <a href="#terms" className="footer-link">Terms of Service</a>
      </nav>
    </footer>
  );
};

export default Footer;