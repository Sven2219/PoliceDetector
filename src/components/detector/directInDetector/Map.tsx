import React, { useContext, useEffect, useMemo, useReducer, useRef } from 'react';
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
import { animateToRegion, calculatingDistance, checkMode, nearestThree, preciseDistance, sortCalculatedDistance } from '../../../helpers/map/functions';
import { IFirebase, IPosition } from '../../../helpers/interface/interfaces';
import RenderPoliceman from '../indirectInDetector/RenderPoliceman';
import AnimateToRegionButton from '../indirectInDetector/AnimateToRegionButton';

const Map = (): JSX.Element => {
  const { dState } = useContext(DetectorStateContext);
  const { dDispatch } = useContext(DetectorDispatchContext);
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
    showMarker: false, markerPosition: { latitude: 0, longitude: 0 },
    policeCounter: 0,
  });
  const mapRef = useRef<any>();

  useEffect(() => {
    //listener
    checkUserSettings();
    //only once
    messageForLocaction();
    //only once
    countPoliceman();
    //listener
    getAllPoliceman();
  }, [])


  useEffect(() => {
    if (dState.settings.autofocusFlag) {
      animateToRegion(1000, dState.myPosition, mapRef)
    }
  }, [dState.myPosition.latitude.toFixed(3) || dState.myPosition.longitude.toFixed(3)])


  //tip**** 
  //Posto je ovo dState.allPoliceman stanje(state) on se nece svaki put rekreirat kad se bilo koje drugo stanje promjeni
  //i zato ga mozemo stavit kao argument u useEffectu() ista situacija je dole kod useMemo() predajem mu objekt settings
  //da nije state to nebi radilo ispravno 
  useEffect(() => {
    if (dState.allPoliceman) {
      //it is called every time when policeman table or user position changes
      findThreeNearestPoliceman();
    }
  }, [dState.allPoliceman])

  //With toFixed(3) it is not refreshing constantly// it refresh every 20 meter something like that
  useEffect(() => {
    findThreeNearestPoliceman();
  }, [dState.myPosition.latitude.toFixed(3) || dState.myPosition.longitude.toFixed(3)])


  //opening full screen
  const checkUserSettings = (): void => {
    //I use on because when user change map mode or another setting it will automaticly update
    database().ref('Users/' + auth().currentUser?.uid).on('value', (snap: any) => {
      const result = snap.val();
      if (result) {
        dDispatch({ type: "setSettings", payload: snap.val() })
      }
    })
  }
  const messageForLocaction = async (): Promise<void> => {

    await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Use Location?</h2> \ This app wants to change your device settings:<br/><br/>\ Use GPS for location<br/><br/>",
      ok: "YES", cancel: "NO"
    })
    findMyLocation();

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
  const countPoliceman = (): void => {
    let lastIndex: string | null = '';
    database().ref('Policeman').limitToLast(1).once('child_added').then((snap) => {
      lastIndex = snap.key;
      if (lastIndex) {
        dispatch({ type: "setPoliceCounter", payload: parseInt(lastIndex) + 1 });
      }
    })
  }


  const policemanDistance = (): number => {
    if (state.markerPosition.latitude === 0 && state.markerPosition.longitude === 0) {
      return 0;
    }
    else {
      return preciseDistance(state.markerPosition, dState.myPosition)
    }
  }

  const savePoliceman = (position: IPosition): void => {
    const date: Date = new Date();
    database().ref('Policeman/' + state.policeCounter).set({
      latitude: position.latitude,
      longitude: position.longitude,
      date: {
        minutes: date.getMinutes(),
        hours: date.getHours(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      },
      id: state.policeCounter
    })
    dispatch({ type: "setMarkerPosition", payload: { latitude: 0, longitude: 0 }, showMarker: false, policeCounter: state.policeCounter + 1 })
  }

  //pressing the save button
  const handleButtonPress = (): void => {
    let distance: number = policemanDistance();
    let position: IPosition = { latitude: dState.myPosition.latitude, longitude: dState.myPosition.longitude };
    if (distance !== 0) {
      position = { latitude: state.markerPosition.latitude, longitude: state.markerPosition.longitude }
    }
    //User can only put policeman in radius of 3000m
    if (distance <= 3000) {
      savePoliceman(position);
    }
    else {
      Alert.alert("Request refused", "You can only post a police officer within a 3-mile radius");
    }
  }


  //This function will be triggered every time when Policeman table is changed(if any user delete or add item )
  //The answer on:"Why I need all policeman?"
  //Because when user changes his location I need to find the nearest three policeman
  //And I can do it only if I saved all policeman
  const getAllPoliceman = (): void => {
    let data: IFirebase[] = [];
    database().ref('Policeman').on('value', (snap: any) => {
      data = snap.val();
      if (data !== null && data !== undefined) {
        data = Object.values(data);
        //O(n) complexity
        //because when I delete a policeman it will be null
        data = data.filter((el: IFirebase) => el !== null);
        dDispatch({ type: "setAllPoliceman", payload: data });
      }
    })
  }
  const findThreeNearestPoliceman = (): void => {
    let value: IFirebase[] = [];
    try {
      value = calculatingDistance(dState.allPoliceman, dState.myPosition);
      sortCalculatedDistance(value);
      value = nearestThree(value);
      dDispatch({ type: "setOnlyThreeToShow", payload: value });
    } catch (error) {
      console.log(error)
    }
  }

  //Optimize
  const AddPolicemanButtonMemo = useMemo(() =>
    <AddPolicemanButton onPress={() => { !state.showMarker ? dispatch({ type: "setShowMarker", payload: true }) : handleButtonPress() }}
      showMarker={state.showMarker} fullScreen={dState.fullScreenFlag}
      mode={dState.settings.mode} undo={() => dispatch({ type: "setShowMarker", payload: false })}
    />
    , [state.showMarker, dState.settings, dState.fullScreenFlag, state.markerPosition])


  return (
    <View style={styles.container}>
      <AnimateToRegionButton mapRef={mapRef} />
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
        onUserLocationChange={(e) => { dDispatch({ type: "setMyPostion", payload: { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude } }) }}
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
      {AddPolicemanButtonMemo}
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
