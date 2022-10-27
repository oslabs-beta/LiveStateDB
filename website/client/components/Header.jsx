import React from 'react';
import Nav from './Nav.jsx';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className='Header'>
      <div className='logo'>LiveStateDB image</div>
      <Nav />
    </div>
  )
}

export default Header;