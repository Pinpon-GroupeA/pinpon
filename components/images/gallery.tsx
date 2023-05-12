import { useSearchParams } from 'expo-router';
import { Button, Image, ScrollView, VStack, Text } from 'native-base';
import { useState } from 'react';

import { supabase } from '../../utils/supabase';

export default function Drone() {
  const [images, setImages] = useState<any>([]);
  const { id: interventionId } = useSearchParams();

  const onPressDrone = async () => {
    setImages([]);
    console.log(interventionId);
    await supabase.storage
      .from('poc')
      .list('Intervention_' + interventionId + '/666 999', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })
      .then(({ data }) => {
        data?.map(async (file) => {
          await supabase.storage
            .from('poc')
            .download('Intervention_' + interventionId + '/666 999/' + file.name)
            .then(({ data }) => {
              if (data) {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                  const base64data = reader.result;
                  const filename = file.name.slice(0, -4);
                  setImages((images: any) => [...images, { file: base64data, name: filename }]);
                };
              }
            });
        });
      });
  };

  return (
    <ScrollView>
      <Button onPress={onPressDrone}>Demande de données au back du drone</Button>
      {images?.map((image: { file: string; name: string }, i: number) => (
        <VStack key={i.toString()} alignItems="center" mb="5">
          <Image source={{ uri: image.file }} alt={i.toString()} w="650" h="300" mb="3" />
          <Text fontSize="xl">{image.name}</Text>
        </VStack>
      ))}
    </ScrollView>
  );
}
