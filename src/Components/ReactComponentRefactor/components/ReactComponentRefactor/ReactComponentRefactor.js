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

import './ReactComponentRefactor.css';


  //update results state for rendering
  const updateTopNASAStoriesState = ( items, metadata, page ) =>
    (prevState) => {
      //access prev searchKey as object key;
      //access prev results for updating;
      const { searchKeyText, resultsNASA, isAddingPageNASA } = prevState;

      //split items list to render;
      const listSpliceForUpdating  = items.splice(0, 20);
      
      //get old hits
      const oldList = resultsNASA && resultsNASA[searchKeyText]
        ? resultsNASA[searchKeyText].itemsForRendering
        : [];

      //update results hits with new data
      const updatedList = [
        ...oldList,
        ...listSpliceForUpdating,
      ];

      //updating page when original list is empty
      //do not change result data structure
      //only adjust updates in result state
      if(!items.length) {
        return {
          resultsNASA: {
            ...resultsNASA,
            [searchKeyText]: {
              itemsForRendering: updatedList,
              page: page + 1,
              items, 
              metadata, 
            }
          },
          isLoadingNASA: false,
          isAddingPageNASA: true,
        }
      }

      //not updating page, set adding page to false
      if( items.length ) {
        return {
          resultsNASA: {
            ...resultsNASA,
            [searchKeyText]: {
              itemsForRendering: updatedList,
              items, 
              metadata,
              page, 
            }
          },
          isLoadingNASA: false,
          isAddingPageNASA: false,
        }
      }
      
    }

class ReactComponentRefactor extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      //store fetched data list
      resultsNASA: null,
      //while getting data
      isLoadingNASA: false,
      //default fetch data, fluctuant variable, 
      searchText: 'star',
      //temporary store each result
      searchKeyText: '',
      //if adding page number
      isAddingPageNASA: true,

  	}
    
    //bind all methods;
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToFetchStories = this.needsToFetchStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    //bind all methods NASA;
    this.fetchTopNASAStories = this.fetchTopNASAStories.bind(this);
    this.setTopNASAStories = this.setTopNASAStories.bind(this);

  }

  componentDidMount() {
    //pass searchText as an argument to fetch API; 
    const { searchText } = this.state;

    //temporary store searchTerm
    this.setState({ searchKeyText: searchText });
    
    //pass variable to api
    this.fetchTopNASAStories( searchText );
  }

  //fetch data with API
  fetchTopNASAStories( searchText, page = 1 ){
    //when fetch data, set loading as true;
    this.setState({isLoadingNASA: true});

    const { resultsNASA, searchKeyText } = this.state;
    
    //fetch data under condition
    if( this.state.isAddingPageNASA ) {

      axios(`https://images-api.nasa.gov/search?q=${searchText}&media_type=image&page=${page}`)
        .then(result => this.setTopNASAStories( result.data.collection, page ))
        .catch(error => console.log( error )); 
    }

    if( !this.state.isAddingPageNASA ) {
      this.setTopNASAStories( resultsNASA[searchKeyText], page );
    }
  }
  
  setTopNASAStories(result, page) {
    console.log(result);
    console.log(page);
    const {items, metadata } = result;
    
    console.log(items);
    console.log(metadata);

    this.setState(updateTopNASAStoriesState(items, metadata, page ));
  }

  //handle input value 
  onSearchChange(event){
    this.setState({
      searchText: event.target.value,
    })
  }

  //submit input data with button/press enter
  onSearchSubmit(event){
    //set searchKey before fetch data
    const { searchText } = this.state;    
    
    this.setState({ 
      searchKeyText: searchText,
      isLoadingNASA: true,
    });


    if( this.needsToFetchStories(searchText)) {

      // this.setState({
      //   //start a new fetch process
      //   isAddingPageNASA: true,
      //   //initiate page
      //   page: 1,
      //   resultsNASA: null,
      // });
      const page = 1;

      axios(`https://images-api.nasa.gov/search?q=${searchText}&media_type=image&page=${page}`)
        .then(result => this.setTopNASAStories( result.data.collection, page ))
        .catch(error => console.log( error ));
    }
    
    //prevent page refresh
    event.preventDefault();
  }

  //check if specific API already fetched
  needsToFetchStories(searchText) {
    return !this.state.resultsNASA[searchText];
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
      page, 
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
    
    console.log( this.state.resultsNASA );
    //pass all necessary data from state for using
    const { 
      searchText,
      resultsNASA,
      searchKeyText,
      isLoadingNASA,
      isAddingPageNASA,
    } = this.state;
    
    //exclude null and loading status for rendering list
  	const list = (
      resultsNASA &&
      resultsNASA[searchKeyText] &&
      resultsNASA[searchKeyText].itemsForRendering
    ) || [];
    
    const page = (
      resultsNASA &&
      resultsNASA[searchKeyText] &&
      resultsNASA[searchKeyText].page
    ) || 1;

    const listForButtonConditionalRendering = (
      resultsNASA &&
      resultsNASA[searchKeyText] &&
      resultsNASA[searchKeyText].items
    ) || [];

    const totalHits = (
      resultsNASA &&
      resultsNASA[searchKeyText] &&
      resultsNASA[searchKeyText].metadata &&
      resultsNASA[searchKeyText].metadata.total_hits
      ) || 0;

    return (
  	  <div className='nasa-wrapper'>

        <div className='header' id='topAnchor'>
         <p className='header-intro'>NASA <u>IMAGES </u> Search Engine </p>
        
        <Search
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          value={searchText}
          totalHits={totalHits}
        >         
        </Search>

        </div>
        
        {resultsNASA &&
         resultsNASA[searchKeyText] &&
         resultsNASA[searchKeyText].itemsForRendering && 
          <Table 
            list={list}
            onDismiss={this.onDismiss}
            searchText={searchText}
          />
        }

        <MoreButtonWithConditionalRendering
          list={list}
          isLoading={isLoadingNASA}
          onClick={() => this.fetchTopNASAStories(searchKeyText, page)}
          searchText={searchText}
          listForButtonConditionalRendering={listForButtonConditionalRendering}
          totalHits={totalHits}
          className="btn-load-more"    
        >
          More
        </MoreButtonWithConditionalRendering> 
        <a href="#topAnchor" className="top-link">
         Top 
        </a>
  	  </div>
  	)    
  }
}

export { ReactComponentRefactor };



