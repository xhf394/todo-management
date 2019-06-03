import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from './Components/TodoListContent/TodoList';
import TheRoad from './Components/TheRoad/TheRoad';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

const App = () => (

  <div className='App'>
    <Router>
      <TodoList />
      <TheRoad />
    </Router>
  </div>	
 
  )

export default App;
