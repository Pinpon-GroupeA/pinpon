import React from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type CustomTriangleProps = {
    color: string;
    strokeStyle?: boolean;
    fill?: boolean;
    size?: SizeType;
  };
  
  
function CustomTriangle({
  color,
  strokeStyle,
  fill,
  size = { height: 50, width: 50 },
}: CustomTriangleProps) {
    return (
        <Svg height={size.height} width={size.width} fill="none">
            <Path 
                d="m-0.16599,103.49998l50.33299,-103.83264l50.33299,103.83264l-100.66599,0z" 
                stroke={fill ? "black" : color}
                strokeWidth="5"
                fill={fill ? color : 'none'}
                strokeDasharray={strokeStyle ? '5,5' : 'none'}
            />
        </Svg>
    );
  }

  export default CustomTriangle;
