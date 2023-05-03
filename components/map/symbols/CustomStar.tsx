import React from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomStarProps = {
  color?: string;
  dashed?: boolean;
  fill?: boolean;
  size?: SizeType;
};

function CustomStar({
  color = 'black',
  dashed,
  fill,
  size = { height: 30, width: 30 },
}: CustomStarProps) {
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
        points={`
          ${size.width / 2},0
          ${(4 * size.width) / 5},${size.height}
          0,${size.height / 3}
          ${size.width},${size.height / 3}
          ${size.width / 5},${size.height}
         `}
        stroke={fill ? 'black' : color}
        strokeWidth={3}
        fill={fill ? color : 'none'}
        strokeDasharray={dashed ? '5,5' : 'none'}
      />
    </Svg>
  );
}

export default CustomStar;
