import { Box, Button, HStack, Text } from 'native-base';
import { useState } from 'react';

import Colors from '../../constants/colors';
import { useAppStore } from '../../stores/store';

type ColorSelectionProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ColorSelection({ isOpen, onClose }: ColorSelectionProps) {
  const drawingsColor = useAppStore((state) => state.drawingsColor);
  const setDrawingsColor = useAppStore((state) => state.setDrawingsColor);

  const [selectColor, setSelectColor] = useState(false);

  const handleSelectColor = () => {
    setSelectColor(!selectColor);
  };

  const colorsList = [
    Colors.RED,
    Colors.BLUE,
    Colors.GREEN,
    Colors.ORANGE,
    Colors.PURPLE,
    Colors.BLACK,
  ];

  return (
    <Box alignItems="center" flexDirection="column" justifyContent="space-evenly" mb="3">
      <Text>Type :</Text>
      <HStack space={1} alignContent="center">
        {!selectColor && (
          <Button
            width="6"
            height="6"
            backgroundColor={drawingsColor}
            onPress={() => {
              handleSelectColor();
            }}
          />
        )}
        {selectColor && (
          <Box flex="1" flexDirection="row" flexWrap="wrap" justifyContent="space-around" px={2}>
            {colorsList.map((color, index) => (
              <Button
                width="6"
                height="6"
                key={index}
                backgroundColor={color}
                onPress={() => {
                  setDrawingsColor(color);
                  handleSelectColor();
                }}
              />
            ))}
          </Box>
        )}
      </HStack>
    </Box>
  );
}

export default ColorSelection;
