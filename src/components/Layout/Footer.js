import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="copyright">All Rights Reserved &copy; Kunal Mukherjee 2024</h3>
        <nav className="footer-links">
              <Link to="/" className="link">
                <div id="home-icon"/>
                <span>Home</span>
                
              </Link>
               
              <Link to="/about" className="link">
                <div id="about-icon" />
                <span>About</span>
              </Link>
              
              <Link to="/contact" className="link">
                <div id="contact-icon" />
                <span>Contact</span>
              </Link>
              <Link to="/policy" className="link">
                <div id="policy-icon" />
                <span>Policy</span>
              </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
