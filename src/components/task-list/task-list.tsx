import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from '../task';
// import {ListData} from '../../models';

// export interface ListData {
//     class: string;
//     description: string;
//   }

// interface ListData {
//   description: string;
// }

// const taskData: ListData[] = [
//   {
//     description: 'My task',
//   },
// ];

// let onDeleted = () => {
//   console.log('deleted');
// };

class TaskList extends React.Component {
  props: any = this.props;

  static defaultProps = {
    todoData: {},
    onDeleted: () => {},
    onToggleDone: () => {},
    addItem: () => {},
    changeItem: () => {},
  };

  render() {
    let listItem = this.props.todoData.map(
      ({
        id,
        description,
        done,
      }: {
        id: any;
        description: any;
        done: boolean;
      }) => {
        return (
          <Task
            description={description}
            key={id}
            onDeleted={() => this.props.onDeleted(id)}
            onToggleDone={() => this.props.onToggleDone(id)}
            done={done}
            addItem={() => this.props.addItem()}
            changeItem={(text: any) =>
              this.props.changeItem(text, id)
            }
          />
        );
      }
    );

    return <ul className='todo-list'>{listItem}</ul>;
  }
}

export default TaskList;
