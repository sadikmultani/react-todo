import React from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';
import { motion } from 'framer-motion';

const TagFilter: React.FC = () => {
  const { availableTags, tagFilter, setTagFilter } = useTodoContext();

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="mb-5">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by tag:</p>
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setTagFilter(null)}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
            tagFilter === null
              ? 'bg-indigo-600 text-white dark:bg-indigo-700 shadow-sm'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </motion.button>
        
        {availableTags.map(tag => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setTagFilter(tag)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
              tagFilter === tag
                ? 'bg-indigo-600 text-white dark:bg-indigo-700 shadow-sm'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter; 