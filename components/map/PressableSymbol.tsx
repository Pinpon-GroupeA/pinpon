import { Pressable } from 'native-base';

import { useAppStore } from '../../stores/store';

type CustomMarkerProps = {
  children: React.ReactNode;
  onPress: () => void;
};

function PressableSymbol({ children, onPress }: CustomMarkerProps) {
  const selectedSymbol = useAppStore((state) => state.selectedSymbol);

  return (
    <Pressable
      padding={3}
      bgColor={selectedSymbol === 'test' ? 'amber.300' : undefined}
      alignItems="center"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default PressableSymbol;
