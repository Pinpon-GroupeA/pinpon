import React from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomInvertedTriangleProps = {
  color: string;
  strokeStyle?: boolean;
  fill?: boolean;
  size?: SizeType;
};


function CustomInvertedTriangle({
  color,
  strokeStyle,
  fill,
  size = { height: 50, width: 50 },
}: CustomInvertedTriangleProps) {
    return (
        <Svg height={size.height} width={size.width} viewBox={`0 0 ${size.height} ${size.width*3}`} fill="none">
        <Path 
            transform="rotate(180, 50, 50)" 
            d="m0.00067,100.00001l50.33299,-100.33266l50.33299,100.33266l-100.66599,0z" 
            stroke={fill ? "black" : color}
            strokeWidth="3"
            fill={fill ? color : 'none'}
            strokeDasharray={strokeStyle ? '5,5' : 'none'}
        />
    </Svg>
    );
  }

export default CustomInvertedTriangle;
