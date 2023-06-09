import React from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomRectangleProps = {
  color: string;
  strokeStyle?: boolean;
  size?: SizeType;
  fill?: boolean;
};

function CustomRectangle({
  color,
  strokeStyle,
  size = { height: 20, width: 20 },
  fill = true,
}: CustomRectangleProps) {
  return (
    <Svg height={size.height} width={size.width} fill="none">
      <Rect
        height="100%"
        width="100%"
        y="0"
        x="0"
        strokeWidth="5"
        stroke={color}
        strokeDasharray={strokeStyle ? 5 : 'none'}
        fill={fill ? color : 'none'}
      />
    </Svg>
  );
}

export default CustomRectangle;
