import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './theRoad.css';
import GettingRealWithAPIs from './GettingRealWithAPIs';

import { sortBy } from 'lodash';



/**Example Area**/

 //  class Developer {

	// //Pure class with no component, 
	// construction(firstname, lastname) {
	// 	this.firstname = firstname;
	// 	this.lastname = lastname;
	// }
    
 //    getName() {
 //    	return this.firstname + ' ' + this.lastname;
 //    }
 //  }
  //Array using for example	
  //add a array list for react related source
  //always use 'const' if the data strcuture won't change
  // const list = [
  // 	{
  // 	  title: 'React',
  // 	  url:'https://reactjs.org/',
  // 	  author: 'Jordan Walke',
  // 	  num_comments: 3,
  // 	  points: 4,
  // 	  objectID: 0,
  // },
  //   {
  //     title: 'Redux',
  //     url: 'https://redux.js.org/',
  //     author: 'Dan Abramov, Andrew Clark',
  //     num_comments: 2,
  //     points: 5,
  //     objectID: 1,
  //   }
  // ];
  
  //Object Example
  // const userService = {
  // 	getUserName(user) {
  // 		return user.firstname + ' ' + user.lastname;
  // 	},
  // }

  //computed property names examples
  // const key = 'name';
  // const user2 = {
  // 	[key]: 'Robin',
  // }
  
  //destructuring

  //objects 
  // const user = {
  //   firstname: 'Robin',
  //   lastname: 'Wieruch',
  // }  

  // const { 
  //   firstname, 
  //   lastname
  // } = user;
  
  // //array
  // const users = ['David', 'Andrew', 'Robin'];
  // const [
  //   userOne,
  //   userTwo,
  //   userThree
  //   ] = users;


  //example for binding
  // class ExplainBindingsComponent extends Component {
  // 	constructor(){
  // 		super();
  // 		this.state = {
  // 			list,
  // 		}
  // 		this.onClickMe = this.onClickMe.bind(this);
  // 	}

  // 	onClickMe() {
  // 		console.log(this);
  // 	}


  // 	render() {
  // 	  return (
  // 		<div>
  // 		<button
  //  		  onClick={this.onClickMe}
  //  		  type='button'
  // 		>
  //        Click Me 
  // 		</button>
  // 		</div>
  // 	  )
  // 	}
  // }

/**Example End**/

//higher-order function example
/**Search on client side and filter 
 * @param {string} target
 * @param {object{}} filter items
 * @return {object{}} object with key words match search target 
 */
const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


//Search Component use input to filter display table
//with {children} to reuse this component 
class Search extends Component {
  componentDidMount() {
  	if(this.input) {
  		this.input.focus();
  	}
  }
    

  render(){
	const {
	  value,
	  onChange,
	  onSubmit,
	  children
	} = this.props;

	return(
      <form onSubmit={onSubmit}>       
        <input 
      	  type="text"
          //make uncontrolled component to controlled 
          value={value}
          onChange={onChange}
          ref={el => this.input = el}
        />
      	<button type="submit">
      	  {children}
      	</button>
      </form>
	)		
  }
}

//a resuable button component
const Button = ({ 
	onClick, 
	className, 
	children
	 }) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
}

Button.defaultProps = {
	className: '',
}

