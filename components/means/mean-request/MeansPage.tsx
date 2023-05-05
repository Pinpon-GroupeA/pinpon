import { useQuery } from '@tanstack/react-query';
import { Box, Fab, Modal } from 'native-base';
import { useState } from 'react';

import ModalMeansRequest from './ModalMeansRequest';
import { MeanType } from '../../../types/mean-types';
import { fetchMeansTypes } from '../../../utils/means-type';
import MeansTable from '../means-table/MeansTable';

export default function MeansPage() {
  const [showModal, setShowModal] = useState(false);

  const { data: meanTypes } = useQuery<MeanType[]>(['meanTypes'], {
    queryFn: fetchMeansTypes,
  });

  return (
    <Box>
      <MeansTable means={[]} />
      <Fab
        label="Demande de moyens"
        isLoading={meanTypes === undefined}
        isLoadingText="Récupération des moyens possibles..."
        bottom={115}
        backgroundColor="#19837C"
        onPress={() => setShowModal(true)}
        renderInPortal={false}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalMeansRequest meansType={meanTypes ?? []} setShowModal={setShowModal} />
      </Modal>
    </Box>
  );
}
