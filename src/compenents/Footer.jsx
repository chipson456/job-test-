import React from 'react';
import './matan/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} User Library. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
