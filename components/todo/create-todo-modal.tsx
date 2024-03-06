import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTodo } from '@/modules/todo/hooks';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

type FormValuesProps = {
  todo: string;
};

const TodoCreateSchema = Yup.object().shape({
  todo: Yup.string().required('Todo is required'),
});

const CreateTodoModal = ({ onClose, isOpen }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesProps>({
    resolver: yupResolver(TodoCreateSchema),
  });
  const initialFocusRef = useRef<HTMLInputElement | null>(null);
  const createTodo = useCreateTodo();
  const toast = useToast();
  const { ref: registerTodoRef, ...registerTodoRest } = register('todo');

  const onCreateTodo = async (data: FormValuesProps) => {
    try {
      await createTodo.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'Todo created',
        status: 'success',
      });
    } catch (err) {
      toast({
        title: 'Fail',
        description: 'Failed to create todo. Please try again later',
        status: 'error',
      });
    } finally {
      onClose();
      reset();
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onCreateTodo)}>
        <ModalHeader>Add todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.todo}>
            <FormLabel>Todo</FormLabel>
            <Input
              placeholder="Todo"
              ref={(e) => {
                registerTodoRef(e);
                initialFocusRef.current = e;
              }}
              {...registerTodoRest}
            />
            <FormErrorMessage>{!!errors.todo && errors.todo.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3} isLoading={isSubmitting}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTodoModal;
