import React from 'react';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import SortOptions from './SortOptions';
import { useTodoContext } from '../../hooks/useTodoContext';
import type { TodoFilter } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { 
    filteredTodos, 
    toggleTodo, 
    deleteTodo, 
    editTodo, 
    filter, 
    setFilter,
  } = useTodoContext();

  const filterOptions: TodoFilter[] = ['all', 'active', 'completed'];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">Todo List</h2>
          <div className="inline-flex rounded-md shadow-sm self-start">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`
                  ${filter === option 
                    ? 'bg-indigo-600 text-white dark:bg-indigo-700 shadow-sm' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  } 
                  px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600
                  ${option === 'all' ? 'rounded-l-md' : ''}
                  ${option === 'completed' ? 'rounded-r-md' : ''}
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:z-10
                  transition-colors duration-200
                `}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <SearchBar />
          <div className="flex flex-col gap-5">
            <TagFilter />
            <SortOptions />
          </div>
        </div>
      </div>

      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredTodos.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-xl font-medium">No todos to display</p>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters or adding a new todo</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TodoList; 