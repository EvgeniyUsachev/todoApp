import React from 'react';
import { formatDistanceToNow } from 'date-fns';

type TypeProps = {
  description: string;
  // key: number;
  onDeleted: (e: React.MouseEvent<HTMLElement>) => void;
  onToggleDone: (e: React.MouseEvent<HTMLElement>) => void;
  done: boolean;
  // addItem: () => void;
  changeItem: (text: string) => void;
  minutes: string;
  seconds: string;
  // onStop: () => void;
  timerIsActive: boolean;
  // onPlay: () => void;
  onTick: () => void;
};
const Task = (props: TypeProps) => {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState('');

  const interval: any = React.useRef();

  //  defaultProps = {
  //   description: 'add description property',
  //   key: 1,
  //   onDeleted: () => {
  //     1;
  //   },
  //   onToggleDone: () => {
  //     1;
  //   },
  //   done: false,
  //   addItem: () => {
  //     1;
  //   },
  //   changeItem: () => {
  //     1;
  //   },
  // };

  React.useEffect(() => {
    interval.current = setInterval(() => {
      props.onTick();
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  React.useEffect(() => {
    if (props.done) {
      clearInterval(interval.current);
    }
  });

  const onEdit = () => {
    setEditing(true);
    setValue(props.description);
  };

  const onLabelChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);

    props.changeItem(value);
  };

  const onPlay = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      props.onTick();
    }, 1000);
  };

  const onStop = () => {
    clearInterval(interval.current);
    console.log('onStop clicked');
  };

  // tick = (minutes: string, seconds: string) => {
  //   if (Number(minutes) !== 0 && Number(seconds) === 0) {
  //     this.setState(({ todoData }: IState) => {
  //       minutes:
  //     });
  //   }
  // };

  // props: TypeProps = this.props;

  const startTime = new Date().getTime();

  // const { editing, value } = this.state;

  const time = formatDistanceToNow(startTime, {
    includeSeconds: true,
  });

  let className = '';
  if (props.done) {
    className = 'completed';
  }
  if (editing) {
    className = 'editing';
  }

  // console.log('mins', props.minutes);
  // console.log('active', props.timerIsActive);

  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={props.onToggleDone} />
        <label>
          <span className="title">{props.description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onPlay}></button>
            <button className="icon icon-pause" onClick={onStop}></button>
            {props.minutes}:{props.seconds}
          </span>
          <span className="description">created {time} ago </span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={props.onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input className="edit" type="text" onChange={onLabelChange} value={value} />
      </form>
    </li>
  );
};

export default Task;
