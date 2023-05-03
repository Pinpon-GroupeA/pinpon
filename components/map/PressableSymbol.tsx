import { Pressable } from 'native-base';

import { useAppStore } from '../../stores/store';

type CustomMarkerProps = {
  children: React.ReactNode;
  onPress: () => void;
  type: string;
};

function PressableSymbol({ children, onPress, type }: CustomMarkerProps) {
  const selectedSymbol = useAppStore((state) => state.selectedSymbol);

  return (
    <Pressable
      padding={3}
      bgColor={selectedSymbol === type ? 'gray.400' : undefined}
      alignItems="center"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default PressableSymbol;
