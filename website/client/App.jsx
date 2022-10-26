import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Docs from './components/Docs.jsx';

const App = () => {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='docs' />
            <Route index element={<Docs />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;