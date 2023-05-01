import { Box } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { MAP_TYPES, UrlTile } from 'react-native-maps';

function Map() {
  const initialRegion = {
    latitude: 48.115537335418445,
    longitude: -1.638870923241485,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };

  return (
    <Box>
      <MapView
        region={initialRegion}
        mapType={MAP_TYPES.NONE}
        rotateEnabled={false}
        style={styles.map}
        showsUserLocation
      >
        <UrlTile urlTemplate="https://a.tile.openstreetmap.de/{z}/{x}/{y}.png" maximumZ={19} />
      </MapView>
    </Box>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '125%',
  },
});

export default Map;
