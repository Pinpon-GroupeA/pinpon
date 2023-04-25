import { NativeBaseProvider } from 'native-base';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * A component that wraps the app with all needed providers.
 */
export default function Providers({ children }: ProvidersProps) {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
}
