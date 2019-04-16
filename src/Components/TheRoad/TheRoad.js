import React, { Component } from 'react';
import './theRoad.css';


class TheRoad extends Component {
  render() {
  	  //start insert
      const helloWorld = 'Welcome to the Road to learn React';

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

    return (

      <div className="theRoad">
      	<h2> {helloWorld}</h2>
      	<div>
      	  {list.map((item, itemIndex) => {
      		return <div key={itemIndex}>{item.title} </div>
      	})}
      	</div>  
      </div>
    );
  }
}

export default TheRoad;
