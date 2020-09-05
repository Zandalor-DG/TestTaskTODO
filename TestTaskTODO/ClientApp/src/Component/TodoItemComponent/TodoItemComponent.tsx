import React from 'react';

export interface Props {
  Name: string;
  Id: number;
  CreateDate: Date;
  CompletedTask: boolean;
}

function TodoItem() {
  return <div className="TodoItem"></div>;
}

export default TodoItem;
