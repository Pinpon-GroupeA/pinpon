import { useLocalSearchParams, useSearchParams } from 'expo-router';
import Gallery from '../../../../../components/images/gallery';

export default function Images() {
  const { lon, lat } = useLocalSearchParams();

  return <Gallery latitude={lat} longitude={lon} />;
}
