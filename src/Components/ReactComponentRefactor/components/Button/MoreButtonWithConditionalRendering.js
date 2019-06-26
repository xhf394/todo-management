import React, { Component } from 'react';
import { Button } from '../Button';


//search in displayed list
const isSearched = ( searchTerm ) => item =>
  { 
    //exclude title = null;
    if( item.title === null) return false; 
    return item.title.toLowerCase().includes( searchTerm.toLowerCase() );
  }


//define withEither interface Fn
const withEither = ( conditionalRenderingFn, EitherComponent ) => ( Component ) => (props) =>
  conditionalRenderingFn(props)
  ? <EitherComponent />
  : <Component { ...props } />

//define withMaybe interface Fn
const withMaybe = ( conditionalRenderingFn ) => ( Component ) => ( props ) =>
  conditionalRenderingFn(props)
  ? null
  : <Component {...props } />

/** Conditional Rendering Fn **/
//Loading Component Condition
const isLoadingConditionalFn = (props) => props.isLoading;

//Empty Message Component Condition
const isEmptyConditionalFn = (props) => !props.list.filter(isSearched(props.searchTerm)).length;

//null
const nullConditionFn = (props) => !props.list;

/** Conditional Components **/
//Loading Component
const Loading = () => 
  <div>
    <p>Loading...</p>
  </div>

//Is Empty Component
const EmptyMessage = () => 
  <div>
    <p> Nothing to show. </p>
  </div>


  const MoreButtonWithNull = withMaybe(nullConditionFn);
  const MoreButtonWithLoading = withEither(isLoadingConditionalFn, Loading);
  const MoreButtonWithEmpty = withEither(isEmptyConditionalFn, EmptyMessage);

  const MoreButtonWithConditionalRendering = MoreButtonWithLoading(MoreButtonWithEmpty(MoreButtonWithNull( Button )));



  export default MoreButtonWithConditionalRendering;