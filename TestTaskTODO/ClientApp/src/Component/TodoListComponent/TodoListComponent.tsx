import React, { useState, useEffect } from 'react';
import API from 'axios';
import { TodoItem } from '../Entities/TodoItem';
import { TodoList } from '../Entities/TodoList';
import css from './TodoListComponentCss.module.css';

export interface TodoListVM {
  Items: TodoList[];
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
      { name: name },
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.state.Items.map((person) => (
            <li>{person.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
