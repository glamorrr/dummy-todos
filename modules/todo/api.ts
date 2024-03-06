import { fetcher } from '@/utils/fetcher';
import { CreateTodo, Todo, UpdateTodo } from './entities';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetcher.get<{ todos: Todo[] }>('/todos', {
    params: {
      limit: 5,
    },
  });
  return res.data.todos;
};

export const updateTodo = async ({ id, data }: UpdateTodo): Promise<Todo> => {
  const res = await fetcher.put<Todo>(`/todos/${id}`, data);
  return res.data;
};

export const createTodo = async ({ todo }: CreateTodo): Promise<Todo> => {
  const res = await fetcher.post<Todo>(`/todos/add`, {
    todo,
    userId: 1,
    completed: false,
  });
  return res.data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const res = await fetcher.delete<Todo>(`/todos/${id}`);
  return res.data;
};
