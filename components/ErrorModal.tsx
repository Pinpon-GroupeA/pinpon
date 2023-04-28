import { Modal, Text, VStack } from 'native-base';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export default function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Erreur</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Text fontWeight="md">{message}</Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
