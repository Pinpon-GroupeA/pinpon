import { AlertDialog, Button } from 'native-base';
import { useRef } from 'react';

type PolylineDeletionAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const PolylineDeletionAlert = ({ isOpen, onClose, onConfirm }: PolylineDeletionAlertProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Suppression tracé</AlertDialog.Header>
        <AlertDialog.Body>
          Voulez-vous vraiment supprimer ce tracé ? Cette action est irréversible.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Annuler
            </Button>
            <Button colorScheme="danger" onPress={onConfirm}>
              Confirmer
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default PolylineDeletionAlert;
