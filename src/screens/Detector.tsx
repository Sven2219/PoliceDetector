import React, { useEffect, useMemo, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import FullScreen from '../components/detector/directInDetector/FullScreen';
import Map from '../components/detector/directInDetector/Map';
import Notification from '../components/detector/directInDetector/Notificaiton';
import { DetectorDispatchContext } from '../context/detector/DispatchContext';
import { DetectorStateContext } from '../context/detector/StateContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';

interface IProps {
    //I don't know what is the type for navigation in this case..
    navigation: any;
}

const Detector = ({ navigation }: IProps) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        myPosition: { latitude: 0, longitude: 0 }, fullScreenFlag: false, settings: { notificationFlag: false, autofocusFlag: false, mode: "classic" },
        allPoliceman: [], onlyThreeToShow: [], notificationModalFlag: false
    })

    //this is responsible for removing the tabBar
    useEffect(() => {
        navigation.setOptions({ tabBarVisible: !state.fullScreenFlag })
    }, [state.fullScreenFlag])

    useEffect(() => {
        if (state.settings.notificationFlag && state.onlyThreeToShow) {
            startCountdown();
        }
    }, [state.myPosition.longitude.toFixed(3) || state.myPosition.latitude.toFixed(3)])

    const startCountdown = (): void => {
        try {
            const dis: number | undefined = state.onlyThreeToShow[0].distance;
            if (dis !== undefined && dis <= 1500) {
                dispatch({ type: "setNotificationModalFlag", payload: true });
            }
        } catch (error) {
            console.log(error)
         }
    }
    //Optimize
    //[state.settings] because I need to update color of icon depend on settings(in useMemo second arg)
    const FullScreenMemo = useMemo(() =>
        <FullScreen onPress={() =>
            dispatch({ type: "setFullScreenFlag", payload: !state.fullScreenFlag })}
            mode={state.settings.mode} />
        , [state.fullScreenFlag, state.settings])
    return (
        <View style={styles.mainContainer}>
            {FullScreenMemo}
            <DetectorDispatchContext.Provider value={{ dDispatch: dispatch }}>
                <DetectorStateContext.Provider value={{ dState: state }}>
                    <Map />
                    <Notification />
                </DetectorStateContext.Provider>
            </DetectorDispatchContext.Provider>

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})
export default Detector;