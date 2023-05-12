import { useSearchParams } from 'expo-router';
import { Image, ScrollView, VStack, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { Coordinates } from '../../types/global-types';
import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';

type GalleryProps = {
  latitude: Coordinates['latitude'];
  longitude: Coordinates['longitude'];
};

export default function Gallery({ longitude, latitude }: GalleryProps) {
  const [images, setImages] = useState<any>([]);
  const { id: interventionId } = useSearchParams();

  const fetchAllImages = async () => {
    setImages([]);
    console.log(interventionId);
    await supabase.storage
      .from('poc')
      .list(`Intervention_${interventionId}/${latitude} ${longitude}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })
      .then(({ data }) => {
        data?.map(async (file) => {
          await supabase.storage
            .from('poc')
            .download(`Intervention_${interventionId}/${latitude} ${longitude}/${file.name}`)
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

  const { data: Images } = useQuery({
    queryKey: ['images'],
    queryFn: () => fetchAllImages(),
  });

  return (
    <ScrollView>
      {images?.map((image: { file: string; name: string }, i: number) => (
        <VStack key={i.toString()} alignItems="center" mb="5">
          <Image source={{ uri: image.file }} alt={i.toString()} w="650" h="300" mb="3" />
          <Text fontSize="xl">{image.name}</Text>
        </VStack>
      ))}
    </ScrollView>
  );
}
