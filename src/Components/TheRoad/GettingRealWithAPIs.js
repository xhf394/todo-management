import React, { Component } from 'react';


//define API address
const DEFAULT_QUERY = 'redux';
//keep URL composition flexible
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//whole address
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

console.log(url);


class gettingRealWithAPIs extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	result: null,
    	searchTerm: DEFAULT_QUERY,
    }
  }

  render() {
    return (
      <div>
      gettingRealWithAPIs
      </div>
	)
  }
}

export default gettingRealWithAPIs;

