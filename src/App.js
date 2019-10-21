import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponentRefactor } from './Components/ReactComponentRefactor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';




const App = ({gridItems}) => (
  <div className='App'>
    <div>
      <ReactComponentRefactor gridItems={gridItems} />
    </div>
  </div>
);


export default App;
