import React, { useContext, useEffect, useReducer } from 'react';
import MapView, { MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { width, height, LATITUDE_DELTA, LONGITUDE_DELTA } from '../../helpers/constants/MapScreenConst';
import { DetectorStateContext } from '../../context/detector/StateContext';
import { DetectorDispatchContext } from '../../context/detector/DispatchContext';
import GetLocation from 'react-native-get-location';
import AddNewMarker from './AddNewMarker';
import { IState, Actions, reducer } from '../../reducers/mapReducer';
import AddPolicemanButton from './AddPolicemanButton';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { ISettings } from '../../helpers/interface/interfaces';
import { checkMode } from '../../helpers/map/functions';
const Map = (): JSX.Element => {
  const { dState } = useContext(DetectorStateContext);
  const { dDispatch } = useContext(DetectorDispatchContext);
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
    showMarker: false, markerPosition: { latitude: 0, longitude: 0 },
    settings: { notificationFlag: false, autofocusFlag: false, mode: "classic" }, fullScreen: false
  });
  //this things should render only once when app starts..
  useEffect(() => {
    checkUserSettings();
    findMyLocation();
  }, [])
  const checkUserSettings = () => {
    //we use here on because when user change map mode or settings it will automaticly change
    //because when we use on it listen on that port all the time
    //this is crucial different between once and on
    //snap:any because when i set type ISettings it doesn't work
    //it saves value but I cannot read specific value like .mode...
    database().ref('Users/' + auth().currentUser?.uid).on('value', (snap: any) => {
      dispatch({ type: "setSettings", payload: snap.val() })
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
  const saveLocationOfPoliceman = () => {
    console.log("tu smo")
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={checkMode(state.settings.mode)}
        zoomEnabled={true}
        showsBuildings={false}
        showsCompass={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        rotateEnabled={true}
        initialRegion={{
          latitude: Number(dState.myPosition.latitude),
          longitude: Number(dState.myPosition.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        <AddNewMarker onDragEnd={(e: MapEvent<{}>) => dispatch({ type: "setMarkerPosition", payload: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } })}
          showMarker={state.showMarker} />
      </MapView>
      <AddPolicemanButton onPress={() => { !state.showMarker ? dispatch({ type: "setShowMarker", payload: true }) : saveLocationOfPoliceman() }}
        showMarker={state.showMarker} fullScreen={state.fullScreen}
        mode={state.settings.mode}
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
