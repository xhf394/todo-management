import React, { Component } from 'react';

import './SearchInactive.css';

class SearchInactive extends Component {
  
  render() {
    const {
    	children,
    	onChange,
    	value,
    	onSubmit,
      totalHits
    } = this.props;

	return (
    <div className='inactive-input-wrapper'>
      <div className='inactive-header-wrapper'>
        <p className='inactive-header-intro'>Our Conquest is the Sea of Stars </p>
        <form onSubmit={onSubmit}>
          <div className='inactive-input-form-wrapper'>
            <input 
              onChange={onChange}
              //value={value}
              className='inactive-input-text'
              placeholder='Key Words'
            />
            <button className='inactive-search-btn' type='submit'> 
              {children}
            </button>
          </div>
        </form>
      </div>
      <span className='inactive-input-counter'> showing {totalHits} works</span>
    </div>
	)
  }
}

export default SearchInactive;