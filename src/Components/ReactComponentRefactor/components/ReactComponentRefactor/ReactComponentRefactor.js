import React, { Component } from 'react';

import axios from 'axios';
//import API data;
import {
  DEFAULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE	
} from '../../constants';

class ReactComponentRefactor extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		//default fetch data, fluctuant variable, interacte with form
  		searchTerm: DEFAULT_QUERY,
  		//store fetch data
  		results: null, 
  		//set for page conditional rendering
  		isLoading: false,
      //temporary store each result
      searchKey: '',
  	}
    
    //bind all methods;
    this.fetchTopStories = this.fetchTopStories.bind(this);
   
  }

  componentDidMount() {
  	//pass searchTerm as argument to fetch API;
  	const { searchTerm } = this.state;
    
  	this.fetchTopStories(searchTerm);
  }


  fetchTopStories(searchTerm, page = 0) {
    //when fetch data, set loading as true;
    this.setState({isLoading: true});
    
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(result => console.log( result.data ))
      .catch(error => console.log( error ));  
  }


  render() {

  	return (
  	  <div>
  	    <h1>This is the refactor version </h1>
  	  </div>
  	)
    
  }
}

export { ReactComponentRefactor };



