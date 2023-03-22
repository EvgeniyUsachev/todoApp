import React from 'react';

import Task from '../task';

type TypeProps = {
  todoData: any;
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
  // addItem: (text: string, minutes?: number, seconds?: number) => void;
  changeItem: (text: string, id: number) => void;
  onTick: (id: number) => void;
  // timerIsActive: boolean;
  // onPlay: (id: number) => void;
  // onStop: () => void;
};
const TaskList = (props: TypeProps) => {
  // props: TypeProps = this.props;

  // static defaultProps = {
  //   todoData: {},
  //   onDeleted: () => {
  //     1;
  //   },
  //   onToggleDone: () => {
  //     1;
  //   },
  //   addItem: () => {
  //     1;
  //   },
  //   changeItem: () => {
  //     1;
  //   },
  // };

  const listItem = props.todoData.map(
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
          onDeleted={() => props.onDeleted(id)}
          onToggleDone={() => props.onToggleDone(id)}
          done={done}
          // addItem={() => this.props.addItem('asd')}
          changeItem={(text: string) => props.changeItem(text, id)}
          minutes={minutes}
          seconds={seconds}
          // onPlay={() => this.props.onPlay(id)}
          // onStop={() => this.props.onStop()}
          timerIsActive={timerIsActive}
          onTick={() => props.onTick(id)}
        />
      );
    }
  );

  return <ul className="todo-list">{listItem}</ul>;
};
export default TaskList;
