import React, { Component } from 'react';
import TodoList from './Components/TodoListContent/TodoList';
import TheRoad from './Components/TheRoad/TheRoad'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<TodoList />
      	<TheRoad />

      </div>
    );
  }
}

export default App;
