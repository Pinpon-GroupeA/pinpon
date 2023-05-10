import React from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomStarProps = {
  color?: string;
  dashed?: boolean;
  size?: SizeType;
};

function CustomStar({
  color = 'black',
  dashed,
  size = { height: 30, width: 30 },
}: CustomStarProps) {
  return (
    <Svg
      height={size.height}
      width={size.width}
      viewBox={`0 0 ${size.width + 3} ${size.height + 3}`}
      fill="black"
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
        stroke={color}
        fill={color}
        strokeDasharray={dashed ? '5,5' : 'none'}
      />
    </Svg>
  );
}

export default CustomStar;
