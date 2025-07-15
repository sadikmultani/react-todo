import React, { useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onChange }) => {
  const { availableTags } = useTodoContext();
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      const updatedTags = [...selectedTags, newTag.trim()];
      onChange(updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
    onChange(updatedTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4 border border-gray-200 dark:border-gray-700">
      <div className="flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="w-full px-4 py-2.5 rounded-l-md border border-r-0 border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 flex-1"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-5 py-2.5 border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          Add
        </button>
      </div>

      {selectedTags.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected tags:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 transition-colors duration-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 focus:outline-none"
                  aria-label={`Remove tag ${tag}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {availableTags.length > 0 && !selectedTags.some(tag => availableTags.includes(tag)) && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags
              .filter(tag => !selectedTags.includes(tag))
              .map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onChange([...selectedTags, tag])}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector; 