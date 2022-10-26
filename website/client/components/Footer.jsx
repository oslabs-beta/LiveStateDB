import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='footer-content'>
        <div>Documentation</div>
        <div>Community</div>
      </div>
      <div className='copyright-license'>
        &copy; 2022 | <a>MIT License</a>
      </div>
    </div>
  )
}

export default Footer