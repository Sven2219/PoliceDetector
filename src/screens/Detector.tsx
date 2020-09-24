import React, { useReducer } from 'react';
import { View } from 'react-native';
import Map from '../components/detector/Map';
import { DetectorDispatchContext } from '../context/detector/DispatchContext';
import { DetectorStateContext } from '../context/detector/StateContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';
const Detector = () => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        myPosition: { latitude: 0, longitude: 0 }
    })
    return (
        <View>
            <DetectorDispatchContext.Provider value={{dDispatch:dispatch}}>
                <DetectorStateContext.Provider value={{dState:state}}>
                    <Map />
                </DetectorStateContext.Provider>
            </DetectorDispatchContext.Provider>
        </View>
    )
}

export default Detector;