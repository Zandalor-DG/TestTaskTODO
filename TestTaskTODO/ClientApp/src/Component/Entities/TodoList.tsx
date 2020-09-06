import { TodoItem } from './TodoItem';

export interface TodoList {
  name: string;
  id: number;
  createDate: Date;
  countAllItems: number;
  completedItemsCount: number;
  items: TodoItem[];
}
