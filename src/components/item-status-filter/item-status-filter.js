import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const { propFilter, onFilter } = this.props;

      const className = propFilter === name ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button type="button" 
                className={`btn ${ className }`}
                key={ name }
                onClick={ () => onFilter(name) }>
          { label }
        </button>
      );
    });

    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  } 
}