import React from 'react';

type TypeProps = {
  onFilterChange: (text: string) => void;
  filter: string;
};

type TypeButton = {
  name: string;
  label: string;
};
const TasksFilter = (props: TypeProps) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  // props: TypeProps = this.props;

  const buttonsArr = buttons.map((button: TypeButton) => {
    const isActive = props.filter === button.name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={button.name}>
        <button className={clazz} onClick={() => props.onFilterChange(button.name)}>
          {button.label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttonsArr}</ul>;
};

export default TasksFilter;
