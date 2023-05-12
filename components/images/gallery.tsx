import { useSearchParams } from 'expo-router';
import { Heading, Image, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';

import { ImageData } from '../../types/drone-types';
import { Coordinates } from '../../types/global-types';
import { supabase } from '../../utils/supabase';

type GalleryProps = {
  latitude: Coordinates['latitude'];
  longitude: Coordinates['longitude'];
};

export default function Gallery({ longitude, latitude }: GalleryProps) {
  const { id: interventionId } = useSearchParams();
  const [images, setImages] = useState<ImageData[]>([]);

  const bucketName = 'photo';

  const fetchAllImages = async () => {
    setImages([]);
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(`intervention_${interventionId}/${latitude}_${longitude}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) {
      throw new Error(error.message);
    }

    files.forEach(async (file) => {
      const { data: downloadedFile, error } = await supabase.storage
        .from(bucketName)
        .download(`intervention_${interventionId}/${latitude}_${longitude}/${file.name}`);

      if (error) {
        throw new Error(error.message);
      }

      const reader = new FileReader();
      reader.readAsDataURL(downloadedFile);
      reader.onloadend = () => {
        const fileAsBase64 = reader.result;
        const name = file.name.slice(0, -4);
        setImages((images) => [...images, { file: fileAsBase64?.toString() ?? '', name }]);
      };
    });
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  if (!images || !images.length) {
    return <Heading>Pas d'images disponibles</Heading>;
  }

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
