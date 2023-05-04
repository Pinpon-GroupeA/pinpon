import { Pressable } from 'native-base';

type CustomMarkerProps = {
  children: React.ReactNode;
  onPress: () => void;
  type: string;
  darkBackground?: boolean;
};

function PressableSymbol({ children, onPress, type, darkBackground }: CustomMarkerProps) {
  return (
    <Pressable
      padding={3}
      bgColor={darkBackground ? 'gray.400' : undefined}
      alignItems="center"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default PressableSymbol;
