import React from 'react';
import ReactDOM from 'react-dom';
import TheRoad from './TheRoad';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TheRoad />, div);
  ReactDOM.unmountComponentAtNode(div);	
})