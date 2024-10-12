// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home/Home.jsx'; // Importar el componente Home

const App = () => {
  return (
    <Router>
        <Home/>  
    </Router>
  );
};

export default App;
