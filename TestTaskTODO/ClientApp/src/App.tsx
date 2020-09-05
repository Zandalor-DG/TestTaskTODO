import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import TodoList from './Component/TodoListComponent/TodoListComponent';
import TodoItem from './Component/TodoItemComponent/TodoItemComponent';
import NotFoundPage from './NotFoundPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={TodoList} />
          <Route path="/todoitem" component={TodoItem} />
          <Route path="/ask" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
