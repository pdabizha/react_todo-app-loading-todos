/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorSMS } from './components/ErrorSMS/ErrorSMS';
import { FilterTodo } from './components/FilterTodo/FilterTodo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fullTodos, setFullTodos] = useState<Todo[]>([]);
  const [completedTodosId, setCompletedTodosId] = useState<number[]>([]);
  const [isTodoChanges, setIsTodoChanges] = useState(false);

  function loadTodos() {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setFullTodos(data);

        const completedIds = data
          .filter(todo => todo.completed)
          .map(todo => todo.id);

        setCompletedTodosId(completedIds);
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }

  useEffect(() => loadTodos(), []);

  const toggleTodo = (id: number) => {
    setCompletedTodosId(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  const handleFilterChange = (filteredTodos: Todo[]) => {
    setTodos(filteredTodos);
  };

  const itemLeft = fullTodos.length - completedTodosId.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <TodoList
          listOfTodos={todos}
          completedTodosId={completedTodosId}
          selectTodo={toggleTodo}
          isTodoChanges={isTodoChanges}
        />

        {/* Hide the footer if there are no todos */}
        {fullTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemLeft} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            {/* <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav> */}
            <FilterTodo
              allTodos={fullTodos}
              completedTodos={completedTodosId}
              onSelect={handleFilterChange}
            />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosId.length < 1}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorSMS message={errorMessage} onClose={() => setErrorMessage('')} />
      {/*
        ErrorNotification text

        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
       */}
    </div>
  );
};
