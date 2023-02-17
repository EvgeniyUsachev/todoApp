import React from 'react';
import ReactDOM from 'react-dom/client';

export default class NewTaskForm extends React.Component {
  state = {
    description: '',
  };

  static defaultProps = {
    addItem: () => console.log('default props works'),
  };

  props: any = this.props;

  onLabelChange = (e: any) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    this.props.addItem(this.state.description);
    this.setState({
      description: '',
    });
  };

  render() {
    return (
      <form className='header' onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type='text'
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.description}
        />
      </form>
    );
  }
}
