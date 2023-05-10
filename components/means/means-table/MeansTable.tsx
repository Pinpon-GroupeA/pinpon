import { Entypo } from '@expo/vector-icons';
import { Box, Heading, ScrollView, IconButton, Icon, Modal } from 'native-base';
import React, { useState } from 'react';
import { Table, Row } from 'react-native-table-component';

import ConfirmationModal from './ConfirmationModal';
import { InterventionMean, MeanModalContent } from '../../../types/mean-types';
import { Request } from '../../../types/request-types';
import { getMilitaryTime, addMinutes } from '../../../utils/date';
import { deleteMeans } from '../../../utils/means';
import AlertDialogComponent from '../../map/AlertDialogComponent';

type MeansTableProps = {
  means: InterventionMean[];
  requests: Request[];
};

export default function MeansTable({ means, requests }: MeansTableProps) {
  const [modalContent, setModalContent] = useState<MeanModalContent | null>(null);
  const [requestId, setRequestId] = useState<number | null>(null);

  const tableHead = [
    'Moyen',
    'Demandé à',
    'Arrivée prévue à',
    'Au CRM à',
    'Sur site à',
    'Disponible à',
    'Action',
  ];

  return (
    <Box marginX={3}>
      <Heading pt={3} pb={5} size="xl" color="#19837C">
        Tableau des moyens
      </Heading>

      <Box marginX={3} paddingBottom={300}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#F2F2F2' }}>
          <Row
            data={tableHead}
            flexArr={[1, 1, 1, 1, 1, 1, 0.5]}
            textStyle={{ fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}
            style={{ backgroundColor: '#19837C30' }}
          />
        </Table>
        <ScrollView>
          <Table>
            {means.map((mean, index) => (
              <Row
                key={index}
                data={[
                  mean.means.label,
                  getMilitaryTime(mean.request_date ? new Date(mean.request_date) : undefined),
                  addMinutes(mean.request_date, 20),
                  getMilitaryTime(mean.crm_arrival ? new Date(mean.crm_arrival) : undefined),
                  getMilitaryTime(mean.sector_arrival ? new Date(mean.sector_arrival) : undefined),
                  getMilitaryTime(mean.available_at ? new Date(mean.available_at) : undefined),
                  <IconButton
                    flex={1}
                    alignItems="center"
                    marginX={2}
                    _pressed={{ backgroundColor: '#19837C50', borderRadius: '20' }}
                    icon={<Icon as={Entypo} name="pencil" color="black" size={6} />}
                    onPress={() =>
                      setModalContent({
                        id: mean.id,
                        crmArrival: mean.crm_arrival,
                        sectorArrival: mean.sector_arrival,
                        availableAt: mean.available_at,
                      })
                    }
                  />,
                ]}
                flexArr={[1, 1, 1, 1, 1, 1, 0.5]}
                textStyle={{ textAlign: 'center', fontSize: 16 }}
                style={[
                  { padding: 1 },
                  index % 2 ? { backgroundColor: 'white' } : { backgroundColor: '#0000' },
                ]}
              />
            ))}
            {requests.map((request, index) => (
              <Row
                key={index}
                data={[
                  request.mean_type,
                  getMilitaryTime(new Date(request.request_time)),
                  '',
                  '',
                  '',
                  '',
                  <IconButton
                    flex={1}
                    alignItems="center"
                    marginX={2}
                    _pressed={{ backgroundColor: '#19837C50', borderRadius: '20' }}
                    icon={<Icon as={Entypo} name="cross" color="black" size={7} />}
                    onPress={() => setRequestId(request.id)}
                  />,
                ]}
                flexArr={[1, 1, 1, 1, 1, 1, 0.5]}
                textStyle={{ textAlign: 'center', fontSize: 16 }}
                style={[index % 2 ? { backgroundColor: 'white' } : { backgroundColor: '#0000' }]}
              />
            ))}
          </Table>
        </ScrollView>
      </Box>
      {modalContent && (
        <Modal isOpen={modalContent !== null} onClose={() => setModalContent(null)} size="md">
          <ConfirmationModal content={modalContent} closeModal={() => setModalContent(null)} />
        </Modal>
      )}
      <AlertDialogComponent
        isOpen={requestId !== null}
        onClose={() => setRequestId(null)}
        onConfirm={() => {
          deleteMeans(requestId!);
          setRequestId(null);
        }}
        headerText="Confirmer suppression"
        bodyText="Voulez-vous supprimer la demande du moyen ?"
      />
    </Box>
  );
}
