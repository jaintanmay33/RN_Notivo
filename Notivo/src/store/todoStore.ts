import { create } from 'zustand';
import { produce } from 'immer';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from '@utils/storage';
import { PRIORITY_ORDER } from '@utils/constants';
import {
  type Todo,
  type CreateTodoInput,
  type UpdateTodoInput,
  type TodoFilter,
  type TodoSortBy,
} from '@app-types/todo';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const now = () => new Date().toISOString();

interface TodoState {
  todos: Todo[];
  activeFilter: TodoFilter;
  searchQuery: string;
  sortBy: TodoSortBy;
  isLoading: boolean;
  initialize: () => Promise<void>;
  createTodo: (input: CreateTodoInput) => Todo;
  updateTodo: (id: string, updates: UpdateTodoInput) => void;
  deleteTodo: (id: string) => void;
  archiveTodo: (id: string) => void;
  restoreTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  setFilter: (filter: TodoFilter) => void;
  setSearch: (query: string) => void;
  setSortBy: (sort: TodoSortBy) => void;
  reorderTodos: (reordered: Todo[]) => void;
  getFilteredTodos: () => Todo[];
  getTodoById: (id: string) => Todo | undefined;
  getArchivedTodos: () => Todo[];
}

export const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  activeFilter: 'all',
  searchQuery: '',
  sortBy: 'createdAt',
  isLoading: true,
  initialize: async () => {
    const saved = await loadFromStorage<Todo[]>(STORAGE_KEYS.TODOS);
    set({ todos: saved ?? [], isLoading: false });
  },
  createTodo: input => {
    const newTodo: Todo = {
      ...input,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
      tags: input.tags ?? [],
      recurrence: input.recurrence ?? 'none',
    };
    set(
      produce((draft: TodoState) => {
        draft.todos.unshift(newTodo);
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
    return newTodo;
  },
  updateTodo: (id, updates) => {
    set(
      produce((draft: TodoState) => {
        const todo = draft.todos.find(t => t.id === id);
        if (!todo) return;
        Object.assign(todo, updates);
        todo.updatedAt = now();
        if (updates.status === 'completed' && !todo.completedAt) {
          todo.completedAt = now();
        }
        if (updates.status && updates.status !== 'completed') {
          todo.completedAt = undefined;
        }
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
  },
  deleteTodo: id => {
    set(
      produce((draft: TodoState) => {
        draft.todos = draft.todos.filter(t => t.id !== id);
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
  },
  archiveTodo: id => {
    set(
      produce((draft: TodoState) => {
        const todo = draft.todos.find(t => t.id === id);
        if (!todo) return;
        todo.status = 'archived';
        todo.archivedAt = now();
        todo.updatedAt = now();
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
  },
  restoreTodo: id => {
    set(
      produce((draft: TodoState) => {
        const todo = draft.todos.find(t => t.id === id);
        if (!todo) return;
        todo.status = 'active';
        todo.archivedAt = undefined;
        todo.updatedAt = now();
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
  },
  toggleComplete: id => {
    set(
      produce((draft: TodoState) => {
        const todo = draft.todos.find(t => t.id === id);
        if (!todo) return;
        if (todo.status === 'completed') {
          todo.status = 'active';
          todo.completedAt = undefined;
        } else {
          if (todo.recurrence !== 'none') {
            todo.status = 'active';
            todo.completedAt = undefined;
          } else {
            todo.status = 'completed';
            todo.completedAt = now();
          }
        }
        todo.updatedAt = now();
      }),
    );
    saveToStorage(STORAGE_KEYS.TODOS, get().todos);
  },
  setFilter: filter => set({ activeFilter: filter }),
  setSearch: query => set({ searchQuery: query }),
  setSortBy: sort => set({ sortBy: sort }),
  reorderTodos: reordered => {
    set({ todos: reordered });
    saveToStorage(STORAGE_KEYS.TODOS, reordered);
  },
  getFilteredTodos: () => {
    const { todos, activeFilter, searchQuery, sortBy } = get();
    let filtered = todos.filter(t => t.status !== 'archived');
    if (activeFilter !== 'all') {
      filtered = filtered.filter(t => t.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    return filtered;
  },
  getTodoById: id => get().todos.find(t => t.id === id),
  getArchivedTodos: () => {
    return get()
      .todos.filter(t => t.status === 'archived')
      .sort((a, b) => {
        if (!a.archivedAt || !b.archivedAt) return 0;
        return new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime();
      });
  },
}));
