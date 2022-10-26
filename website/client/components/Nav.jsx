import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      Nav component (inside header)
      <Link to='/'>Home</Link>
      <Link to='/docs'>Docs</Link>
      <a href='https://github.com/oslabs-beta/LiveStateDB ' target='_blank'>GitHub</a>
    </div>
  )
}

export default Nav