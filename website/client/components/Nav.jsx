import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
  return (
    <div className='Nav'>
      <Link className='nav-link' to='/'>Home</Link>
      <Link className='nav-link' to='/docs'>Docs</Link>
      <a className='nav-link' href='https://github.com/oslabs-beta/LiveStateDB ' target='_blank'>GitHub</a>
    </div>
  )
}

export default Nav