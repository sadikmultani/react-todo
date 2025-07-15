import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo, TodoFilter, TodoPriority } from '../types';

type SortOption = 'createdAt' | 'dueDate' | 'priority' | 'title';
type SortDirection = 'asc' | 'desc';

interface TodoContextType {
  todos: Todo[];
  filter: TodoFilter;
  searchQuery: string;
  tagFilter: string | null;
  sortOption: SortOption;
  sortDirection: SortDirection;
  availableTags: string[];
  addTodo: (title: string, description?: string, priority?: TodoPriority, dueDate?: Date, tags?: string[]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, description?: string, priority?: TodoPriority, dueDate?: Date, tags?: string[]) => void;
  setFilter: (filter: TodoFilter) => void;
  setSearchQuery: (query: string) => void;
  setTagFilter: (tag: string | null) => void;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse dates correctly from localStorage
        const parsedTodos = JSON.parse(savedTodos);
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          tags: todo.tags || []
        }));
      } catch (e) {
        console.error('Error parsing todos from localStorage', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Get all available tags from todos
  const availableTags = Array.from(
    new Set(
      todos.flatMap(todo => todo.tags)
    )
  ).sort();

  const addTodo = (title: string, description?: string, priority: TodoPriority = 'medium', dueDate?: Date, tags: string[] = []) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      description,
      priority,
      dueDate,
      tags
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() } 
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, title: string, description?: string, priority?: TodoPriority, dueDate?: Date, tags?: string[]) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              title, 
              description: description ?? todo.description, 
              priority: priority ?? todo.priority,
              dueDate: dueDate ?? todo.dueDate,
              tags: tags ?? todo.tags,
              updatedAt: new Date() 
            } 
          : todo
      )
    );
  };

  // Apply filters
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // First apply the filter
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      // Then apply the tag filter if any
      if (tagFilter) return todo.tags.includes(tagFilter);
      return true;
    })
    .filter(todo => {
      // Then apply the search query
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(query) ||
        (todo.description && todo.description.toLowerCase().includes(query)) ||
        todo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      // Apply sorting
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortOption) {
        case 'title':
          return direction * a.title.localeCompare(b.title);
        
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
        
        case 'dueDate':
          // Handle todos without due dates (put them at the end)
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return direction;
          if (!b.dueDate) return -direction;
          return direction * (a.dueDate.getTime() - b.dueDate.getTime());
        
        case 'createdAt':
        default:
          return direction * (a.createdAt.getTime() - b.createdAt.getTime());
      }
    });

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        filter, 
        searchQuery,
        tagFilter,
        sortOption,
        sortDirection,
        availableTags,
        addTodo, 
        toggleTodo, 
        deleteTodo, 
        editTodo, 
        setFilter,
        setSearchQuery,
        setTagFilter,
        setSortOption,
        setSortDirection,
        filteredTodos: filteredAndSortedTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export default useTodoContext; 