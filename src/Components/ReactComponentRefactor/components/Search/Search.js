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
      <div className='header-wrapper'>
        <p className='header-intro'>NASA <u>IMAGES </u> Search Engine </p>
        <p className='header-intro-mobile'> Search </p>
        <form onSubmit={onSubmit}>
          <div className='input-form-wrapper'>
            <input 
              onChange={onChange}
              //value={value}
              className='input-text'
              placeholder='Key Words'
            />
            <button className='search-btn' type='submit'> 
              {children}
            </button>
          </div>
        </form>
      </div>
      <span className='input-counter'> showing {totalHits} works</span>
    </div>
	)
  }
}

export default Search;