import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  
  render() {
    const {
    	children,
    	onChange,
    	value,
    	onSubmit,
    } = this.props;

	return (
    <div className='input-wrapper'>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          value={value}
          className='input-text'
          type='search'
        />
        <button className='search-btn' type='submit'> 
          {children}
        </button>
      </form>
    </div>
	)
  }
}

export default Search;