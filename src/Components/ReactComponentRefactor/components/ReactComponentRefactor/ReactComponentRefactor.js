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

import { Search } from '../Search';
import { Table } from '../Table';
import { MoreButtonWithConditionalRendering } from '../Button';

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
    ];

    //do not change result data structure
    //only adjust updates in result state
    return {
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
    //set data, complete loading
      isLoading: false,
    };  

  }

  //update results state for rendering
  const updateTopNASAStoriesState = ( items, metadata, page ) =>
    (prevState) => {
      //access prev searchKey as object key;
      //access prev results for updating;
      const { searchKeyText, resultsNASA } = prevState;

      
    }

class ReactComponentRefactor extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  //default fetch data, fluctuant variable, interacte with form
  	  searchTerm: DEFAULT_QUERY,
  	  //store fetched data
  	  results: null, 
  	  //set for page conditional rendering
  	  isLoading: false,
      //temporary store each result
      searchKey: '',

      //store fetched data list
      resultsNASA: null,
      //while getting data
      isLoadingNASA: false,
      //default fetch data, fluctuant variable, 
      searchText: 'earth',
      //temporary store each result
      searchKeyText: '',
      //initial page = 1;
      page: 1,

  	}
    
    //bind all methods;
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToFetchStories = this.needsToFetchStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    //bind all methods NASA;
    this.fetchTopNASAStories = this.fetchTopNASAStories.bind(this);
    this.setTopNASAStories = this.setTopNASAStories.bind(this);

  }

  componentDidMount() {
  	//pass searchTerm as an argument to fetch API;
  	const { searchTerm } = this.state;
    
    //temporary store searchTerm
    this.setState({ searchKey: searchTerm });

  	this.fetchTopStories(searchTerm);
    
    const { searchText, page } = this.state;

    //temporary store searchTerm
    this.setState({ searchKeyText: searchText });

    this.fetchTopNASAStories( searchText, page );
  }

  //fetch data with API
  fetchTopNASAStories(searchText, page ){
    //when fetch data, set loading as true;
    this.setState({isLoadingNASA: true});

    //fetch data
    axios(`https://images-api.nasa.gov/search?q=${searchText}&media_type=image&page=${page}`)
      .then(result => this.setTopNASAStories( result.data.collection, page ))
      .catch(error => console.log( error )); 
  }
  
  setTopNASAStories(result, page) {
    console.log(result);
    console.log(page);
    const {items, metadata } = result;
    
    console.log(items);
    console.log(metadata);

    this.setState(updateTopNASAStoriesState(items, metadata, page ));
  }


  //fetch data with API
  //pass initial page number 0;
  fetchTopStories(searchTerm, page = 0) {
    //when fetch data, set loading as true;
    this.setState({isLoading: true});
    
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(result => this.setTopStories( result.data ))
      .catch(error => console.log( error ));  
  }


  //store fetched data and ready for render
  setTopStories(result) {
    //extract necessary data
    const { hits, page } = result;
    
    console.log( result );
    //pass hits and page to update method
    //use prev state in setState to avoid stale state
    //use HOF to decoupling
    this.setState(updateTopStoriesState( hits, page ));
  }

  //handle input value 
  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value,
    })
  }

  //submit input data with button/press enter
  onSearchSubmit(event){
    //set searchKey before fetch data
    const { searchTerm } = this.state;    
    this.setState({searchKey: searchTerm});

    if( this.needsToFetchStories(searchTerm)) {
      this.fetchTopStories( searchTerm );
    }
    
    //prevent page refresh
    event.preventDefault();
  }

  //check if specific API already fetched
  needsToFetchStories(searchTerm) {
    return !this.state.results[searchTerm];
  }
  
  onDismiss(id) {

    //condition statement;
    //not selected, turn true;
    const isNotDismissId = item => item.objectID !== id;
    
    //pass data;
    const {
      searchKey,
      results,
    } = this.state;

    const {
      hits,
      page 
    } = results[searchKey];
    
    console.log(id);

    const updatedHits = hits.filter(isNotDismissId);
    console.log(updatedHits);

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    })
  }



  render() {
    
    console.log( this.state.results );
    //pass all necessary data from state for using
    const { 
      searchTerm,
      results,
      searchKey,
      isLoading,
    } = this.state;
    
    //exclude null and loading status for rendering list
  	const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    return (
  	  <div>
  	    <h1>This is the refactor version </h1>
        <Search
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          value={searchTerm}
        >
          Search
        </Search>
        
        {results &&
         results[searchKey] &&
         results[searchKey].hits && 
          <Table 
            list={list}
            onDismiss={this.onDismiss}
            searchTerm={searchTerm}
          />
        }
        <MoreButtonWithConditionalRendering
          list={list}
          isLoading={isLoading}
          onClick={() => this.fetchTopStories(searchKey, page+1)}
          searchTerm={searchTerm}    
        >
          More
        </MoreButtonWithConditionalRendering> 
  	  </div>
  	)    
  }
}

export { ReactComponentRefactor };



