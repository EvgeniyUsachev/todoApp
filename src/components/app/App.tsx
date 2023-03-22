import React, { useState } from 'react';

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

const App = () => {
  const [todoData, setTodoData] = React.useState([]);

  const [filter, setFilter] = React.useState('all');

  // state = {
  //   todoData: [],
  //   filter: 'all',
  // };

  let id = new Date().getTime();

  const createTodoItem = (description: string, minutes: string, seconds: string) => {
    return {
      description,
      done: false,
      id: id++,
      minutes,
      seconds,
      timerIsActive: true,
    };
  };

  const deleteItem = (id: number) => {
    setTodoData((todoData): any => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, ...after];
      return newTodoData;
    });
  };

  const addItem = (text: string, minutes: string, seconds: string) => {
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

    setTodoData((todoData): any => {
      const newItem = createTodoItem(text, minutes, seconds);
      const newArray = [...todoData, newItem];
      return newArray;
    });
  };

  const changeItem = (text: string, id: number) => {
    setTodoData((todoData): any => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem: any = todoData[index];
      const newItem = { ...oldItem, description: text };

      //put new object on array
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, newItem, ...after];
      return newTodoData;
    });
  };

  const onTick = (id: number) => {
    setTodoData((todoData): any => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem: any = todoData[index];
      if (Number(oldItem.minutes) !== 0 && Number(oldItem.seconds) === 0) {
        const newItem = { ...oldItem, minutes: Number(oldItem.minutes) - 1, seconds: 59 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
        return newTodoData;
      } else if (Number(oldItem.minutes) === 0 && Number(oldItem.seconds) === 0) {
        const newItem = { ...oldItem, minutes: 0, seconds: 0 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
        return newTodoData;
      } else {
        const newItem = { ...oldItem, seconds: Number(oldItem.seconds) - 1 };
        const before = todoData.slice(0, index);
        const after = todoData.slice(index + 1);
        const newTodoData = [...before, newItem, ...after];
        return newTodoData;
      }
    });
  };

  // const onPlay = (id: number) => {
  //   clearInterval(interval);
  //   interval = setInterval(() => {
  //     onTick(id);
  //   }, 1000);
  // };

  // const onStop = () => {
  //   clearInterval(interval);
  // };

  const onToggleDone = (id: number) => {
    setTodoData((todoData): any => {
      const index = todoData.findIndex((el: TypeTask) => el.id === id);
      const oldItem: any = todoData[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      //put new object on array
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      const newTodoData = [...before, newItem, ...after];
      return newTodoData;
    });
    // console.log('toggle done', id);
  };

  const onFilterChange = (filterName: string) => {
    setFilter(filterName);
  };

  const getFilter = (items: Array<TypeTask>, filter: string) => {
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

  const clearCompleted = () => {
    setTodoData((todoData): any => {
      const newArr: Array<TypeTask> = [];
      todoData.forEach((item: TypeTask) => {
        if (!item.done) {
          newArr.push(item);
        }
      });
      return newArr;
    });
  };

  const doneCount = todoData.filter((el: TypeTask) => el.done).length;
  const visibleItems = getFilter(todoData, filter);

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        todoData={visibleItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        // addItem={this.addItem}
        changeItem={changeItem}
        onTick={onTick}
        // onPlay={onPlay}
        // onStop={onStop}
      />
      <Footer
        total={todoData.length}
        doneCount={doneCount}
        onFilterChange={onFilterChange}
        filter={filter}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};

export default App;
