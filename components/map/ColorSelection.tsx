import { Box, Button, HStack, Text } from 'native-base';

import Colors from '../../constants/colors';
import { useAppStore } from '../../stores/store';

type ColorSelectionProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ColorSelection({ isOpen, onClose }: ColorSelectionProps) {
  const drawingsColor = useAppStore((state) => state.drawingsColor);
  const setDrawingsColor = useAppStore((state) => state.setDrawingsColor);
  const selectColor = useAppStore((state) => state.selectColor);
  const setSelectColor = useAppStore((state) => state.setSelectColor);

  return (
    <Box alignItems="center" flexDirection="column" justifyContent="space-evenly" mb="3">
      <Text>Type :</Text>
      <HStack space={1} alignContent="center">
        {!selectColor && (
          <Button
            backgroundColor={drawingsColor}
            onPress={() => {
              setSelectColor();
            }}
          />
        )}
        {selectColor && (
          <>
            <Button
              backgroundColor={Colors.RED}
              onPress={() => {
                setDrawingsColor(Colors.RED);
                setSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.BLUE}
              onPress={() => {
                setDrawingsColor(Colors.BLUE);
                setSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.GREEN}
              onPress={() => {
                setDrawingsColor(Colors.GREEN);
                setSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.ORANGE}
              onPress={() => {
                setDrawingsColor(Colors.ORANGE);
                setSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.PURPLE}
              onPress={() => {
                setDrawingsColor(Colors.PURPLE);
                setSelectColor();
              }}
            />
            <Button
              backgroundColor={Colors.BLACK}
              onPress={() => {
                setDrawingsColor(Colors.BLACK);
                setSelectColor();
              }}
            />
          </>
        )}
      </HStack>
    </Box>
  );
}

export default ColorSelection;
