import { Button, View, Modal } from 'native-base';
import React, { useState } from 'react';

import ModalMeansRequest from './ModalMeansRequest';

export default function Means() {
  const [showModal, setShowModal] = useState(true);

  return (
    <View>
      <Button onPress={() => setShowModal(true)}>modal demande moyens</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalMeansRequest />
      </Modal>
    </View>
  );
}
