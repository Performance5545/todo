import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];

      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      return [
        ...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)
      ];
  };

  onAddedItem = (label) => {
    this.setState(({ todoData }) => {
      const newItem = this.createItem(label);

      const newData = [...todoData, newItem];

      return {
        todoData: newData
      };
    }); 
  };

  onDeleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onSearchItem = (data, term) => {
    if (term.length === 0) {
      return data;
    }

    return data.filter((item) => item.label.toLowerCase()
      .indexOf(term.toLowerCase()) > -1);
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterItem = (data, filter) => {
    switch(filter) {
      case 'all':
        return data;
      case 'active': 
        return data.filter((item) => !item.done);
      case 'done':
        return data.filter((item) => item.done);
      default:
        return data;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {

    const { todoData, term, filter} = this.state;

    const doneCount = todoData.filter((item) => item.done).length;

    const todoCount = todoData.length - doneCount;

    const visiableItems = this.onFilterItem(this.onSearchItem(todoData, term), filter);

    return (
      <div className="todo-app">
       <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={ this.onSearchChange } />
          <ItemStatusFilter propFilter={ filter } onFilter={ this.onFilterChange } />
        </div>
        <TodoList onDone={ this.onToggleDone }
                  onImportant={ this.onToggleImportant }
                  onDeleted={ this.onDeleteItem }
                  data={ visiableItems }
                  classNames={ this.classNames } />
        <ItemAddForm onAdded={ this.onAddedItem } />
      </div>
    );
  }
};