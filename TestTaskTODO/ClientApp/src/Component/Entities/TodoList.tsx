import { TodoItem } from './TodoItem';

export interface TodoList {
  name: String;
  id: Number;
  createDate: Date;
  countAllItems: Number;
  completedItemsCount: Number;
  items: TodoItem[];
}
