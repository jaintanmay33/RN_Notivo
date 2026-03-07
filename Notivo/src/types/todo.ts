export type TodoStatus = 'active' | 'in_progress' | 'completed' | 'archived';

export type TodoPriority = 'urgent' | 'high' | 'medium' | 'low';

export type RecurrenceRule = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Todo {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  description?: string;
  tags: string[];
  dueDate?: string;
  reminderDate?: string;
  notificationId?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  recurrence: RecurrenceRule;
  notes?: string;
  archivedAt?: string;
  completedAt?: string;
}

export type CreateTodoInput = Omit<
  Todo,
  'id' | 'createdAt' | 'updatedAt' | 'archivedAt' | 'completedAt' | 'notificationId'
>;

export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt'>>;

export type TodoFilter = 'all' | 'active' | 'in_progress' | 'completed' | 'archived';

export type TodoSortBy = 'createdAt' | 'dueDate' | 'priority' | 'title';

export const defaultTodoValues: CreateTodoInput = {
  title: '',
  status: 'active',
  priority: 'medium',
  description: '',
  tags: [],
  dueDate: undefined,
  reminderDate: undefined,
  estimatedMinutes: undefined,
  actualMinutes: undefined,
  recurrence: 'none',
  notes: '',
};
