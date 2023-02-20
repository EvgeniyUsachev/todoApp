import React from 'react';

import TasksFilter from '../tasks-filter';

type TypeProps = {
  total: number;
  doneCount: number;
  onFilterChange: (text: string) => void;
  filter: string;
  clearCompleted: () => void;
};

const Footer = (props: TypeProps) => {
  return (
    <footer className="footer">
      <span className="todo-count">{props.total - props.doneCount} items left</span>
      <TasksFilter onFilterChange={(text: string) => props.onFilterChange(text)} filter={props.filter} />
      <button className="clear-completed" onClick={props.clearCompleted}>
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
