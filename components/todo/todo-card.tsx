import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Checkbox, IconButton, Stack, StackProps, useToast } from '@chakra-ui/react';
import { Todo } from '@/modules/todo/entities';
import { useUpdateTodo } from '@/modules/todo/hooks';
import { AxiosError } from 'axios';

type Props = {
  todo: Todo;
  onOpenUpdateModal: (id: number) => void;
  onOpenDeleteModal: (id: number) => void;
} & StackProps;

const TodoCard = ({ todo, onOpenUpdateModal, onOpenDeleteModal, ...others }: Props) => {
  const updateTodo = useUpdateTodo();
  const toast = useToast();

  const onUpdateStatus = async (checked: boolean) => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: {
          completed: checked,
          todo: todo.todo,
        },
      });
      toast({
        title: 'Success',
        description: 'Todo updated',
        status: 'success',
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          toast({
            title: 'Fail',
            description: 'Failed to update todo because new todo is not saved on the server',
            status: 'error',
          });
          return;
        }
      }

      toast({
        title: 'Fail',
        description: 'Failed to update todo. Please try again later',
        status: 'error',
      });
    }
  };

  return (
    <Stack
      pointerEvents={updateTodo.isLoading ? 'none' : 'initial'}
      opacity={updateTodo.isLoading ? 0.5 : 1}
      border="1px solid"
      borderColor="gray.200"
      p={4}
      rounded={6}
      direction="row"
      spacing={6}
      alignItems="center"
      justifyContent="space-between"
      boxShadow="base"
      {...others}
    >
      <Checkbox
        textDecoration={todo.completed ? 'line-through' : 'none'}
        spacing={4}
        isChecked={todo.completed}
        onChange={(e) => onUpdateStatus(e.target.checked)}
      >
        {todo.todo}
      </Checkbox>
      <Stack direction="row">
        <IconButton
          onClick={() => onOpenUpdateModal(todo.id)}
          variant="outline"
          size="sm"
          aria-label="edit todo"
          icon={<EditIcon />}
        />
        <IconButton
          variant="outline"
          size="sm"
          aria-label="delete todo"
          icon={<DeleteIcon />}
          onClick={() => onOpenDeleteModal(todo.id)}
        />
      </Stack>
    </Stack>
  );
};

export default TodoCard;
