import React from 'react';
import ReactDOM from 'react-dom/client';
import {ListData} from '../../models';
import {formatDistanceToNow} from 'date-fns';

class Task extends React.Component {
  //interface MyProps {
  //   ...
  // }

  // interface MyState {
  //   value: string
  // }

  // class App extends React.Component<MyProps, MyState> {
  //   ...
  // }

  //   onLabelClick = () => {
  //     console.log(`done ${this.props.list.description}`);
  //   };

  //   constructor(state: object) {
  //     super(state);
  //     this.state = {
  //       done: false,
  //     };
  //   }

  // если мы хотим поменять состоние в зависимости от предыдущего, то надо в сет стейт вызвать функцию
  state = {
    editing: false,
    value: '',
  };

  static defaultProps = {
    description: 'add description property',
    key: 1,
    onDeleted: () => {},
    onToggleDone: () => {},
    done: false,
    addItem: () => {},
    changeItem: () => {},
  };

  onEdit = () => {
    this.setState({
      editing: true,
      value: this.props.description,
    });
  };

  onLabelChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
      editing: false,
    });

    this.props.changeItem(this.state.value);
  };

  props: any = this.props;

  startTime = new Date().getTime();

  render() {
    const {editing, value} = this.state;

    let time = formatDistanceToNow(this.startTime, {
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
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onClick={this.props.onToggleDone}
          />
          <label>
            <span className='description'>
              {this.props.description}
            </span>
            <span className='created'>
              created {time} ago{' '}
            </span>
          </label>
          <button
            className='icon icon-edit'
            onClick={this.onEdit}
          ></button>
          <button
            className='icon icon-destroy'
            onClick={this.props.onDeleted}
          ></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            className='edit'
            type='text'
            onChange={this.onLabelChange}
            value={value}
          />
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
