import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='footer-content'>
        <div className='footer-documentation'>
          <p>Documentation</p>
        </div>
        <div className='footer-community'>
          <p>Community</p>
          <div><a>Medium</a></div>
          <div><a href='https://github.com/oslabs-beta/LiveStateDB'>GitHub</a></div>
          <div><a href='https://www.linkedin.com/company/livestatedb/'>LinkedIn</a></div>
        </div>
      </div>
      <div className='copyright-license'>
        &copy; 2022 | <a href='https://github.com/oslabs-beta/LiveStateDB/blob/dev/LICENSE.txt'>MIT License</a>
      </div>
    </div>
  )
}

export default Footer