import React from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustmRectangleProps = {
  color: string;
  strokeStyle?: boolean;
  fill?: boolean;
  size?: SizeType;
};

function CustomRectangle({
  color,
  strokeStyle,
  fill,
  size = { height: 20, width: 20 },
}: CustmRectangleProps) {
  return (
    <Svg height={size.height} width={size.width} fill="none">
      <Rect
        height="100%"
        width="100%"
        y="0"
        x="0"
        strokeWidth="5"
        stroke={color}
        strokeDasharray={strokeStyle ? 5 : undefined}
        fill={fill ? color : 'none'}
      />
    </Svg>
  );
}

export default CustomRectangle;
