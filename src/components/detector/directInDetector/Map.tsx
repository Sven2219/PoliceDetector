import React, { useContext, useEffect, useReducer, useRef } from 'react';
import MapView, { MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { width, height, LATITUDE_DELTA, LONGITUDE_DELTA } from '../../../helpers/constants/MapScreenConst';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { DetectorDispatchContext } from '../../../context/detector/DispatchContext';
import GetLocation from 'react-native-get-location';
import AddNewMarker from '../indirectInDetector/AddNewMarker';
import { IState, Actions, reducer } from '../../../reducers/mapReducer';
import AddPolicemanButton from '../indirectInDetector/AddPolicemanButton';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
//@ts-ignore
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { calculatingDistance, checkMode, nearestThree, preciseDistance, sortCalculatedDistance } from '../../../helpers/map/functions';
import { IFirebase, IPosition } from '../../../helpers/interface/interfaces';
import RenderPoliceman from '../indirectInDetector/RenderPoliceman';
import AnimateToRegionButton from '../indirectInDetector/AnimateToRegionButton';
const Map = (): JSX.Element => {
  const { dState } = useContext(DetectorStateContext);
  const { dDispatch } = useContext(DetectorDispatchContext);
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
    showMarker: false, markerPosition: { latitude: 0, longitude: 0 },
  });
  const mapRef = useRef<any>();
  useEffect(() => {
    checkUserSettings();
    messageForLocaction();
  }, [])
  useEffect(() => {
    //this means that user saved marker position
    if (state.showMarker === false && state.markerPosition.latitude === 0 && state.markerPosition.longitude === 0) {
      showPoliceman();
    }
  }, [dState.myPosition.latitude.toFixed(4) || dState.myPosition.longitude.toFixed(4) || state.showMarker])
  //opening full screen
  const checkUserSettings = (): void => {
    //I use on because when user change map mode or settings it will automaticly change
    //because when we use on it listen on that port all the time
    //this is crucial different between once and on
    //snap:any because when i set type ISettings it doesn't work
    //it saves value but I cannot read specific value like .mode...
    database().ref('Users/' + auth().currentUser?.uid).on('value', (snap: any) => {
      const result = snap.val();
      if (result) {
        dDispatch({ type: "setSettings", payload: snap.val() })
      }
    })
  }
  const messageForLocaction = (): void => {
    if (Platform.OS === 'android')
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Use Location?</h2> \ This app wants to change your device settings:<br/><br/>\ Use GPS for location<br/><br/>",
        ok: "YES", cancel: "NO"
      }).then(() => {
        findMyLocation();
      })
  }
  const findMyLocation = async (): Promise<void> => {
    try {
      const result = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 0,
      });
      dDispatch({ type: "setMyPostion", payload: { latitude: result.latitude, longitude: result.longitude } });
    } catch (error) {
      console.log(error)
    }
  }
  const saveLocationOfPoliceman = (): void => {
    let distance: number = 0;
    let position: IPosition = { latitude: 0, longitude: 0 };
    if (state.markerPosition.latitude === 0 && state.markerPosition.longitude === 0) {
      distance = preciseDistance(dState.myPosition, dState.myPosition);
      position = { latitude: dState.myPosition.latitude, longitude: dState.myPosition.longitude };
    }
    else {
      distance = preciseDistance(state.markerPosition, dState.myPosition)
      position = { latitude: state.markerPosition.latitude, longitude: state.markerPosition.longitude }
    }
    if (distance <= 3000) {
      const date: Date = new Date();
      database().ref('Policeman').push({
        latitude: position.latitude,
        longitude: position.longitude,
        date: {
          minutes: date.getMinutes(),
          hours: date.getHours(),
        }
      })
      dispatch({ type: "setMarkerPosition", payload: { latitude: 0, longitude: 0 }, showMarker: false })
    }
    else {
      Alert.alert("Request refused", "You can only post a police officer within a 3-mile radius");
    }
  }
  const showPoliceman = (): void => {
    let data: IFirebase[] = [];
    //complex operations...
    database().ref('Policeman/').on('value', (snap: any) => {
      data = snap.val();
      if (data !== null && data !== undefined) {
        data = Object.values(data);
        data = calculatingDistance(data, dState.myPosition);
        sortCalculatedDistance(data);
        data = nearestThree(data);
        dDispatch({ type: "setPoliceman", payload: data });
      }
    })
  }

  return (
    <View style={styles.container}>
      <AnimateToRegionButton mapRef={mapRef}/>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        customMapStyle={checkMode(dState.settings.mode)}
        zoomEnabled={true}
        showsBuildings={false}
        showsCompass={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        rotateEnabled={true}
        showsTraffic={false}
        initialRegion={{
          latitude: Number(dState.myPosition.latitude),
          longitude: Number(dState.myPosition.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        <RenderPoliceman />
        <AddNewMarker onDragEnd={(e: MapEvent<{}>) => dispatch({ type: "setMarkerPosition", payload: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })}
          showMarker={state.showMarker} />
      </MapView>
      <AddPolicemanButton onPress={() => { !state.showMarker ? dispatch({ type: "setShowMarker", payload: true }) : saveLocationOfPoliceman() }}
        showMarker={state.showMarker} fullScreen={dState.fullScreenFlag}
        mode={dState.settings.mode} undo={() => dispatch({ type: "setShowMarker", payload: false })}
      />
    </View>)
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Map;
