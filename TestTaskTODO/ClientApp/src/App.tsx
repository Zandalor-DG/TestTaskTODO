import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import './App.css';
import TodoListComponent from './Component/TodoListComponent/TodoListComponent';
import TodoItemsComponent from './Component/TodoItemComponent/TodoItemsComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect from="/todolist/" to="/" />
          <Route exact path="/" component={TodoListComponent} />
          <Route
            path="/api/todoitem/:TodoListId"
            component={TodoItemsComponent}
          />
          <Route path="/ask" />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
