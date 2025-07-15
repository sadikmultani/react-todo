import React, { useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';
import type { TodoPriority } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import TagSelector from './TagSelector';

const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(
      title, 
      description || undefined, 
      priority, 
      dueDate ? new Date(dueDate) : undefined,
      tags
    );
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setIsExpanded(false);
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="form-label block mb-1.5">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            required
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="description" className="form-label block mb-1.5">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  placeholder="Add details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="priority" className="form-label block mb-1.5">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TodoPriority)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dueDate" className="form-label block mb-1.5">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="tags" className="form-label block mb-1.5">
                  Tags
                </label>
                <TagSelector selectedTags={tags} onChange={setTags} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end pt-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2.5 mr-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </motion.button>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-5 py-2.5 border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Add Todo
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TodoForm; 