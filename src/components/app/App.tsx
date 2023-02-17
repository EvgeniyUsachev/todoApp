import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from '../task';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

class App extends React.Component<{}, any> {
  id = 100;

  state = {
    todoData: [
      this.createTodoItem('drink coffee'),
      this.createTodoItem('react app'),
      this.createTodoItem('huy znaet'),
      // {id: 1, description: 'Eat q meat'},
      // {id: 2, description: 'React wtf'},
    ],
    filter: 'all',
  };

  createTodoItem(description: any) {
    return {
      description,
      done: false,
      id: this.id++,
    };
  }

  deleteItem = (id: any) => {
    this.setState(({todoData}: any) => {
      const index = todoData.findIndex(
        (el: any) => el.id === id
      );
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

    this.setState(({todoData}: any) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  changeItem = (text: string, id: number) => {
    console.log(text, id);
    this.setState(({todoData}: any) => {
      const index = todoData.findIndex(
        (el: any) => el.id === id
      );
      const oldItem = todoData[index];
      const newItem = {...oldItem, description: text};

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
    this.setState(({todoData}: any) => {
      const index = todoData.findIndex(
        (el: any) => el.id === id
      );
      const oldItem = todoData[index];
      const newItem = {...oldItem, done: !oldItem.done};

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

  filter = (items: any, filter: any) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'done') {
      return items.filter((task: any) => {
        return task.done;
      });
    } else if (filter === 'active') {
      return items.filter((task: any) => {
        return !task.done;
      });
    }
  };

  clearCompleted = () => {
    this.setState(({todoData}: any) => {
      const newArr: any = [];
      todoData.forEach((item: any, index: any) => {
        if (!item.done) {
          newArr.push(item);
        }
      });
      return {todoData: newArr};
    });
  };

  render() {
    const doneCount = this.state.todoData.filter(
      (el) => el.done
    ).length;

    const visibleItems = this.filter(
      this.state.todoData,
      this.state.filter
    );

    return (
      <section className='todoapp'>
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
