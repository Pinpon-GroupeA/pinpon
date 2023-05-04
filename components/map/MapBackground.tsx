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
import { Danger } from '../../types/danger-types';


const DangerList: Danger[]= [];

function MapBackground() {
  const [markers, setMarkers] = useState<{coordinates: location;}[]>([]);
  
  const MeanList= [];
  console.log('Début')
  //MeansLoading();
 //DangerLoading();

 /** FONCTION recherche de la région initial
  * 

 // const intervention  = InitialRegion();
  let longitude=0;
  let latitude = 0;
  //Fonctionne mais dangeureux  ? Problème d'undefined, a corriger
//  intervention.then((data) => {latitude = data?.location.latitude;
  //longitude = data?.location.longitude});
  const initialRegion = {
    latitude: longitude,
    longitude: latitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };
  */

  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  };
  //FONCTION INSERT DANGER
  /**const dangerTest:  Danger = {
    location: {
      latitude: 0,
      longitude: 0
    },
    DangerType: 'INC',
    InterventionId: 2
  }
  InsertDanger(dangerTest)
  */


 /** FONCTION UPDATE localisation moyen
  * 
  * const meanTest: Mean = {
   id: '1',
   label: '',
   requestTime: '',
   schduledArrivalTime: '',
   CRMArrivalTime: '',
   onSiteArrivalTime: '',
   availableTime: '',
   location: {
     latitude: 3,
     longitude: 3
   },
   meanType: 'VSAV',
   dangerCode: 'INC'
 }
 UpdateMoyens(meanTest)
 */
 

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
  // il faut ajouter les dangers à la dangerList
}

async function UpdateMoyens(Mean: Mean){
  const {error} = await supabase.from(Tables.MEANS).update({location: Mean.location}).eq(Columns.ID,Mean.id)
  if (error) {
    console.log(error)

  } else {
    console.log("okokokokok")
  }
}
async function InsertDanger(Danger: Danger) {
  const {error} = await supabase.from(Tables.INTERVENTIONS_DANGER_LINK).insert({location: Danger.location, danger_code: Danger.DangerType,intervention_id: Danger.InterventionId});
  
  if (error) {
    console.log(error)
  } else {
    DangerList.push(Danger)
  }
  console.log(DangerList)
}
export default MapBackground;
