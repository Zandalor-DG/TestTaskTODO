import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import './App.css';
import TodoListComponent from './Component/TodoListComponent/TodoListComponent';
import TodoItemComponent from './Component/TodoItemComponent/TodoItemComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={TodoListComponent} />
          <Route
            path="/api/todoitem/:TodoListId"
            component={TodoItemComponent}
          />
          <Route path="/ask" />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
