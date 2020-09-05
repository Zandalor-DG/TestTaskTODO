import React from 'react';
import API from 'axios';
import { TodoItem } from '../Entities/TodoItem';
import * as H from 'history';

interface TodoItemsState {
  Items: TodoItem[];
  name: string;
}

interface TodoItemsMatch {
  TodoListId: string;
}

export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface TodoItemsProps extends RouteComponentProps<TodoItemsMatch> {}

export default class TodoItemComponent extends React.Component<TodoItemsProps> {
  state: TodoItemsState = {
    Items: [],
    name: '',
  };

  todoItemGET = (id: string): void => {
    API.get(`https://localhost:44318/api/todolist/${id}`).then((res) => {
      const todoItems: TodoItemsState = res.data.items;
      this.setState({
        Items: todoItems,
      });
    });
  };

  componentDidMount() {
    this.todoItemGET(this.props.match.params.TodoListId);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.Items.map((todoItem) => (
            <li>
              {todoItem.completedTask ? todoItem.name : todoItem.completedTask}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
