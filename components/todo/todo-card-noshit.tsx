// import { useUpdateTodo } from '@/modules/todo/hooks';
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import { Checkbox, IconButton, Stack, StackProps, useDisclosure, useToast } from '@chakra-ui/react';
// import { AxiosError } from 'axios';
// import DeleteTodoModal from './delete-todo-modal';

// type Props = {
//   todoId: number;
//   todo: string;
//   completed: boolean;
// } & StackProps;

// const TodoCard = ({ todoId, todo, completed, ...others }: Props) => {
//   const updateTodo = useUpdateTodo();
//   const {
//     isOpen: isOpenDeleteModal,
//     onOpen: onOpenDeleteModal,
//     onClose: onCloseDeleteModal,
//   } = useDisclosure();
//   const toast = useToast();

//   const onUpdateStatus = async (checked: boolean) => {
//     try {
//       await updateTodo.mutateAsync({
//         id: todoId,
//         data: {
//           completed: checked,
//         },
//       });
//       toast({
//         title: 'Success',
//         description: 'Todo updated',
//         status: 'success',
//       });
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         if (err.response?.status === 404) {
//           toast({
//             title: 'Fail',
//             description: 'Failed to update todo because new todo is not saved on the server',
//             status: 'error',
//           });
//           return;
//         }
//       }

//       toast({
//         title: 'Fail',
//         description: 'Failed to update todo. Please try again later',
//         status: 'error',
//       });
//     }
//   };

//   return (
//     <Stack
//       pointerEvents={updateTodo.isLoading ? 'none' : 'initial'}
//       opacity={updateTodo.isLoading ? 0.5 : 1}
//       border="1px solid"
//       borderColor="gray.200"
//       p={4}
//       rounded={6}
//       direction="row"
//       spacing={6}
//       alignItems="center"
//       justifyContent="space-between"
//       boxShadow="base"
//       {...others}
//     >
//       <Checkbox
//         spacing={4}
//         isChecked={completed}
//         onChange={(e) => onUpdateStatus(e.target.checked)}
//       >
//         {todo}
//       </Checkbox>
//       <Stack direction="row">
//         <IconButton variant="outline" size="sm" aria-label="edit todo" icon={<EditIcon />} />
//         <IconButton variant="outline" size="sm" aria-label="delete todo" icon={<DeleteIcon />} />
//         <DeleteTodoModal isOpen={isOpenDeleteModal} on/>
//       </Stack>
//     </Stack>
//   );
// };

// export default TodoCard;
