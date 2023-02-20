import React from 'react';

type TypeProps = {
  onFilterChange: (text: string) => void;
  filter: string;
};

type TypeButton = {
  name: string;
  label: string;
};
class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  props: TypeProps = this.props;

  render() {
    const buttons = this.buttons.map((button: TypeButton) => {
      const isActive = this.props.filter === button.name;
      const clazz = isActive ? 'selected' : '';
      return (
        <li key={button.name}>
          <button className={clazz} onClick={() => this.props.onFilterChange(button.name)}>
            {button.label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

export default TasksFilter;
