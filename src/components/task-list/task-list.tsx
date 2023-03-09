import React from 'react';

import Task from '../task';

type TypeProps = {
  todoData: any;
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
  addItem: (text: string, minutes?: number, seconds?: number) => void;
  changeItem: (text: string, id: number) => void;
  onTick: (id: number) => void;
  // timerIsActive: boolean;
  onPlay: (id: number) => void;
  onStop: () => void;
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
      ({
        id,
        description,
        done,
        minutes,
        seconds,
        timerIsActive,
      }: {
        id: number;
        description: string;
        done: boolean;
        minutes: string;
        seconds: string;
        timerIsActive: boolean;
      }) => {
        return (
          <Task
            description={description}
            key={id}
            onDeleted={() => this.props.onDeleted(id)}
            onToggleDone={() => this.props.onToggleDone(id)}
            done={done}
            // addItem={() => this.props.addItem('asd')}
            changeItem={(text: string) => this.props.changeItem(text, id)}
            minutes={minutes}
            seconds={seconds}
            onPlay={() => this.props.onPlay(id)}
            onStop={() => this.props.onStop()}
            timerIsActive={timerIsActive}
            onTick={() => this.props.onTick(id)}
          />
        );
      }
    );

    return <ul className="todo-list">{listItem}</ul>;
  }
}
export default TaskList;
