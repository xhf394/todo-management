import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from './Components/TodoListContent/TodoList';
import TheRoad from './Components/TheRoad/TheRoad';
import { ReactComponentRefactor } from './Components/ReactComponentRefactor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

const routes = [
  {
  	path: '/',
  	exact: true,
  	main: () => <TodoList />  
  },
  {
  	path: '/theRoad',
  	main: () => <TheRoad />
  },
  {
  	path: '/ReactComponentRefactor',
  	main: () => <ReactComponentRefactor />
  }
  ];

const App = () => (

  <div className='App'>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Todo Management </Link>
          </li>
          <li>
            <Link to='/theRoad'>The Road </Link>
          </li>
          <li>
            <Link to='/ReactComponentRefactor'> ReactComponentRefactor </Link>
          </li>
        </ul>
      </nav>    
      <div>
      {routes.map((route, index) => (
         <Route
           key={index}
           path={route.path}
           exact={route.exact}
           component={route.main}
      	/>))}
      </div>
    </Router>
  </div>	
 
  )

export default App;
