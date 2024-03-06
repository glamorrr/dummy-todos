export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export type UpdateTodo = {
  id: number;
  data: {
    todo: string;
    completed: boolean;
  };
};

export type CreateTodo = {
  todo: string;
};
