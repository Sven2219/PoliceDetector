import React,{useReducer} from 'react';
import {View} from 'react-native';
import Map from '../components/detector/Map';
import { DetectorContext } from '../context/DetectorContext';
import { Actions, IState, reducer } from '../reducers/detectorReducer';
const Detector=()=>{
    const [state,dispatch] = useReducer<React.Reducer<IState,Actions>>(reducer,{fullScreenFlag:false,
        myPosition:{latitude:0,longitude:0,altitude:0,timestamp: 0,accuracy: 0,speed:0,heading: 0,isFromMockProvider: false}})
        //not sure for that.....
    return(
        <View>
            <DetectorContext.Provider value={{state,dispatch}}>
                <Map/>  
            </DetectorContext.Provider>

        </View>
    )
}


export default Detector;