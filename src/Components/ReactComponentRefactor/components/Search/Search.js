import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  
  render() {
    const {
    	children,
    	onChange,
    	value,
    	onSubmit,
      totalHits
    } = this.props;

	return (
    <div className='input-wrapper'>
      <form onSubmit={onSubmit}>
        <div className='input-form-wrapper'>
          <input 
            onChange={onChange}
            //value={value}
            className='input-text'
            placeholder='Key Words, Title, Name, Place, Date'
          />
          <button className='search-btn' type='submit'> 
            {children}
          </button>
        </div>
      </form>
      <span className='input-counter'> showing {totalHits} works</span>
    </div>
	)
  }
}

export default Search;