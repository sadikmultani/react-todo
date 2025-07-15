import React from 'react';
import type { KeyboardEvent } from 'react';
import type { Todo, TodoPriority } from '../../types';
import TagSelector from './TagSelector';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string, priority?: TodoPriority, dueDate?: Date, tags?: string[]) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);
  const [description, setDescription] = React.useState(todo.description || '');
  const [priority, setPriority] = React.useState<TodoPriority>(todo.priority);
  const [dueDate, setDueDate] = React.useState<string>(
    todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : ''
  );
  const [tags, setTags] = React.useState<string[]>(todo.tags);

  // Reset form state when todo changes
  React.useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setPriority(todo.priority);
    setDueDate(todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '');
    setTags(todo.tags);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(
      todo.id, 
      title, 
      description || undefined, 
      priority, 
      dueDate ? new Date(dueDate) : undefined,
      tags
    );
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Handle keyboard navigation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.currentTarget.dataset.action === 'toggle') {
        onToggle(todo.id);
      } else if (e.currentTarget.dataset.action === 'edit') {
        setIsEditing(true);
      } else if (e.currentTarget.dataset.action === 'delete') {
        if (window.confirm('Are you sure you want to delete this todo?')) {
          onDelete(todo.id);
        }
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-800 shadow-md p-6 mb-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
              required
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Tags
            </label>
            <TagSelector selectedTags={tags} onChange={setTags} />
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 mr-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div 
      className={`${todo.completed ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5 mb-3 hover:shadow-md transition-all duration-200`}
      role="region"
      aria-label={`Todo item: ${todo.title}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex items-start space-x-4 mb-3 sm:mb-0">
          <div 
            className="flex items-center h-5 mt-1 cursor-pointer"
            onClick={() => onToggle(todo.id)}
            onKeyDown={handleKeyDown}
            data-action="toggle"
            role="checkbox"
            aria-checked={todo.completed}
            tabIndex={0}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600"
              aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
          </div>
          <div className="flex flex-col">
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`text-sm mt-1 ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                {todo.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              {todo.dueDate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  Due: {formatDate(todo.dueDate)}
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Created: {formatDate(todo.createdAt)}
              </span>
            </div>
            
            {todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {todo.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2 mt-3 sm:mt-0">
          <button
            onClick={handleEdit}
            className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
            aria-label={`Edit "${todo.title}"`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
            aria-label={`Delete "${todo.title}"`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 