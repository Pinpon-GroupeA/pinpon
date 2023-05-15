import { AlertDialog, Button } from 'native-base';
import { useRef } from 'react';

import Colors from '../../constants/colors';

type AlertDialogComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  headerText: string;
  bodyText: string;
};

const AlertDialogComponent = ({
  isOpen,
  onClose,
  onConfirm,
  headerText,
  bodyText,
}: AlertDialogComponentProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{headerText}</AlertDialog.Header>
        <AlertDialog.Body>{bodyText}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              _pressed={{ bgColor: Colors.TURQUOISE30 }}
              onPress={onClose}
              ref={cancelRef}
            >
              Annuler
            </Button>
            <Button bgColor={Colors.TURQUOISE} onPress={onConfirm}>
              Confirmer
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
