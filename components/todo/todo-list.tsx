import { useGetTodos } from '@/modules/todo/hooks';
import { CircularProgress, Stack, StackProps, Text, useDisclosure } from '@chakra-ui/react';
import TodoCard from './todo-card';
import UpdateTodoModal from './update-todo-modal';
import { useState } from 'react';
import DeleteTodoModal from './delete-todo-modal';

type Props = StackProps;

const TodoList = (others: Props) => {
  const { data: todos, isFetching, isError } = useGetTodos();
  const [selectedIdToUpdate, setSelectedIdToUpdate] = useState<number | null>(null);
  const selectedTodoToUpdate = todos?.find(({ id }) => id === selectedIdToUpdate);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(null);
  const selectedTodoToDelete = todos?.find(({ id }) => id === selectedIdToDelete);
  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const handleOpenUpdateModal = (id: number) => {
    setSelectedIdToUpdate(id);
    onOpenUpdateModal();
  };

  const handleCloseUpdateModal = () => {
    setSelectedIdToUpdate(null);
    onCloseUpdateModal();
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedIdToDelete(id);
    onOpenDeleteModal();
  };

  const handleCloseDeleteModal = () => {
    setSelectedIdToDelete(null);
    onCloseDeleteModal();
  };

  if (isError) {
    return (
      <Stack mt={6} alignItems="center" {...others}>
        <Text>Oops something went wrong. Please try again later.</Text>
      </Stack>
    );
  }

  if (isFetching) {
    return (
      <Stack mt={6} alignItems="center" {...others}>
        <CircularProgress isIndeterminate />
      </Stack>
    );
  }

  if (todos?.length === 0) {
    return (
      <Stack mt={6} alignItems="center" {...others}>
        <Text>There are no todos. Let&apos;s add new todo.</Text>
      </Stack>
    );
  }

  return (
    <Stack mt={4} direction="column" spacing={3} {...others}>
      {todos?.map((todo) => {
        return (
          <TodoCard
            key={todo.id}
            todo={todo}
            onOpenUpdateModal={handleOpenUpdateModal}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        );
      })}
      <UpdateTodoModal
        key={selectedTodoToUpdate?.id}
        todo={selectedTodoToUpdate}
        isOpen={isOpenUpdateModal}
        onClose={handleCloseUpdateModal}
      />
      <DeleteTodoModal
        key={selectedTodoToDelete?.id}
        todo={selectedTodoToDelete}
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      />
    </Stack>
  );
};

export default TodoList;
