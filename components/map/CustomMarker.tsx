import { Pressable } from 'native-base';
import Svg from 'react-native-svg';

type CustomMarkerProps = {
  children: React.ReactNode;
  onPress?: (id: number) => void;
};

function CustomMarker({ children, onPress }: CustomMarkerProps) {
  return (
    <Pressable onPress={() => onPress} padding={10} alignItems="center">
      <Svg height="30" width="30">
        {children}
      </Svg>
    </Pressable>
  );
}

export default CustomMarker;
