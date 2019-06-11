import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  DEFAULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
} from '../../constants';


//build static UI first
const list = [
   {
     title: 'React',
     url:'https://reactjs.org/',
     author: 'Jordan Walke',
     num_comments: 3,
     points: 4,
     objectID: 0,
  },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

class TheRoad extends Component {
  //constructor will be called only once when the component initializes
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchTerm: DEFAULT_QUERY,	
    }
  }

  componentDidMount(){
  	//the first time to fetch DATA
  	const { searchTerm } = this.state;
    
    axios(`${PATH_BASE}${PATH_SEARCH}?
      ${PARAM_SEARCH}${searchTerm}`)
    .then(result => this.setState(results: result))
    .catch(error => console.log(error));
    
  }
}