import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { TodoHeader, TodoList } from '@/components/todo';
import { Nav } from '@/components/nav';

export default function Home() {
  return (
    <>
      <Head>
        <title>DummyTodos</title>
        <meta name="description" content="Todos app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mx="auto" maxW="480px" pb={12} px={4}>
        <Nav />
        <TodoHeader />
        <TodoList />
      </Box>
    </>
  );
}
