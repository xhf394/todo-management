import React, { Component } from 'react';
import './theRoad.css';
import GettingRealWithAPIs from './GettingRealWithAPIs';


class Developer {

	//Pure class with no component, 
	construction(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}
    
    getName() {
    	return this.firstname + ' ' + this.lastname;
    }
}


  //Array using for example	
  //add a array list for react related source
  //always use 'const' if the data strcuture won't change
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
  
  //Object Example
  const userService = {
  	getUserName(user) {
  		return user.firstname + ' ' + user.lastname;
  	},
  }

  //computed property names examples
  const key = 'name';
  const user2 = {
  	[key]: 'Robin',
  }
  
  //destructuring

  //objects 
  const user = {
    firstname: 'Robin',
    lastname: 'Wieruch',
  }  

  const { 
    firstname, 
    lastname
  } = user;
  
  //array
  const users = ['David', 'Andrew', 'Robin'];
  const [
    userOne,
    userTwo,
    userThree
    ] = users;


  //example for binding
  class ExplainBindingsComponent extends Component {
  	constructor(){
  		super();
  		this.state = {
  			list,
  		}
  		this.onClickMe = this.onClickMe.bind(this);
  	}

  	onClickMe() {
  		console.log(this);
  	}


  	render() {
  	  return (
  		<div>
  		<button
   		  onClick={this.onClickMe}
   		  type='button'
  		>
         Click Me 
  		</button>
  		</div>
  	  )
  	}
  }

//higher-order function example
/**/
const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


//Search Component use input to filter display table
//with {children} to reuse this component 
const Search = ({ value, onChange, children }) =>
  <form>
        {children}
      	<input 
      	  type="text"
      	  //make uncontrolled component to controlled 
          value={value}
          onChange={onChange}
      	/>
   </form>

//a resuable button component
const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>


class Table extends Component {
  render(){
  	//pass state value
  	const { list, onDismiss, searchTerm } = this.props;

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



class TheRoad extends Component {

  //constructor will be called only once when the component initializes
  constructor(props) {
  	super(props);
    this.state = {
    	//shorthand for list
    	list,
      searchTerm: '',
    	
    }

    //bind onDismiss to dismiss contents 
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  //form and interaction
  onSearchChange(event){
    this.setState({
    	searchTerm: event.target.value
    })
  }


  render() {
  	  //start insert
      const helloWorld = 'Welcome to the Road to learn React';    
      //destructure the local state
      const { searchTerm, list } = this.state;

    return (

      <div className="theRoad">
      	<h2> {helloWorld}</h2>
      	<Search 
          value={searchTerm}
          onChange={this.onSearchChange}
      	>
      	  Search
      	</Search>
        
        <Table 
          list={list}
          onDismiss={this.onDismiss}
          searchTerm={searchTerm}
        />

      	<ExplainBindingsComponent />
        <GettingRealWithAPIs />
      </div>
    );
  }
}

export default TheRoad;
