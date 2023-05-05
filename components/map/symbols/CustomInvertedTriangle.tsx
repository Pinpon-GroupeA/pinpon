import React from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomInvertedTriangleProps = {
  color?: string;
  dashed?: boolean;
  fill?: boolean;
  size?: SizeType;
};

function CustomInvertedTriangle({
  color = 'black',
  dashed,
  fill,
  size = { height: 30, width: 30 },
}: CustomInvertedTriangleProps) {
  return (
    <Svg
      height={size.height}
      width={size.width}
      viewBox={`0 0 ${size.width + 3} ${size.height + 3}`}
      fill="none"
    >
      <Polygon
        x={1.5}
        y={3}
        points={`0,0 ${size.width},0 ${size.width / 2},${size.height}`}
        stroke={fill ? 'black' : color}
        strokeWidth={3}
        fill={fill ? color : 'none'}
        strokeDasharray={dashed ? '5,5' : 'none'}
      />
    </Svg>
  );
}

export default CustomInvertedTriangle;
