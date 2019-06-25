import React, { Component } from 'react';
import { Button } from '../Button';

const Sort = ({
	onSort,
	sortKey,
	activeSortKey, 
	children
}) => {
  const sortStyleClass = ['button-primary','button-inline'];
  
  //add active style when sortKey = activeKey;
  if( sortKey === activeSortKey ) {
  	sortStyleClass.push('button-active')
  }
   
  return(
    <Button
      onClick={() => onSort(sortKey)}
      sortKey={sortKey}
      className={sortStyleClass.join(' ')}
    >
      {children}
    </Button>
  )
}
export default Sort; 
