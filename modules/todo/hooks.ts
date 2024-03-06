import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api';
import { CreateTodo, Todo, UpdateTodo } from './entities';
import { AxiosError } from 'axios';

export const useGetTodos = (): UseQueryResult<Todo[]> => {
  return useQuery(['todos'], () => getTodos());
};

export const useUpdateTodo = (): UseMutationResult<Todo, AxiosError, UpdateTodo> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoToUpdate) => updateTodo(todoToUpdate),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[] | undefined>(['todos'], (oldTodos) => {
        return oldTodos?.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    },
  });
};

export const useCreateTodo = (): UseMutationResult<Todo, AxiosError, CreateTodo> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) => createTodo(newTodo),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[] | undefined>(['todos'], (oldTodos) => {
        return [newTodo, ...(oldTodos ?? [])];
      });
    },
  });
};

export const useDeleteTodo = (): UseMutationResult<Todo, AxiosError, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[] | undefined>(['todos'], (oldTodos) => {
        return oldTodos?.filter((todo) => todo.id !== deletedTodo.id);
      });
    },
  });
};
