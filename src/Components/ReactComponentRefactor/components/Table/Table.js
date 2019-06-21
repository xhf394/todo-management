import React, { Component} from 'react';

class Table extends Component {


  render() {
  	const {
  	  list,	
  	} = this.props;

	return (
	  <div> 
	    <h3> Table </h3>
	    <div>
	      {list.map(item => {
	      	return(
	      	  <div key={item.objectID} >
	      	    <span>
	      	      <a href={item.url}> {item.title} </a>
	      	    </span>
	      	    <span> {item.num_comments} </span>
	      	    <span> {item.author} </span>
	      	    <span> {item.points} </span>
	      	  </div> 
	      	  )
	      })}
	    </div>
	  </div>
	)
  }
}



export default Table;
