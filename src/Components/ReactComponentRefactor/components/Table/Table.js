import React, { Component} from 'react';
import { Button, SortButton } from '../Button';
import { sortBy } from 'lodash';


//a list of Fn used to sort list
const SORTS = {
  //A default list should be defined, not sorted
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),	
};

//search in displayed list
const isSearched = ( searchTerm ) => item =>
  { 
    //exclude title = null;
    if( item.title === null) return false; 
    return item.title.toLowerCase().includes( searchTerm.toLowerCase() );
  }


class Table extends Component {
  constructor(props) {
  	super(props);
    this.state = ({
      isSortReverse: false,
      sortKey: 'NONE',	
    })

    this.onSort = this.onSort.bind(this);
  }
  
  onSort(sortKey) {
    
    const isSortReverse = sortKey === this.state.sortKey && 
    !this.state.isSortReverse;

    //pass sortKey to table 
    this.setState({ 
      sortKey,
      isSortReverse,
    });
  }


  render() {
  	const {
  	  list,
  	  onDismiss,
      searchTerm	
  	} = this.props;
    
    const {
      isSortReverse,
      sortKey,	
    } = this.state;

    //pass list to sort Fn
    const sortedList = SORTS[sortKey](list)
    
    //define if reverse
    const reverseSortList = isSortReverse
      ? sortedList.reverse()
      : sortedList;
    console.log(sortedList.filter(isSearched(searchTerm)));
	return (
	  <div> 
	    <h3> Table </h3>
	    <div>
	      <SortButton
            onSort={this.onSort}
            sortKey={'TITLE'}
            activeSortKey={sortKey}
	      >
	        Title
	      </SortButton>
	      <SortButton
            onSort={this.onSort}
            sortKey={'COMMENTS'}
            activeSortKey={sortKey}
	      >
	        Comments
	      </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'AUTHOR'}
            activeSortKey={sortKey}
          >
            Author
          </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'POINTS'}
            activeSortKey={sortKey}
          >
            Points
          </SortButton>    
	    </div>

	    <div>
	      {sortedList.filter(isSearched(searchTerm)).map(item => 
	      	
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