class Table extends Component {
  render(){
  	//pass state value
  	const { 
  		list, 
  		onDismiss, 
  		searchTerm,
  		sortKey,
  		onSort,
  		 } = this.props;
    console.log(list);
  	return(
  	  <div className="list">
      	{list.filter(isSearched(searchTerm)).map(item => {

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

Table.propTypes = {
	list: PropTypes.array.isRequired,
	onDismiss: PropTypes.func.isRequired,
	searchTerm: PropTypes.string,
}

//sort table

const SORTS = {
	//define a default list, not sorted
	NONE: list => list,
	TITLE: list => sortBy(list, 'title'),
	AUTHOR: list => sortBy(list, 'author'),
	COMMENTS: list => sortBy(list, 'num_comments').reverse(),
	POINTS: list => sortBy(list, 'points').reverse(),


}

//define API address
const DEFAULT_QUERY = 'redux';
//keep URL composition flexible
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';


/**conditional render with loading...
 *@param { component } specific component needs to render
 *@return { component } loading or assigned component
*/
const withEither = ( conditionalRenderingFn, EitherComponent ) => ( Component ) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent />
    : <Component { ...props } />

//loading page message
const LoadingIndicator = () => 
  <div> 
    <p>Loading ... </p>
  </div>

//loading Conditional Fn
const isLoadingConditionFn = (props) => props.isLoading;

//Button HOC with WithLoading
const ButtonWithLoadingOne = withEither( isLoadingConditionFn, LoadingIndicator );
const ButtonWithLoading = ButtonWithLoadingOne( Button );    

class TheRoad extends Component {

  //constructor will be called only once when the component initializes
  constructor(props) {
  	super(props);
    this.state = {
       //shorthand for list
      
      results: null,
      //temporary store each result
      searchKey: '',
      //fluctuant variable
      searchTerm: DEFAULT_QUERY,

      //error handler
      error: null,

      //handle asynchronous as loading message
      isLoading: false,

      sortKey: 'NONE',
    	
    }

    //bind all methods

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    //bind onDismiss to dismiss contents 
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSort = this.onSort

  }
  
  /**fetch data --fetch data from server side and store in result object
   * @param {string} target
   * @param {number} page
   * @return {object{}} 
   */
  fetchSearchTopStories(searchTerm, page = 0) {
  	//pass searchTerm to fetch data from server side

  	//set loading status to true during fetch data
    this.setState({isLoading: true})

  	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
  	.then(response => response.json())
  	.then(result => this.setSearchTopStories(result))
  	.catch(error => this.setState({ error }));    
  }

  componentDidMount() {
  	const { searchTerm } = this.state;
    
    this.setState({ searchKey: searchTerm });

  	this.fetchSearchTopStories(searchTerm);

  }
  
  //store target news array and re-render
  setSearchTopStories(result) {
  	const { hits, page } = result;

  	//access searchkey
  	const { searchKey, results } = this.state; 
    
    console.log(searchKey);
  	//store old result hits
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits
    ]

    this.setState({ 
      results: {
      	...results,
      	[searchKey]: {hits: updatedHits, page }
      },
      isLoading: false 
    });
  }

  /**check if searchKey already in the list
    *@param { string } searchkey
    *@return { boolean } true means in the list
    */
  needsToSearchTopStories(searchTerm) {
  	return !this.state.results[searchTerm];
  }

  //define onDismiss handler
  onDismiss(id) {
  	//set up rules to filter all in list except clicked item
    const isNotId = item => item.objectID !== id;
    
    const { searchKey, results } = this.state;

    const { hits, page } = results[searchKey];
    
  	//pass it to filter method to create a new list
    const updatedHits = hits.filter(isNotId);

    //update list to updateList to re-render
    this.setState({
    	//list: updatedList,
    	results: {
    		...results, 
    		[searchKey]: {hits: updatedHits, page}},
    }) 
    console.log(this.state.results);
  }

  //form and interaction
  onSearchChange(event){
    this.setState({
    	searchTerm: event.target.value
    })
  }
  
  onSearchSubmit(event){
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    
    //prevent re-submit for the same searchKey
    if(this.needsToSearchTopStories(searchTerm)) {
    	this.fetchSearchTopStories(searchTerm);
    }
    
    event.preventDefault();

  }

  onSort(sortKey) {
  	this.setState({ sortKey });
  }

  render() {
  	  //start insert
      const helloWorld = 'Welcome to the Road to learn React';    
      //destructure the local state
      const { 
      	searchTerm, 
      	results, 
      	searchKey,
      	error,
      	isLoading,
      	sortKey,
      } = this.state;

      console.log(results);
      //when render for the first time, prevent it from display anything
      //if(!result) {return null;} 
      
      const page = (
      	results && 
      	results[searchKey] &&
      	results[searchKey].page
      	)|| 0;

      const list = (
      	results &&
      	results[searchKey] &&
      	results[searchKey].hits
      	) || [];
    
    //error handler 
    //put it in a specific place;
    if(error) {
      return <p> Something went wrong. </p>
    } 

    return (

      <div className="theRoad">
      	<h2> {helloWorld}</h2>
      	<Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
      	>
      	  Search
      	</Search>
        
        { results && 
          <Table 
            list={list}
            onDismiss={this.onDismiss}
            searchTerm={searchTerm}
            sortKey={sortKey}
            onSort={this.onSort}
          />
        }

        <div>
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={()=> this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>  
        </div>

      </div>
    );
  }
}

export default TheRoad;

//prepare for testing
export {
  Button,
  Search,
  Table,	
};
