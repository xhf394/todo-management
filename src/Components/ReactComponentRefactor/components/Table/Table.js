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
// const isSearched = ( searchTerm ) => item =>
//   { 
//     //exclude title = null;
//     if( item.title === null) return false; 
//     return item.title.toLowerCase().includes( searchTerm.toLowerCase() );
//   }


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
      searchText	
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
   // console.log(sortedList.filter(isSearched(searchText)));
	return (
	  <div> 
	    <h3> Table </h3>
	    <div>
	      {sortedList.map(item => 
            {
	      	    const { data, links } = item;
              const {nasa_id, title, secondary_creator, description } = data[0];
              const { href } = links[0];

              return (
                <div key={nasa_id} >
                <span> 
                  <img src={href} alt=""/>
                </span>
                <span> {title} </span>
                <span> {secondary_creator} </span>
              </div> 
              )
            }   
	      	)
	      }
	    </div>
	  </div>
	)
  }
}



export default Table;
