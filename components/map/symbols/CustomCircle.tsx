import React from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomCircleProps = {
  color: string;
  strokeStyle?: boolean;
  size?: SizeType;
};

function CustomCircle({
  color,
  strokeStyle,
  size = { height: 100, width: 100 },
}: CustomCircleProps) {
  return (
    <Svg height={size.height} width={size.width} fill="none">
      <Circle
        cx="50%"
        cy="50%"
        r="25%"
        strokeWidth="5"
        fill={color}
        strokeDasharray={strokeStyle ? '8' : 'none'}
      />
    </Svg>
  );
}

export default CustomCircle;
