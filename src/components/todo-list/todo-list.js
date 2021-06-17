import React from 'react';

import TodoListItem from '../todo-list-item';

import './todo-list.css';

const TodoList = ({ data, onDeleted, onDone, onImportant }) => {

  const elements = data.map((item) => {

    const { id,...itemProps } = item;

    return (
      <li key={ id } className="list-group-item">
        <TodoListItem onDone={ () => onDone(id) }
                      onImportant={ () => onImportant(id) }
                      onDeleted={ () => onDeleted(id) }
                      { ...itemProps } />
      </li>
    );
  });

  return (
    <ul className="todo-list list-group">
      { elements }
    </ul>
  );
};

export default TodoList;