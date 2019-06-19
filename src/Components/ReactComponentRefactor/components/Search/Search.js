import React, { Component } from 'react';


class Search extends Component {
  
  render() {
    const {
    	children,
    	onChange,
    	value,
    	onSubmit,
    } = this.props;

	return (
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          value={value}
        />
        <button> 
          {children}
        </button>
      </form>

	)
  }
}

export default Search;