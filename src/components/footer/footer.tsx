import React from 'react';
import ReactDOM from 'react-dom';
import TasksFilter from '../tasks-filter';

const Footer = (props: any) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        {props.total - props.doneCount} items left
      </span>
      <TasksFilter
        onFilterChange={(text: any) =>
          props.onFilterChange(text)
        }
        filter={props.filter}
      />
      <button
        className='clear-completed'
        onClick={props.clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  total: 0,
  doneCount: 0,
  onFilterChange: () => console.log('default props works'),
  filter: 'all',
  clearCompleted: () => console.log('default props works'),
};

export default Footer;
