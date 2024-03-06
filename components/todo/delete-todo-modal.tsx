import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useDeleteTodo } from '@/modules/todo/hooks';
import { AxiosError } from 'axios';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  todo?: {
    id: number;
    todo: string;
  };
};

const DeleteTodoModal = ({ onClose, isOpen, todo }: Props) => {
  const initialFocusRef = useRef(null);
  const deleteTodo = useDeleteTodo();
  const toast = useToast();

  const onDeleteTodo = async () => {
    try {
      await deleteTodo.mutateAsync(todo?.id as number);
      toast({
        title: 'Success',
        description: 'Todo removed',
        status: 'success',
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          toast({
            title: 'Fail',
            description: 'Failed to remove todo because new todo is not saved on the server',
            status: 'error',
          });
          return;
        }
      }

      toast({
        title: 'Fail',
        description: 'Failed to remove todo. Please try again later',
        status: 'error',
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>
            Are you sure you want to remove todo{' '}
            <Text as="span" fontWeight="bold">
              &quot;{todo?.todo}&quot;
            </Text>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onDeleteTodo} colorScheme="red" mr={3} isLoading={deleteTodo.isLoading}>
            Delete
          </Button>
          <Button ref={initialFocusRef} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTodoModal;
