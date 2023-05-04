import { Box } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { MAP_TYPES, MapPressEvent, Marker, UrlTile } from 'react-native-maps';
import { Columns ,supabase, Tables } from '../../utils/supabase';
import { usePathname } from 'expo-router';
import { location } from '../../types/types';
import {Mean} from '../../types/mean-types'
import { Intervention } from '../../types/intervention-types';
function MapBackground() {
  const [markers, setMarkers] = useState<{coordinates: location;}[]>([]);
  
  const MeanList= [];
  const DangerList = [];
  console.log('Début')
  //MeansLoading();
 //DangerLoading();
  const intervention  = InitialRegion();
  let longitude=0;
  let latitude = 0;
  //Fonction mais dangeureux  ? Problème d'undefined, a corriger
  intervention.then((data) => {latitude = data?.location.latitude;
  longitude = data?.location.longitude});
  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };
  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
      setMarkers([
        ...markers,
        {coordinates: { latitude, longitude }},
      ]);
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
      >
        <UrlTile urlTemplate="https://a.tile.openstreetmap.de/{z}/{x}/{y}.png" maximumZ={19} />
        {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker.coordinates}/>
      ))}
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
  const {data , error}= await supabase.from(Tables.INTERVENTIONS_MEANS_LINK).select('mean_id,'+Tables.MEANS+'(id)').eq(Columns.INTERVENTION_ID,usePathname().split('/')[2])
  
  if (error) {
    console.log("1")
    console.log (error)
  } else {
    // TO DO Problème pour récupérer la localisation ,conversion en location ? 
    console.log("2")
    console.log(data)
    let data2 = data as unknown  as Mean 
    
    let data3 = data2.location as unknown as location
    console.log(data3) 
  }
}
//renvoi les informations lié à l'intervention en cours
async function InitialRegion() {
  const { data , error } = await supabase.from(Tables.INTERVENTIONS).select().eq(Columns.ID,usePathname().split('/')[2])
  //il manque  latitudeDelta et longitudeDelta dans les formats en base
  if (error) {
  console.log("3")
  console.log (error)
  } else {
    console.log("4")
    console.log(data)
    return data as unknown as Intervention;
  }
}
async function DangerLoading() {
  const {data , error}= await supabase.from(Tables.INTERVENTIONS_DANGER_LINK).select().eq(Columns.INTERVENTION_ID,usePathname().split('/')[2])
  if (error) { 
    console.log("5")
    console.log (error)
  } else {
    console.log("6")
    console.log(data)
  }
}

export default MapBackground;
