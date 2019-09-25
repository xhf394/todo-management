import React, { Component, useRef, useLayoutEffect, useState } from 'react';
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

const TableGrid = (props) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const sortedList = props.sortedList;
  //hold the time for setTimeout and clearInterval
  let movement_timer = null;

  const RESET_TIMEOUT = 100;

  const test_dimensions = () => {

    if(targetRef.current){
      let rect = targetRef.current.getBoundingClientRect();
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      })
    }
  }

  useLayoutEffect(() => {
    test_dimensions();
  }, []);

  window.addEventListener("resize", () => {
    clearInterval(movement_timer);
    movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
  })
  
  

  for(let i = 0; i < sortedList.length; i++) {
    let width = dimensions.width;
    const left = (i % 4) * 0.25 * width;

    //define style
    const tableGridItemStyle = {
      left: left,
      position: 'absolute',
    }
    


    return(
      <div className='table-grid' ref={targetRef}>
      {
        sortedList.map(item => 
          {
            const { data, links } = item;
            const {nasa_id, title, secondary_creator, center, date_created } = data[0];
            const { href } = links[0];

            return (
              <div key={nasa_id} className='table-grid-item'>
                <div className='table-grid-item-pic'>
                  <img src={href} alt=""/>
                </div>
                <div className='table-grid-item-content'>
                  <h4 className='table-grid-item-title'> {title} </h4>
                  <span className='table-grid-item-center'> {center} </span>
                  <span className='table-grid-item-date'> {date_created} {dimensions.width} </span>
                </div> 
              </div> 
            )
          }   
        )
      }
    </div>


    )
  }

  return(
    <div className='table-grid' ref={targetRef}>
      {
        sortedList.map(item => 
          {
            const { data, links } = item;
            const {nasa_id, title, secondary_creator, center, date_created } = data[0];
            const { href } = links[0];

            return (
              <div key={nasa_id} className='table-grid-item'>
                <div className='table-grid-item-pic'>
                  <img src={href} alt=""/>
                </div>
                <div className='table-grid-item-content'>
                  <h4 className='table-grid-item-title'> {title} </h4>
                  <span className='table-grid-item-center'> {center} </span>
                  <span className='table-grid-item-date'> {date_created} {dimensions.width} </span>
                </div> 
              </div> 
            )
          }   
        )
      }
    </div>    
  )
}


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

      <TableGrid
        sortedList={sortedList}
      />
	  </div>
	)
  }
}



export default Table;
