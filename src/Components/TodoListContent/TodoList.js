import React, { Component } from 'react';
import AddNewNote from './AddNewNote';
import TodoListing from './TodoListing';
import ButtonHandler from './ButtonHandler';

import todoList from "./todoList.css";


class TodoList extends Component {
  constructor(props) {
  	super(props);
  	//set initial state;
  	this.state = {
  		data: [],
  	}
    this.addTodo = this.addTodo.bind(this);
  }

  //add new todo note handler
  addTodo(val) {
  	//assemble data
  	const todo = {text: val}

  	//update data
  	this.state.data.push(todo);

  	//update state
  	this.setState({
  		data: this.state.data,
  	})
  }




  render() {
    return (
      <div className="todo-List">
        <header className="todo-Header" > 
          todo-management 
        </header>
        <AddNewNote addTodo={this.addTodo}/>
        <TodoListing todos={this.state.data} />
        <ButtonHandler />
      </div>
    );
  }
}

export default TodoList;
