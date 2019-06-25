import React, { Component} from 'react';
import { Button, SortButton } from '../Button';
import { sortBy } from 'lodash';


const SORTS = {
  //A default list should be defined, not sorted
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),	
};


class Table extends Component {
  constructor(props) {
  	super(props);
    this.state = ({
      isSortReversed: false,
      sortKey: 'NONE',	
    })

    this.onSort = this.onSort.bind(this);
  }
  
  onSort(sortKey) {
    
    const isSortReversed = sortKey === this.state.sortKey 
      && !this.state.isSortReversed;

    //pass sortKey to table 
    this.setState({ 
      sortKey,
      isSortReversed,
    });
  }


  render() {
  	const {
  	  list,
  	  onDismiss,	
  	} = this.props;
    
    const {
      isSortReversed,
      sortKey,	
    } = this.state;

    const sortedList = SORTS[sortKey](list);    
 

	return (
	  <div> 
	    <h3> Table </h3>
	    <div>
	      <SortButton
            onSort={this.onSort}
            sortKey={'TITLE'}
	      >
	        Title
	      </SortButton>
	      <SortButton
            onSort={this.onSort}
            sortKey={'COMMENTS'}
	      >
	        Comments
	      </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'AUTHOR'}
          >
            Author
          </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'POINTS'}
          >
            Points
          </SortButton>    
	    </div>

	    <div>
	      {sortedList.map(item => 
	      	
	      	  <div key={item.objectID} >
	      	    <span>
	      	      <a href={item.url}> {item.title} </a>
	      	    </span>
	      	    <span> {item.num_comments} </span>
	      	    <span> {item.author} </span>
	      	    <span> {item.points} </span>
	      	    <Button
                  onClick={() => onDismiss(item.objectID)}
	      	    >
	      	      Dismiss
	      	    </Button>  
	      	  </div> 
	      	)
	       }
	    </div>
	  </div>
	)
  }
}



export default Table;
