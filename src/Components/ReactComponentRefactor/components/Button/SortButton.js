import React, { Component } from 'react';
import { Button } from '../Button';

const Sort = ({
	onSort,
	sortKey, 
	children
}) =>
  <Button
    onClick={() => onSort(sortKey)}
    sortKey={sortKey}
  >
    {children}
  </Button>

export default Sort; 
