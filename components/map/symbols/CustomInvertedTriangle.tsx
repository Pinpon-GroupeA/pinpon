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
  size = { height: 100, width: 100 },
}: CustomInvertedTriangleProps) {
    return (
        <Svg height={size.height} width={size.width} fill="none">
        <Path 
            transform="rotate(180, 50, 50)" 
            d="m0.00067,100.00001l50.33299,-100.33266l50.33299,100.33266l-100.66599,0z" 
            stroke={fill ? "black" : color}
            strokeWidth="5"
            fill={fill ? color : 'none'}
            strokeDasharray={strokeStyle ? '5,5' : 'none'}
        />
    </Svg>
    );
  }

export default CustomInvertedTriangle;
