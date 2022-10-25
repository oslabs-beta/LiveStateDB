import React from 'react';
import Display from './components/Display.jsx'

const App = () => {

  return (
    <Display 
      databse="inventoryDemo" 
      collection="inventoryitems" 
      query="{}"
    />
  );
};

export default App;
