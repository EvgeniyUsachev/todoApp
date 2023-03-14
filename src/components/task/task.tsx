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
  minutes: string;
  seconds: string;
  onStop: () => void;
  timerIsActive: boolean;
  onPlay: () => void;
  onTick: () => void;
};
class Task extends React.Component {
  state = {
    editing: false,
    value: '',
  };

  interval: any;

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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.onTick();
    }, 1000);
  }

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
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      editing: false,
    });

    this.props.changeItem(this.state.value);
  };

  onPlay = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.onTick();
    }, 1000);
  };

  onStop = () => {
    clearInterval(this.interval);
  };

  // tick = (minutes: string, seconds: string) => {
  //   if (Number(minutes) !== 0 && Number(seconds) === 0) {
  //     this.setState(({ todoData }: IState) => {
  //       minutes:
  //     });
  //   }
  // };

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

    console.log('mins', this.props.minutes);
    console.log('active', this.props.timerIsActive);

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.props.onToggleDone} />
          <label>
            <span className="title">{this.props.description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.onPlay}></button>
              <button className="icon icon-pause" onClick={this.onStop}></button>
              {this.props.minutes}:{this.props.seconds}
            </span>
            <span className="description">created {time} ago </span>
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

export default Task;
