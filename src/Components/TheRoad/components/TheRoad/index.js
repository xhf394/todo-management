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