import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render (
      <Router>
            <Routes>
                  <Route path='/*' element={<App />} />
            </Routes>
      </Router>
)