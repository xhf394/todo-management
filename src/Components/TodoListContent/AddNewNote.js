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
        	//initial value as null if no input;
        	input.value = null;
        }}> 
          
        </button>
      </div>
		)
}


export default AddNewNote;
