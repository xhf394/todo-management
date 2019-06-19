import React, { Component } from 'react';

const Button = ({
  onClick,
  children,
  //pass default className, can also pass by defaultprops
  className: '',	
}) =>
  <button
    onClick={onClick}
    type='button'
    className={className}
  >
    {children}  
  </button>


export default Button;
