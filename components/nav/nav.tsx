import { Box, Stack, StackProps } from '@chakra-ui/react';

type Props = StackProps;

export default function Nav(others: Props) {
  return (
    <Stack
      py={6}
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      userSelect="none"
      fontSize="20px"
      fontWeight="bold"
      textAlign="center"
      {...others}
    >
      <Box boxSize="20px" bg="blue.500" />
      <Box letterSpacing="-1px">DummyTodos</Box>
    </Stack>
  );
}
