import { AntDesign } from '@expo/vector-icons';
import { useRouter, useSearchParams } from 'expo-router';
import { Fab, HStack, Icon, Image, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

import { ImageData, isImageData } from '../../types/drone-types';
import { Coordinates } from '../../types/global-types';
import { supabase } from '../../utils/supabase';

type GalleryProps = {
  latitude: Coordinates['latitude'];
  longitude: Coordinates['longitude'];
};

export default function Gallery({ longitude, latitude }: GalleryProps) {
  const { id: interventionId } = useSearchParams();
  const router = useRouter();
  const [images, setImages] = useState<ImageData[]>([]);

  const bucketName = 'photo';

  const fetchAllImages = async () => {
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

    const newImages = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(
            `intervention_${interventionId}/${latitude}_${longitude}/${file.name}`,
            3600
          );

        if (error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }

        if (!data) return;

        return {
          name: file.name.slice(0, -4),
          file: data.signedUrl,
        };
      })
    );

    const filteredNewImages = newImages.filter(isImageData);

    setImages([...new Set([...images, ...filteredNewImages])]);
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  if (!images || !images.length) {
    return (
      <>
        <VStack flex="1" alignItems="center">
          <Text fontSize="3xl">Coordonnées :</Text>
          <Text fontSize="xl">
            {latitude}, {longitude}
          </Text>
          <HStack flex="1" alignItems="center">
            <Text fontSize="3xl">Pas d'images disponibles</Text>
          </HStack>
        </VStack>
        <Fab
          placement="top-left"
          bgColor="#19837C"
          icon={<Icon color="white" as={AntDesign} name="caretleft" size="4" />}
          onPress={() => router.back()}
          renderInPortal={false}
        />
      </>
    );
  }

  return (
    <>
      <ScrollView>
        <VStack alignItems="center" mb="5">
          <Text fontSize="3xl">Coordonnées :</Text>
          <Text fontSize="xl">
            {latitude}, {longitude}
          </Text>
        </VStack>
        {images?.map((image: { file: string; name: string }, i: number) => (
          <VStack key={`${i}`} alignItems="center" mb="7">
            <Image source={{ uri: image.file }} alt={`Photo n°${i}`} w="650" h="300" />
            <Text fontSize="xl">{image.name}</Text>
          </VStack>
        ))}
      </ScrollView>
      <Fab
        placement="top-left"
        bgColor="#19837C"
        icon={<Icon color="white" as={AntDesign} name="caretleft" size="4" />}
        onPress={() => router.back()}
        renderInPortal={false}
      />
    </>
  );
}
