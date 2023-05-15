import React from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { SizeType } from '../../../types/global-types';

type ExplosionProps = {
  color?: string;
  dashed?: boolean;
  size?: SizeType;
  fill?: boolean;
};

function Explosion({
  color = 'black',
  dashed,
  size = { height: 30, width: 30 },
  fill = false,
}: ExplosionProps) {
  return (
    <Svg height={size.height} width={size.width} viewBox="0 0 50 50" fill="none">
      <Path
        d="m48.97658,27.60815l-5.65449,0.32135l-1.51282,7.82961l-5.00238,-1.89291l-7.25464,6.00792l-2.76205,-3.50618l-13.19127,6.98166l2.85331,-8.70916l-10.7367,-2.17388l3.3597,-3.23439l-7.3714,-5.93634l5.2975,-1.43562l-1.66573,-7.81405l5.55338,0.81895l4.5688,-7.21085l4.04611,2.81351l9.35276,-4.31827l1.25422,3.9148l11.16729,-0.05466l-1.93587,3.77317l9.43628,4.2263l-4.51134,2.43358l4.70933,7.16544z"
        stroke={color}
        fill={fill ? color : 'none'}
        strokeDasharray={dashed ? '5,5' : 'none'}
        strokeWidth={3}
      />
    </Svg>
  );
}

export default Explosion;
