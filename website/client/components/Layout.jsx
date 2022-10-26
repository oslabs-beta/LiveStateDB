import React from 'react'
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='Layout'>
      Layout component
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;