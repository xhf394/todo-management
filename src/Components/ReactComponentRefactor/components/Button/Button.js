import React, { Component } from 'react';

class Button extends Component {
  render(){
	const {
	  onClick,
	  children,
	  //pass default className, can also pass by defaultprops
	  //has to be in class component, not const
	  // "=" not ":"
	  className = '',	
	} = this.props;
  

   return(
    <button
      onClick={onClick}
      type='button'
      className={className}
    >
      {children}
    </button>
  	)
  }
}


export default Button;
