import React from 'react';

type TypeProps = {
  addItem: (description: string) => void;
};

export default class NewTaskForm extends React.Component {
  state = {
    description: '',
  };

  static defaultProps = {
    addItem: () => console.log('default props works'),
  };

  props: TypeProps = this.props;

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.addItem(this.state.description);
    this.setState({
      description: '',
    });
  };

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.description}
        />
      </form>
    );
  }
}
