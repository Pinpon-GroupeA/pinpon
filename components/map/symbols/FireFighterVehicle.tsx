import React from 'react-native';
import Svg, { Line, Rect, Text } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type FireFighterVehicleProps = {
  color?: string;
  dashed?: boolean;
  fill?: boolean;
  size?: SizeType;
  name: string;
};

function FireFighterVehicle({
  color = 'black',
  dashed = false,
  fill = false,
  size = { height: 50, width: 50 },
  name,
}: FireFighterVehicleProps) {
  return (
    <Svg
      height={size.height}
      width={size.width}
      viewBox={`0 0 ${size.width * 2} ${size.height * 2}`}
      fill="none"
    >
      <Line
        strokeWidth="5"
        y1="45%"
        x1="50%"
        y2="20%"
        x2="50%"
        stroke={fill ? 'black' : color}
        fill="none"
        strokeDasharray={dashed ? 5 : 'none'}
      />
      <Rect
        height="50%"
        width="80%"
        x="10%"
        y="45%"
        strokeWidth="5"
        stroke={color}
        strokeDasharray={dashed ? 5 : 'none'}
        fill={fill ? color : 'none'}
      />
      <Text x="50%" y="75%" textAnchor="middle" stroke={color} strokeWidth="2" fontSize="18">
        {name}
      </Text>
    </Svg>
  );
}
export default FireFighterVehicle;
