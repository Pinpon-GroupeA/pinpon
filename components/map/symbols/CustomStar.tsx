import React from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomStarProps = {
    color: string;
    strokeStyle?: boolean;
    fill?: boolean;
    size?: SizeType;
  };
  
  
function CustomStar({
  color,
  strokeStyle,
  fill,
  size = { height: 100, width: 100 },
}: CustomStarProps) {
    return (
        <Svg height={size.height} width={size.width} fill="none">
        <Path 
            d="m0,38.06894l38.19643,0l11.80299,-38.06894l11.803,38.06894l38.19642,0l-30.90151,23.52763l11.8036,38.06894l-30.90152,-23.52827l-30.90151,23.52827l11.80361,-38.06894l-30.90152,-23.52763z" 
            stroke={fill ? "black" : color}
            strokeWidth="5"
            fill={fill ? color : 'none'}
            strokeDasharray={strokeStyle ? '5,5' : 'none'}
        />
    </Svg>
    );
  }

  export default CustomStar;

