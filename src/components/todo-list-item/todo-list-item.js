import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ label, done, important, onDeleted, onDone, onImportant }) => {

  let classNames = 'todo-list-item';

  if (important) {
    classNames += ' important';
  }

  if (done) {
    classNames += ' done';
  }

  return (
    <span className={ classNames }>
      <span
        className="todo-list-item-label"
        onClick={ onDone }>
        { label }
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={ onImportant }>
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={ onDeleted }>
        <i className="fa fa-trash-o" />
      </button>
    </span>
  );
};

export default TodoListItem;