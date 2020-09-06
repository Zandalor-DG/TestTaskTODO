import React from 'react';
import API from 'axios';
import { TodoItem } from '../../Entities/TodoItem';
import css from './TodoItemComponentCss.module.css';

interface TodoItemsState {
  Items: TodoItem[];
  name: string;
  inProgress: boolean;
}

interface Props {
  itemId: number;
  itemName: string;
  inProgress: boolean;
  todoListId: number;
  itemCompletedTask: boolean;
}

export default class ItemComponent extends React.Component<Props> {
  state: TodoItemsState = {
    Items: [],
    name: '',
    inProgress: this.props.itemCompletedTask,
  };

  todoItemGET = (id: number): void => {
    API.get(`https://localhost:44318/api/todolist/${id}`).then((res) => {
      const todoItems: TodoItemsState = res.data.items;
      this.setState({
        Items: todoItems,
      });
    });
  };

  handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inProgress: !this.state.inProgress });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const itemId = this.props.itemId;
    API.put(
      `https://localhost:44318/api/todoitem/`,
      JSON.stringify({ itemId }),
      config,
    );
  }

  render() {
    return (
      <ul>
        <li key={this.props.itemId}>
          {this.state.inProgress ? (
            <p>{this.props.itemName}</p>
          ) : (
            <p>
              {this.props.itemName}
              <input
                type="checkbox"
                checked={this.state.inProgress}
                onChange={this.handleCheckboxChange.bind(this)}
              />
            </p>
          )}
        </li>
      </ul>
    );
  }
}
