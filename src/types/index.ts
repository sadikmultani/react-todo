export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  priority: TodoPriority;
  description?: string;
  tags: string[];
}

export type TodoFilter = 'all' | 'active' | 'completed'; 