import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  listOfTodos: Todo[];
  completedTodosId: number[];
  selectTodo: (id: number) => void;
  isTodoChanges: boolean;
};

export const TodoList: React.FC<Props> = ({
  listOfTodos,
  completedTodosId,
  selectTodo,
  isTodoChanges = false,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {listOfTodos.map(todo => {
        const isChecked = completedTodosId.includes(todo.id);

        return (
          <div
            key={todo.id}
            data-cy="Todo"
            className={cn('todo', { completed: isChecked })}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                id={`todo__status-${todo.id}`}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={isChecked}
                onChange={() => selectTodo(todo.id)}
              />
            </label>
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
            <div
              data-cy="TodoLoader"
              className={cn('modal overlay', { 'is-active': isTodoChanges })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
