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

  return (
    <Box alignItems="center" flexDirection="column" justifyContent="space-evenly" mb="3">
      <Text>Type :</Text>
      <HStack space={1} alignContent="center">
        {!selectColor && (
          <Button
            backgroundColor={drawingsColor}
            onPress={() => {
              handleSelectColor();
            }}
          />
        )}
        {selectColor && (
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            <Button
              backgroundColor={Colors.RED}
              onPress={() => {
                setDrawingsColor(Colors.RED);
                handleSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.BLUE}
              onPress={() => {
                setDrawingsColor(Colors.BLUE);
                handleSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.GREEN}
              onPress={() => {
                setDrawingsColor(Colors.GREEN);
                handleSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.ORANGE}
              onPress={() => {
                setDrawingsColor(Colors.ORANGE);
                handleSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.PURPLE}
              onPress={() => {
                setDrawingsColor(Colors.PURPLE);
                handleSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.BLACK}
              onPress={() => {
                setDrawingsColor(Colors.BLACK);
                handleSelectColor();
              }}
            />
          </Box>
        )}
      </HStack>
    </Box>
  );
}

export default ColorSelection;
