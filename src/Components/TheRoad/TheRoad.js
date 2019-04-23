import React, { Component } from 'react';
import './theRoad.css';


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
  const user = {
  	[key]: 'Robin',
  }

class TheRoad extends Component {

  //constructor will be called only once when the component initializes
  constructor(props) {
  	super(props);
    this.state = {
    	//shorthand for list
    	list,
    }

    //bind onDismiss to dismiss contents 
    this.onDismiss = this.onDismiss.bind(this);
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
  	  //start insert
      const helloWorld = 'Welcome to the Road to learn React';    

    return (

      <div className="theRoad">
      	<h2> {helloWorld}</h2>
      	<div>
      	  {this.state.list.map(item => {
      		return (
      		  <div key={item.objectID}>
      		    <span>
      		      <a href={item.url}> {item.title} </a>
      		    </span>
      		    <span> {item.author} </span>
      		    <span> {item.points} </span>

      		    <div
      		    //use ()={} to manipulate data directly
      		    //or bind it in the constructor
      		    >
      		      <button
                    onClick={()=>this.onDismiss(item.objectID)}
                    type='button'
      		      >
      		      	Dismiss
      		      </button> 
      		    </div>
      		 
      		  </div>
      		  )
      	})}
      	</div>  
      </div>
    );
  }
}

export default TheRoad;
