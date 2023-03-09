import React from 'react';

type TypeProps = {
  addItem: (description: string, minutes: string, seconds: string) => void;
};

export default class NewTaskForm extends React.Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  static defaultProps = {
    addItem: () => console.log('default props works'),
  };

  props: TypeProps = this.props;

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    this.setState({
      description: e.currentTarget.value,
    });
  };

  onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    this.setState({
      minutes: e.currentTarget.value,
    });
  };

  onSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    this.setState({
      seconds: e.currentTarget.value,
    });
  };

  onSubmit = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    this.props.addItem(this.state.description, this.state.minutes, this.state.seconds);
    this.setState({
      description: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <label>
            <input
              type="text"
              className="new-todo"
              placeholder="Task"
              autoFocus
              onChange={this.onLabelChange}
              value={this.state.description}
              name="todo"
            />
          </label>
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.minutes}
            onChange={this.onMinuteChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.seconds}
            onChange={this.onSecondChange}
          />
          <input className="new-todo-form__submit" type="submit" />
        </form>
      </header>
    );
  }
}
