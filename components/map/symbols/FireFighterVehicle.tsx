import Svg, { Line, Rect } from 'react-native-svg';
import React, { Text } from 'react-native';

import { SizeType } from '../../../types/global-types';

type CustomFireFighterVehicleProps = {
  color: string;
  strokeStyle?: boolean;
  fill?: boolean;
  size?: SizeType;
  name: string
};


function CustomFireFighterVehicle({
  color,
  strokeStyle,
  fill,
  size = { height: 100, width: 100 },
  name,
}: CustomFireFighterVehicleProps) {
    return (
        <Svg height="100" width="100" fill="none">
            <Rect 
                strokeWidth="5" 
                height="50" 
                width="95" 
                y="47.5" 
                x="2.5" 
                stroke={fill ? "black" : color}
                fill={fill ? color : 'none'}
                strokeDasharray={strokeStyle ? 5 : 'none'}/>
            <Text style={{ position: "relative", left: "10%", bottom: "-250%", fontSize: 18}}>{name}</Text>
            <Line strokeWidth="5" y2="25" x2="50" y1="50" x1="50" stroke={fill ? "black" : color} fill="none" strokeDasharray={strokeStyle ? 3 : 'none'}/>
        </Svg>
    );
}

