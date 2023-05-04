import { Box } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { MAP_TYPES, UrlTile, MapPressEvent } from 'react-native-maps';

type MapBackgroundProps = {
  children: React.ReactNode;
  handlePress?: (event: MapPressEvent) => void;
};

function MapBackground({ children, handlePress }: MapBackgroundProps) {
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
//renvoi les informations des moyens lié à l'intervention en cours
async function MeansLoading() {
  const { data, error } = await supabase
    .from(Tables.INTERVENTIONS_MEANS_LINK)
    .select('mean_id,' + Tables.MEANS + '(id)')
    .eq(Columns.INTERVENTION_ID, usePathname().split('/')[2]);

  if (error) {
    console.log('1');
    console.log(error);
  } else {
    // TO DO Problème pour récupérer la localisation ,conversion en location ?
    console.log('2');
    console.log(data);
    let data2 = data as unknown as Mean;

    let data3 = data2.location as unknown as location;
    console.log(data3);
  }
}
//renvoi les informations lié à l'intervention en cours
async function InitialRegion() {
  const { data, error } = await supabase
    .from(Tables.INTERVENTIONS)
    .select()
    .eq(Columns.ID, usePathname().split('/')[2]);
  //il manque  latitudeDelta et longitudeDelta dans les formats en base
  if (error) {
    console.log('3');
    console.log(error);
  } else {
    console.log('4');
    console.log(data);
    return data as unknown as Intervention;
  }
}
async function DangerLoading() {
  const { data, error } = await supabase
    .from(Tables.INTERVENTIONS_DANGER_LINK)
    .select()
    .eq(Columns.INTERVENTION_ID, usePathname().split('/')[2]);
  if (error) {
    console.log('5');
    console.log(error);
  } else {
    console.log('6');
    console.log(data);
  }
}

export default MapBackground;
