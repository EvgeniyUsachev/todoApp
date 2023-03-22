import React from 'react';

type TypeProps = {
  addItem: (description: string, minutes: string, seconds: string) => void;
};

const NewTaskForm = (props: TypeProps) => {
  const [description, setDescription] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [seconds, setSeconds] = React.useState('');

  // defaultProps = {
  //   addItem: () => console.log('default props works'),
  // };

  // props: TypeProps = this.props;

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    setDescription(e.currentTarget.value);
  };

  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    setMinutes(e.currentTarget.value);
  };

  const onSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    setSeconds(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    props.addItem(description, minutes, seconds);
    setDescription('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <label>
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            autoFocus
            onChange={onLabelChange}
            value={description}
            name="todo"
          />
        </label>
        <input className="new-todo-form__timer" placeholder="Min" autoFocus value={minutes} onChange={onMinuteChange} />
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus value={seconds} onChange={onSecondChange} />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    </header>
  );
};

export default NewTaskForm;
