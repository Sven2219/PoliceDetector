import React, { useEffect, useMemo, useReducer } from 'react';
import { View } from 'react-native';
import FullScreen from '../components/detector/directInDetector/FullScreen';
import Map from '../components/detector/directInDetector/Map';
import Notification from '../components/detector/directInDetector/Notificaiton';
import { DetectorDispatchContext } from '../context/detector/DispatchContext';
import { DetectorStateContext } from '../context/detector/StateContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';

interface IProps {
    navigation: any;
}

const Detector = ({ navigation }: IProps) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        myPosition: { latitude: 0, longitude: 0 }, fullScreenFlag: false, settings: { notificationFlag: false, autofocusFlag: false, mode: "classic" },
        allPoliceman: [], onlyThreeToShow: [], notificationModalFlag: false
    })

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
        } catch (error) { }
    }
    //Optimize

    const FullScreenMemo = useMemo(() =>
        <FullScreen onPress={() =>
            dispatch({ type: "setFullScreenFlag", payload: !state.fullScreenFlag })}
            mode={state.settings.mode} />
        , [state.fullScreenFlag, state.settings])
    return (
        <View style={{ flex: 1 }}>
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

export default Detector;