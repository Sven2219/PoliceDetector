import React, { useContext, useEffect, useReducer } from 'react';
import MapView, { MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { width, height, LATITUDE_DELTA, LONGITUDE_DELTA } from '../../helpers/constants/MapScreenConst';
import { DetectorStateContext } from '../../context/detector/StateContext';
import { DetectorDispatchContext } from '../../context/detector/DispatchContext';
import GetLocation from 'react-native-get-location';
import AddNewMarker from './AddNewMarker';
import { IState, Actions, reducer } from '../../reducers/mapReducer';
const Map = (): JSX.Element => {
  const {dState} = useContext(DetectorStateContext);
  const {dDispatch} = useContext(DetectorDispatchContext);
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { showMarker: true, markerPosition: { latitude: 0, longitude: 0 } });
  //this things should render only once when app starts..
  useEffect(() => {
    findMyLocation()
  }, [])


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
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
      <AddNewMarker onDragEnd={(e:MapEvent<{}>)=>dispatch({type:"setMarkerPosition",payload:{latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude}})}
        showMarker={state.showMarker}/>
      </MapView>
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
