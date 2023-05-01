import { Link } from 'expo-router';
import { Text } from 'native-base';

export default function Intervention() {
  return (
    <>
      <Text>Liste des interventions</Text>
      <Link href="/intervention/1">Test tabs</Link>
    </>
  );
}
