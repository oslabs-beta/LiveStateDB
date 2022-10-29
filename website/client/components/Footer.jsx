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
          <div><a href='https://medium.com/@stephaniepage/livestatedb-5244b41e7419' target='_blank' rel='noreferrer noopener'>Medium</a></div>
          <div><a href='https://github.com/oslabs-beta/LiveStateDB' target='_blank' rel='noreferrer noopener'>GitHub</a></div>
          <div><a href='https://www.linkedin.com/company/livestatedb/' target='_blank' rel='noreferrer noopener'>LinkedIn</a></div>
        </div>
      </div>
      <div className='copyright-license'>
        &copy; 2022 | <a href='https://github.com/oslabs-beta/LiveStateDB/blob/dev/LICENSE.txt' target='_blank' rel='noreferrer noopener'>MIT License</a>
      </div>
    </div>
  )
}

export default Footer