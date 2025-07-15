import React from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

const SortOptions: React.FC = () => {
  const { sortOption, sortDirection, setSortOption, setSortDirection } = useTodoContext();

  const sortOptions = [
    { value: 'createdAt', label: 'Creation Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-5">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort Options:</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-grow">
          <label htmlFor="sortOption" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Direction:
          </label>
          <div className="flex">
            <button
              type="button"
              onClick={() => setSortDirection('asc')}
              className={`px-4 py-2.5 border ${sortDirection === 'asc' 
                ? 'bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-300' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'} 
                rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center gap-1`}
              aria-label="Sort ascending"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Asc</span>
            </button>
            <button
              type="button"
              onClick={() => setSortDirection('desc')}
              className={`px-4 py-2.5 border ${sortDirection === 'desc' 
                ? 'bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-300' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'} 
                rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center gap-1`}
              aria-label="Sort descending"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Desc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptions; 