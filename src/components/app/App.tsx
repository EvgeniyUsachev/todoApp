import React from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

type TypeTask = {
  description?: string;
  done: boolean;
  id: number;
  minutes: string;
  seconds: string;
};

interface IState {
  todoData: TypeTask[];
}

class App extends React.Component {
  id = 100;
  interval: any;

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(description: string, minutes: string, seconds: string) {
    return {
      description,
      done: false,
      id: this.id++,
      minutes,
      seconds,
      timerIsActive: true,
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

  addItem = (text: string, minutes: string, seconds: string) => {
    if (!minutes.match(/^\d+$/) || !seconds.match(/^\d+$/)) {
      alert('Неверный формат времени ');
      return;
    }
    if (Number(seconds) > 59) {
      alert('Секунда не может превышать 60');
      return;
    }
    if (minutes === '') {
      alert('Введите время');
    }

    const newItem = this.createTodoItem(text, minutes, seconds);

    this.setState(({ todoData }: IState) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  changeItem = (text: string, id: number) => {
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

  onTick = (id: number) => {
    this.setState(({ todoData }: IState) => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem = todoData[index];
      if (Number(oldItem.minutes) !== 0 && Number(oldItem.seconds) === 0) {
        const newItem = { ...oldItem, minutes: Number(oldItem.minutes) - 1, seconds: 59 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
        return {
          todoData: newTodoData,
        };
      } else if (Number(oldItem.minutes) === 0 && Number(oldItem.seconds) === 0) {
        const newItem = { ...oldItem, minutes: 0, seconds: 0 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
      } else {
        const newItem = { ...oldItem, seconds: Number(oldItem.seconds) - 1 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
        return {
          todoData: newTodoData,
        };
      }
    });
  };

  onPlay = (id: number) => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.onTick(id);
    }, 1000);
  };

  onStop = () => {
    clearInterval(this.interval);
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
    const doneCount = this.state.todoData.filter((el: TypeTask) => el.done).length;
    const visibleItems = this.filter(this.state.todoData, this.state.filter);

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todoData={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          // addItem={this.addItem}
          changeItem={this.changeItem}
          onTick={this.onTick}
          onPlay={this.onPlay}
          onStop={this.onStop}
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
