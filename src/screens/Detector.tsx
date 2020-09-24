import React, { useEffect, useReducer } from 'react';
import { View } from 'react-native';
import FullScreen from '../components/detector/directInDetector/FullScreen';
import Map from '../components/detector/directInDetector/Map';
import { DetectorDispatchContext } from '../context/detector/DispatchContext';
import { DetectorStateContext } from '../context/detector/StateContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';
interface IProps {
    navigation: any;
}
const Detector = ({ navigation }: IProps) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        myPosition: { latitude: 0, longitude: 0 },fullScreenFlag:false,settings:{notificationFlag:false,autofocusFlag:false,mode:"classic"}
    })
    useEffect(() => {
        navigation.setOptions({ tabBarVisible: !state.fullScreenFlag })
    }, [state.fullScreenFlag])
    return (
        <View style={{flex:1}}>
            <DetectorDispatchContext.Provider value={{ dDispatch: dispatch }}>
                <DetectorStateContext.Provider value={{ dState: state }}>
                    <FullScreen />
                    <Map />
                </DetectorStateContext.Provider>
            </DetectorDispatchContext.Provider>
        </View>
    )
}

export default Detector;