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


//update results state for rendering
const updateTopStoriesState = ( hits, page ) =>
  ( prevState ) => {

    //access prev searchKey as key;
    //access results to compare and update changed part;
    const { searchKey, results } = prevState;
    
    //get old hits(data for rendering)
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    //update results hits with new data;
    const updatedHits = [
      ...oldHits,
      ...hits,
    ]  

  }

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
    this.setTopStories = this.setTopStories.bind(this);
  }

  componentDidMount() {
  	//pass searchTerm as an argument to fetch API;
  	const { searchTerm } = this.state;
    
    //temporary store searchTerm
    this.setState({ searchKey: searchTerm });

  	this.fetchTopStories(searchTerm);
  }

  //fetch data with API
  //pass initial page number 0;
  fetchTopStories(searchTerm, page = 0) {
    //when fetch data, set loading as true;
    this.setState({isLoading: true});
    
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(result => console.log( result.data ))
      .catch(error => console.log( error ));  
  }
  
  //store fetched data and ready for render
  setTopStories(result) {
    //extract necessary data
    const { hits, page } = result;

    //pass hits and page to update method
    //use prev state in setState to avoid stale state
    //use HOF to decoupling
    this.setState(updateTopStoriesState( hits, page ));
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



