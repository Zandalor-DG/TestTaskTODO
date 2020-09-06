import React from 'react';
import API from 'axios';
import { TodoList } from '../Entities/TodoList';
import css from './TodoListComponentCss.module.css';
import { NavLink } from 'react-router-dom';
import { TodoItem } from '../Entities/TodoItem';

interface TodoListVM {
  Items: TodoList[];
  name: string;
}

interface TodoItemsVM {
  Items: TodoItem[];
  name: string;
}

export default class TodoListComponent extends React.Component {
  state: TodoListVM = {
    Items: [],
    name: '',
  };

  updateItems = (): void => {
    API.get(`https://localhost:44318/api/todolist`).then((res) => {
      const todoList: TodoList[] = res.data;
      this.setState({
        Items: todoList,
      });
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const config = { headers: { 'Content-Type': 'application/json' } };

    const name = this.state.name;

    API.post(
      `https://localhost:44318/api/todolist`,
      JSON.stringify(name),
      config,
    ).then((res) => {
      this.updateItems();
      this.setState({ name: '' });
    });
  };

  componentDidMount() {
    this.updateItems();
  }

  render() {
    return (
      <div className={css.TodoList}>
        <ul>
          {this.state.Items.map((todoListItem) => (
            <li key={todoListItem.id}>
              <NavLink to={'api/todoItem/' + todoListItem.id}>
                {todoListItem.name}(
                {`${todoListItem.completedItemsCount}/${todoListItem.countAllItems}`}
                )
              </NavLink>
            </li>
          ))}
        </ul>
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
