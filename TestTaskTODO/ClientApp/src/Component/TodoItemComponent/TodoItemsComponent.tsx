import React from 'react';
import API from 'axios';
import { TodoItem } from '../Entities/TodoItem';
import H from 'history';
import css from './TodoItemComponentCss.module.css';
import ItemComponent from './Components/ItemComponent';

interface TodoItemsState {
  Items: TodoItem[];
  name: string;
  inProgress: boolean;
  filter: string;
}

interface TodoItemsMatch {
  TodoListId: number;
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

interface TodoItemCreateModel {
  todoListId: number;
  name: string;
}

export default class TodoItemsComponent extends React.Component<
  TodoItemsProps
> {
  state: TodoItemsState = {
    Items: [],
    name: '',
    inProgress: true,
    filter: 'all',
  };

  todoItemGET = (id: number): void => {
    // const undone = true;
    // const search = '';

    API.get(`https://localhost:44318/api/todolist/${id}`).then((res) => {
      const todoItems: TodoItemsState = res.data.items;
      this.setState({
        Items: todoItems,
      });
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ filter: event.target.value });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const config = { headers: { 'Content-Type': 'application/json' } };
    const value: TodoItemCreateModel = {
      name: this.state.name,
      todoListId: this.props.match.params.TodoListId,
    };

    API.post(
      `https://localhost:44318/api/todoitem/`,
      JSON.stringify(value),
      config,
    ).then((res) => {
      this.todoItemGET(value.todoListId);
      this.setState({ name: '' });
    });
  };

  componentDidMount() {
    this.todoItemGET(this.props.match.params.TodoListId);
  }

  render() {
    return (
      <div>
        <div>
          <input
            name="filtered"
            id="all"
            type="radio"
            value="all"
            checked={this.state.filter === 'all'}
            onChange={this.handleRadioChange.bind(this)}
          />
          <label htmlFor="all">All</label>
          <input
            name="filtered"
            id="undone"
            type="radio"
            value="undone"
            checked={this.state.filter === 'undone'}
            onChange={this.handleRadioChange.bind(this)}
          />
          <label htmlFor="undone">Undone</label>
        </div>

        {this.state.Items.map((itemTodo) => (
          <ItemComponent
            key={itemTodo.id}
            todoListId={this.props.match.params.TodoListId}
            inProgress={true}
            itemName={itemTodo.name}
            itemId={itemTodo.id}
            itemCompletedTask={itemTodo.completedTask}
          />
        ))}

        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
