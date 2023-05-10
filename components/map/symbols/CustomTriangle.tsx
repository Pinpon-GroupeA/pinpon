import React from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomTriangleProps = {
  color?: string;
  dashed?: boolean;
  size?: SizeType;
};

function CustomTriangle({
  color = 'black',
  dashed,
  size = { height: 30, width: 30 },
}: CustomTriangleProps) {
  return (
    <Svg
      height={size.height}
      width={size.width}
      viewBox={`0 0 ${size.width + 3} ${size.height + 3}`}
      fill="black"
    >
      <Polygon
        x={1.5}
        points={`0,${size.height} ${size.width},${size.height} ${size.width / 2},0`}
        stroke={color}
        fill={color}
        strokeDasharray={dashed ? '5,5' : 'none'}
      />
    </Svg>
  );
}

export default CustomTriangle;
