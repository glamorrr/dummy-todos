import {
  Button,
  Checkbox,
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
  Stack,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTodo } from '@/modules/todo/hooks';
import { AxiosError } from 'axios';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  todo?: {
    id: number;
    todo: string;
    completed: boolean;
  };
};

type FormValuesProps = {
  todo: string;
  completed: boolean;
};

const TodoUpdateSchema = Yup.object().shape({
  todo: Yup.string().required('Todo is required'),
  completed: Yup.boolean().required('completed is required'),
});

const UpdateTodoModal = ({ onClose, isOpen, todo }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesProps>({
    resolver: yupResolver(TodoUpdateSchema),
    defaultValues: {
      todo: todo?.todo,
      completed: todo?.completed,
    },
  });
  const initialFocusRef = useRef<HTMLInputElement | null>(null);
  const updateTodo = useUpdateTodo();
  const toast = useToast();
  const { ref: registerTodoRef, ...registerTodorest } = register('todo');

  const onCreateTodo = async (data: FormValuesProps) => {
    try {
      await updateTodo.mutateAsync({ id: todo?.id as number, data });
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
    } finally {
      onClose();
      reset();
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onCreateTodo)}>
        <ModalHeader>Update todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} as={Stack} spacing={6}>
          <FormControl isInvalid={!!errors.todo}>
            <FormLabel>Todo</FormLabel>
            <Input
              placeholder="Todo"
              ref={(e) => {
                registerTodoRef(e);
                initialFocusRef.current = e;
              }}
              {...registerTodorest}
            />
            <FormErrorMessage>{!!errors.todo && errors.todo.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.completed}>
            <FormLabel>Status</FormLabel>
            <Checkbox {...register('completed')}>Done</Checkbox>
            <FormErrorMessage>{!!errors.completed && errors.completed.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3} isLoading={isSubmitting}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTodoModal;
