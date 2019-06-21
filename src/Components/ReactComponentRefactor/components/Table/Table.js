import React, { Component} from 'react';
import { Button } from '../Button';

class Table extends Component {


  render() {
  	const {
  	  list,
  	  onDismiss,	
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
	      	    <Button
                  onClick={ () => onDismiss(item.objectID)}
	      	    >
	      	      Dismiss
	      	    </Button>  
	      	  </div> 
	      	  )
	      })}
	    </div>
	  </div>
	)
  }
}



export default Table;
