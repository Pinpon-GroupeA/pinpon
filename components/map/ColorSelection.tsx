import { Button, Modal } from 'native-base';

import { useAppStore } from '../../stores/store';
import { dangerCodeColors } from '../../utils/danger-code';

type ColorSelectionProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ColorSelection({ isOpen, onClose }: ColorSelectionProps) {
  const setDrawingsColor = useAppStore((state) => state.setDrawingsColor);

  const handleColorPress = (color: string) => {
    setDrawingsColor(color);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content justifyContent="center">
        <Modal.CloseButton />
        <Modal.Header>Type du moyen</Modal.Header>
        <Modal.Body flexDir="row" justifyContent="center">
          {dangerCodeColors.map((dangerCode) => (
            <Button
              key={dangerCode.color}
              bgColor={dangerCode.color}
              onPress={() => handleColorPress(dangerCode.color)}
              marginX={1}
            />
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default ColorSelection;
