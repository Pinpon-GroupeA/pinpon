import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Icon } from 'native-base';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <Icon as={FontAwesome} size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function InterventionDetailsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'Carte',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="means"
        options={{
          title: 'Moyens',
          tabBarIcon: ({ color }) => <TabBarIcon name="truck" color={color} />,
        }}
      />
      <Tabs.Screen
        name="drone"
        options={{
          title: 'Drone',
          tabBarIcon: ({ color }) => <TabBarIcon name="plane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Vidéo',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
    </Tabs>
  );
}
