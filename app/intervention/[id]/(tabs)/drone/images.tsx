import { useLocalSearchParams } from 'expo-router';
import { Heading } from 'native-base';

import Gallery from '../../../../../components/images/gallery';

export default function Images() {
  const { lon, lat } = useLocalSearchParams();

  if (lon && lat) {
    return (
      <Gallery
        latitude={isNaN(Number(lat)) ? Number(lat[0]) : Number(lat)}
        longitude={isNaN(Number(lon)) ? Number(lon[0]) : Number(lon)}
      />
    );
  }

  return <Heading>Erreur: Pas de latitude ou longitude</Heading>;
}
