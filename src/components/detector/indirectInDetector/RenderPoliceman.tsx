import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { IFirebase } from '../../../helpers/interface/interfaces';
import Policeman from './Policeman';
//Error => Solution :Function
//JSX element type 'Element[]' is not a constructor function for JSX elements.
//Type 'Element[]' is missing the following properties from type 'Element': type, props, key
const RenderPoliceman:Function = ():JSX.Element[] => {
    const { dState } = useContext(DetectorStateContext);
        return (
        dState.policeman.map((marker: IFirebase, index: number) => (
            <Marker
                key={index}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
            >
                <Policeman />
            </Marker>
        ))
    )
}
export default RenderPoliceman;