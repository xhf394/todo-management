import React, { Component } from 'react';



const AddNewNote = ({addTodo}) => {
	//input tracker
	let input;

	return(
	  <div className="todo-New">
	  	<span> add new note </span>

	  	<input 
	  	  //add a callback ref in this section
	  	  ref={node => 
	  	  	{input = node; 
	  	  	}}
	  	/> 

        <button onClick={() => {
        	addTodo(input.value);
        	input.value = null;
        }}> 
          
        </button>
      </div>
		)
}


export default AddNewNote;
