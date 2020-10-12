import React, { useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import MapView, { MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet, View } from 'react-native';
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
  //d stand for detector
  //dState and dDispatch === detector state and detector dispatch
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
    //samo jednom
    messageForLocaction();
    //samo jednom
    countPoliceman();
    //listener
    getAllPoliceman();
  }, [])

  //ovo radi samo u slucaju ako korisnik ima ukljuceno autofokusiranje
  useEffect(() => {
    if (dState.settings.autofocusFlag) {
      animateToRegion(1000, dState.myPosition, mapRef)
    }
  }, [dState.myPosition.latitude.toFixed(3), dState.myPosition.longitude.toFixed(3)])


  /*Kao argument useEffectu se predaje dState.allPoliceman to ce radit jer se stanje nece svaki puta ponovo rekreirat
  kada se promjeni bilo koje drugo stanje*/
  /*toFixed(3) omogucuje da se ne okida konstantno na svaku promjenu lokacije
  nego kad korisnik prede 20 metara ili vise nisam siguran*/
  useEffect(() => {
    if (dState.allPoliceman.length !== 0) {
      findThreeNearestPoliceman();
    }
  }, [dState.myPosition.latitude.toFixed(3), dState.myPosition.longitude.toFixed(3), dState.allPoliceman])


  const checkUserSettings = (): void => {
    /*Koristim on jer ce se to okinut svaki put kada se promjene postavke
    on radi na principu da stalno slusa promjene
    */
    database().ref(`Users/${auth().currentUser?.uid}`).on('value', (snap: any) => {
      const result = snap.val();
      if (result) {
        dDispatch({ type: "setSettings", payload: snap.val() })
      }
    })
  }
  //Okida se samo ako korisnik nema ukljucenu lokaciju.
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
  //indeksiro sam policajce jer ih je lakse brisat po id
  const countPoliceman = async(): Promise<void> => {
    let lastIndex: string | null = '';
    const result = await database().ref('Policeman').limitToLast(1).once('child_added')
    lastIndex = result.key;
    if (lastIndex) {
      dispatch({ type: "setPoliceCounter", payload: parseInt(lastIndex) + 1 });
    }
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
    
    database().ref(`Policeman/${state.policeCounter}`).set({
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


  const handleButtonPress = (): void => {
    let distance: number = policemanDistance();
    let position: IPosition = { latitude: dState.myPosition.latitude, longitude: dState.myPosition.longitude };
    if (distance !== 0) {
      position = { latitude: state.markerPosition.latitude, longitude: state.markerPosition.longitude }
    }
    //S ovim se sprijecava da korisnik moze dodati policajca van radijusa od 3km 
    if (distance <= 3000) {
      savePoliceman(position);
    }
    else {
      Alert.alert("Request refused", "You can only post a police officer within a 3-mile radius");
    }
  }


  /*Ovo se okida svaki puta kada se promjeni tablica policajci (brisanje ili dodavanje) */
  const getAllPoliceman = (): void => {
    let data: IFirebase[] = [];
    database().ref('Policeman').on('value', (snap: any) => {
      data = snap.val();
      if (data !== null && data !== undefined) {
        data = Object.values(data);
        //O(n) complexity
        //Filtrira se jer ako korisnik obrise npr 5 policajca, a ima ih 10 na 5 policajcu ce bit null
        data = data.filter((el: IFirebase) => el !== null);
        dDispatch({ type: "setAllPoliceman", payload: data });
      }
    })
  }

  /*Kako ovo radi ? 
  Prvo se prolazi kroz sve policajce (mpa metodom) i dodaje se novo svojstvo distance
  te se onda sortira prema distance
  i na kraju uzmu se prva tri pomocu slice metode
  */
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

  //Optimiziranje pomocu useMemo
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
