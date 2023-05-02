import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NativeBaseProvider } from 'native-base';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

/**
 * A component that wraps the app with all needed providers.
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        {children}
        {/* <ReactQueryDevtools /> */}
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
