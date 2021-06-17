import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  search = (event) => {
    const term = event.target.value;

    this.setState({ term });

    this.props.onSearch(term);
  };

  render() {
    return (
      <input className="form-control search-input" 
             placeholder="search"
             onChange={ this.search }
             value={ this.state.term } />
    );
  }
};