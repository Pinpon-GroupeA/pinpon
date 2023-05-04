import { Box } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { MAP_TYPES, UrlTile, MapPressEvent } from 'react-native-maps';

import { Coordinates } from '../types/global-types';

type MapBackgroundProps = {
  children: React.ReactNode;
  handlePress?: (event: MapPressEvent) => void;
  initialRegion: Coordinates;
};

function MapBackground({ children, handlePress, initialRegion }: MapBackgroundProps) {
  return (
    <Box>
      <MapView
        region={{ ...initialRegion, latitudeDelta: 0.02, longitudeDelta: 0.01 }}
        mapType={MAP_TYPES.NONE}
        rotateEnabled={false}
        style={styles.map}
        showsUserLocation
        onPress={handlePress}
        moveOnMarkerPress={false}
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.de/{z}/{x}/{y}.png"
          maximumZ={19}
          zIndex={-3}
        />
        {children}
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

export default MapBackground;
