import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from './Components/TodoListContent/TodoList';
import TheRoad from './Components/TheRoad/TheRoad';
import { ReactComponentRefactor } from './Components/ReactComponentRefactor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';




const App = () => (
  <div className='App'>
    <div>
      <ReactComponentRefactor />
    </div>
  </div>
);


export default App;
