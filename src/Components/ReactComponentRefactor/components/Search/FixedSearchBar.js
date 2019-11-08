import React, { Component, useState } from 'react';

import './FixedSearchBar.css';

const FixedSearchBar = ({onSubmit, onChange, value, totalHits,children}) => {
  
  const [isClicking, setIsClicking] = useState(false);
  
  const inputStyle = ['fixed-input-text'];
  const fixedBtnStyle =['fixed-search-btn'];

  if(isClicking) {
    inputStyle.push('fixed-input-text-focused');
    fixedBtnStyle.push('fixed-search-btn-focused');
  }  
 
  return(
    <div className='fixed-search-bar-flex'>
      <form onSubmit={onSubmit}>
        <div className='fixed-search-bar-wrapper'>
          <input 
            onChange={onChange}
            value={value}
            className={inputStyle.join(' ')}
            onFocus={() => setIsClicking(true)}
            onBlur={() => setIsClicking(false)}
            placeholder='Key Words'
          />
          <button className={fixedBtnStyle.join(' ')} type='submit'> 
            {children}
          </button>
        </div>
     </form>
    </div> 
  )
}

export default FixedSearchBar;
