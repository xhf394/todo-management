import React, { Component } from 'react';
import { Button } from '../Button';

//define WithEither interface Fn
const WithEither = ( conditionalRenderingFn, EitherComponent ) => ( Component ) => (props) =>
  conditionalRenderingFn(props)
  ? <EitherComponent />
  : <Component { ...props } />

//define WithMaybe interface Fn
//const WithMaybe = ( conditionalRenderingFn ) => ( Component ) => ( props ) =>



const MoreButton = ({
  props, 
  children
}) =>
  {
  	return(
      <Button>
        {children}
      </Button>
  	)
  }

  export default MoreButton;