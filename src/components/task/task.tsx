import React from 'react';
import { formatDistanceToNow } from 'date-fns';

type TypeProps = {
  description: string;
  key: number;
  onDeleted: (e: React.MouseEvent<HTMLElement>) => void;
  onToggleDone: (e: React.MouseEvent<HTMLElement>) => void;
  done: boolean;
  addItem: () => void;
  changeItem: (text: string) => void;
};
class Task extends React.Component {
  state = {
    editing: false,
    value: '',
  };

  static defaultProps = {
    description: 'add description property',
    key: 1,
    onDeleted: () => {
      1;
    },
    onToggleDone: () => {
      1;
    },
    done: false,
    addItem: () => {
      1;
    },
    changeItem: () => {
      1;
    },
  };

  onEdit = () => {
    this.setState({
      editing: true,
      value: this.props.description,
    });
  };

  onLabelChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    });
    console.log(this.props);
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      editing: false,
    });

    this.props.changeItem(this.state.value);
  };

  props: TypeProps = this.props;

  startTime = new Date().getTime();

  render() {
    const { editing, value } = this.state;

    const time = formatDistanceToNow(this.startTime, {
      includeSeconds: true,
    });

    let className = '';
    if (this.props.done) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.props.onToggleDone} />
          <label>
            <span className="description">{this.props.description}</span>
            <span className="created">created {time} ago </span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdit}></button>
          <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input className="edit" type="text" onChange={this.onLabelChange} value={value} />
        </form>
      </li>
    );
  }
}

// const Task = (props: ListProps) => {
//   console.log(props);
//   return (
//     <li className={props.list.class}>
//       <div className='view'>
//         <input className='toggle' type='checkbox' />
//         <label>
//           <span className='description'>
//             {props.list.description}
//           </span>
//           <span className='created'>
//             created 5 minutes ago
//           </span>
//         </label>
//         <button className='icon icon-edit'></button>
//         <button className='icon icon-destroy'></button>
//       </div>
//     </li>
//   );
// };
export default Task;
