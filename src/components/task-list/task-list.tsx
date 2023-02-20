import React from 'react';

import Task from '../task';

type TypeProps = {
  todoData: any;
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
  addItem: (text: string) => void;
  changeItem: (text: string, id: number) => void;
};
class TaskList extends React.Component {
  props: TypeProps = this.props;

  static defaultProps = {
    todoData: {},
    onDeleted: () => {
      1;
    },
    onToggleDone: () => {
      1;
    },
    addItem: () => {
      1;
    },
    changeItem: () => {
      1;
    },
  };

  render() {
    const listItem = this.props.todoData.map(
      ({ id, description, done }: { id: number; description: string; done: boolean }) => {
        return (
          <Task
            description={description}
            key={id}
            onDeleted={() => this.props.onDeleted(id)}
            onToggleDone={() => this.props.onToggleDone(id)}
            done={done}
            addItem={() => this.props.addItem('asd')}
            changeItem={(text: string) => this.props.changeItem(text, id)}
          />
        );
      }
    );

    return <ul className="todo-list">{listItem}</ul>;
  }
}

export default TaskList;
