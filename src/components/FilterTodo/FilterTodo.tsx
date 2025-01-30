import { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

enum FilterOption {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  allTodos: Todo[];
  completedTodos: number[];
  onSelect: (filteredTodos: Todo[]) => void;
};

export const FilterTodo: React.FC<Props> = ({
  allTodos,
  completedTodos,
  onSelect,
}) => {
  const [option, setOption] = useState(FilterOption.All);

  const handleFilterChange = (newOption: FilterOption) => {
    setOption(newOption);

    if (newOption === FilterOption.All) {
      onSelect(allTodos);
    } else if (newOption === FilterOption.Active) {
      onSelect(allTodos.filter(todo => !completedTodos.includes(todo.id)));
    } else {
      onSelect(allTodos.filter(todo => completedTodos.includes(todo.id)));
    }
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: option === FilterOption.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => handleFilterChange(FilterOption.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: option === FilterOption.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => handleFilterChange(FilterOption.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: option === FilterOption.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => handleFilterChange(FilterOption.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
