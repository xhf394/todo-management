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

const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


//a resuable button component
const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>  

class TableWithAPIs extends Component {
  render(){
  	//pass state value
  	const { list, onDismiss, pattern } = this.props;
    console.log(list);
  	return(
  	  <div className="list list-With-APIs">
      	{list.filter(isSearched(pattern)).map(item => {

      	  //define onClick event function 
      	  const onDismissHandler = () =>
      	    onDismiss(item.objectID);

      		return(
      		  <div key={item.objectID} className="list-Item">
      		    <span>
      		      <a href={item.url}> {item.title} </a>
      		    </span>
      		    <span> {item.num_comments} </span>
      		    <span> {item.author} </span>
      		    <span> {item.points} </span>

      		    <div
      		    //use ()={} to manipulate data directly
      		    //or bind it in the constructor
      		    >
      		      <Button
                    onClick={onDismissHandler}
      		      >
      		      	Dismiss
      		      </Button> 
      		    </div>  
      		  </div>
      	    )
      	  }
      	)}
      </div>	
  	)
  }	
}


class gettingRealWithAPIs extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	result: null,
    	searchTerm: DEFAULT_QUERY,
    	list: [],
    }
    
  this.setSearchTopStories = this.setSearchTopStories.bind(this);  
  this.onDismiss = this.onDismiss.bind(this);

  }
  

  setSearchTopStories(result) {
    this.setState({ 
      result,
      list: result.hits, 
    });
  }

  componentDidMount() {
  	const { searchTerm } = this.state;

  	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
  	.then(response => response.json())
  	.then(result => this.setSearchTopStories(result))
  	.catch(error => error);
  }
  
  //define onDismiss handler
  onDismiss(id) {
  	//set up rules to filter all in list except clicked item
    const isNotId = item => item.objectID !== id;

  	//pass it to filter method to create a new list
    const updatedList = this.state.list.filter(isNotId);
    
    //update list to updateList to re-render
    this.setState({
    	list: updatedList,
    }) 
  }

  render() {
  	const { searchTerm, result, list } = this.state;
    
    console.log(result);
    console.log(list);

    //when render for the first time, prevent it from displaying anything
    if(!result) { return null;}

    
    return (
      <div>
        <h1>gettingRealWithAPIs</h1>
        <TableWithAPIs
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
	)
  }
}

export default gettingRealWithAPIs;

