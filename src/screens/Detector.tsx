import React, { useReducer } from 'react';
import { View } from 'react-native';
import Map from '../components/detector/Map';
import { DetectorContext } from '../context/DetectorContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';
import Feather from 'react-native-vector-icons/Feather';
import Settings from './Settings';
import { SettingsContext } from '../context/SettingsContext';
import * as settingsReducer from '../reducers/settingsReducer';
const Detector = () => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        fullScreenFlag: false, settingsModal: false,
        myPosition: { latitude: 0, longitude: 0, altitude: 0, timestamp: 0, accuracy: 0, speed: 0, heading: 0, isFromMockProvider: false }
    })


    const [settingsState, settingsDispatch] = useReducer<React.Reducer<settingsReducer.ISettingsState, settingsReducer.Actions>>(settingsReducer.reducer, { autofocusFlag: false, notificationFlag: false, mode: "" });


    const showModal = () => {
        if (state.settingsModal) {
            return (<SettingsContext.Provider value={{ settingsState, settingsDispatch }}>
                <Settings />
            </SettingsContext.Provider>)
        }
        else {
            return (<DetectorContext.Provider value={{ state, dispatch, settingsState }}>
                <Map />
            </DetectorContext.Provider>)
        }
    }
    return (
        <View>
            <View style={{position:'absolute',left:50,top:50,zIndex:1}}>
                <Feather name="settings" size={40} onPress={() => dispatch({ type: "setSettingsModal", payload: true })} />
            </View>
            {showModal()}
        </View>
    )
}


export default Detector;