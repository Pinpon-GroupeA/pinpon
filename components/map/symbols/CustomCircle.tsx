import React from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  color: string;
  strokeStyle?: boolean;
  fill?: boolean;
  radius?: number;
};

function CustomCircle({ color, strokeStyle = false, fill = false, radius = 10 }: Props) {
  return (
    <Svg height="100" width="100" fill="black">
      <Circle
        cx="50"
        cy="50"
        r={radius}
        stroke={color}
        strokeWidth="5"
        fill={fill ? color : 'none'}
        strokeDasharray={strokeStyle ? '5,5' : 'none'}
      />
    </Svg>
  );
}

export default CustomCircle;
