import React, { Component} from 'react';
import { Button, SortButton } from '../Button';
import { sortBy } from 'lodash';
import './Table.css';


//a list of Fn used to sort list
const SORTS = {
  //A default list should be defined, not sorted
  RELEVANCE: list => list,
  TITLE: list => sortBy(list, function(o) {return o.data[0].title}),
  DATE: list => sortBy(list, function(o) {
    return new Date(o.data[0].date_created);
  }),
  CENTER: list => sortBy(list, function(o) {return o.data[0].center}),
  //COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  //POINTS: list => sortBy(list, 'points').reverse(),	
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
      sortKey: 'RELEVANCE',	
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
	  <div className="table"> 
      <div className='table-btn-wrapper' >
        <SortButton
          onSort={this.onSort}
          sortKey={'RELEVANCE'}
          activeSortKey={sortKey}
        >
          Relevance
        </SortButton>
        <SortButton
          onSort={this.onSort}
          sortKey={'TITLE'}
          activeSortKey={sortKey}
        >
          Title
        </SortButton>
        <SortButton
          onSort={this.onSort}
          sortKey={'DATE'}
          activeSortKey={sortKey}
        >
          Date
        </SortButton>
        <SortButton
          onSort={this.onSort}
          sortKey={'CENTER'}
          activeSortKey={sortKey}
        >
          Center
        </SortButton>  
      </div>
	    <div className='table-grid'>
	      {sortedList.map(item => 
            {
	      	    const { data, links } = item;
              const {nasa_id, title, secondary_creator, center, date_created } = data[0];
              const { href } = links[0];

              return (
                <div key={nasa_id} className='table-grid-item'>
                  <div className='table-grid-item-inner'>
                    <span> 
                      <img src={href} alt=""/>
                    </span>
                    <div className='table-grid-item-content'>
                      <h4 className='table-grid-item-title'> {title} </h4>
                      <span className='table-grid-item-center'> {center} </span>
                      <span className='table-grid-item-date'> {date_created} </span>
                    </div>  
                  </div>
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
