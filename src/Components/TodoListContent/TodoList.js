import React, { Component } from 'react';
import AddNewNote from './AddNewNote';
import TodoListing from './TodoListing';
import ButtonHandler from './ButtonHandler';

import todoList from "./todoList.css";


class TodoList extends Component {
  constructor() {
  	super();

  }
  render() {
    return (
      <div className="todo-List">
        <header className="todo-Header" > 
          todo-management 
        </header>
        <AddNewNote />
        <TodoListing />
        <ButtonHandler />
      </div>
    );
  }
}

export default TodoList;
