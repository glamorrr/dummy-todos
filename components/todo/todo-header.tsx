import { AddIcon } from '@chakra-ui/icons';
import { Button, Heading, Stack, StackProps, useDisclosure } from '@chakra-ui/react';
import CreateTodoModal from './create-todo-modal';

type Props = StackProps;

const TodoHeader = (others: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack mt={6} direction="row" justifyContent="space-between" alignItems="center" {...others}>
      <Heading fontSize="20px" as="h1">
        Todo
      </Heading>
      <Button size="sm" colorScheme="blue" leftIcon={<AddIcon />} onClick={onOpen}>
        Add todo
      </Button>

      <CreateTodoModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default TodoHeader;
