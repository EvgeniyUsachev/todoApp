import React from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

type TypeTask = {
  description?: string;
  done: boolean;
  id: number;
};

interface IState {
  todoData: TypeTask[];
}

class App extends React.Component {
  id = 100;

  state = {
    todoData: [this.createTodoItem('drink coffee')],
    filter: 'all',
  };

  createTodoItem(description: string) {
    return {
      description,
      done: false,
      id: this.id++,
    };
  }

  deleteItem = (id: number) => {
    this.setState(({ todoData }: IState) => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, ...after];
      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (text: string) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }: IState) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  changeItem = (text: string, id: number) => {
    console.log(text, id);
    this.setState(({ todoData }: IState) => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, description: text };

      //put new object on array
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, newItem, ...after];
      return {
        todoData: newTodoData,
      };
    });
  };

  onToggleDone = (id: number) => {
    this.setState(({ todoData }: IState) => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      //put new object on array
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, newItem, ...after];
      return {
        todoData: newTodoData,
      };
    });
    // console.log('toggle done', id);
  };

  onFilterChange = (filterName: string) => {
    this.setState({
      filter: filterName,
    });
  };

  filter = (items: Array<TypeTask>, filter: string) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'done') {
      return items.filter((task: TypeTask) => {
        return task.done;
      });
    } else if (filter === 'active') {
      return items.filter((task: TypeTask) => {
        return !task.done;
      });
    }
  };

  clearCompleted = () => {
    this.setState(({ todoData }: IState) => {
      const newArr: Array<TypeTask> = [];
      todoData.forEach((item: TypeTask) => {
        if (!item.done) {
          newArr.push(item);
        }
      });
      return { todoData: newArr };
    });
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done || 0).length;

    const visibleItems = this.filter(this.state.todoData, this.state.filter);

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todoData={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          addItem={this.addItem}
          changeItem={this.changeItem}
        />
        <Footer
          total={this.state.todoData.length}
          doneCount={doneCount}
          onFilterChange={this.onFilterChange}
          filter={this.state.filter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
