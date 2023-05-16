import { Image, Spinner } from 'native-base';
import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';

import useInterval from '../../hooks/useInterval';
import { supabase } from '../../utils/supabase';

type DroneVideoProps = {
  interventionId: string;
};

export default function DroneVideo({ interventionId }: DroneVideoProps) {
  const [currentImage, setCurrentImage] = useState<string>();

  const fetchCurrentImage = async () => {
    const { data, error } = await supabase.storage
      .from('video')
      .createSignedUrl(`intervention_${interventionId}/photo.png`, 30);

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return;
    }

    const url = data?.signedUrl;
    if (!url) return;

    setCurrentImage(url);
  };

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  useInterval(fetchCurrentImage, 3000);

  if (!currentImage) return <Spinner />;

  return (
    <Image
      style={{ width: 980, height: 380 }}
      source={{ uri: currentImage, cache: 'reload' }}
      defaultSource={{ uri: currentImage, cache: 'reload' }}
      resizeMethod="scale"
      resizeMode="cover"
      alt="Dernière image du drone"
    />
  );
}
