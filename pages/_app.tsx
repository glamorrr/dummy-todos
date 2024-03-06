import { queryClient } from '@/utils/query-client';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: 'bottom-right',
            isClosable: true,
          },
        }}
      >
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
