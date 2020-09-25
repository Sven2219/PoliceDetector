import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { View, Text, Alert } from 'react-native';
import { IFirebase } from '../../../helpers/interface/interfaces';
import Policeman from './Policeman';
import database from '@react-native-firebase/database';
//Error => Solution :Function
//JSX element type 'Element[]' is not a constructor function for JSX elements.
//Type 'Element[]' is missing the following properties from type 'Element': type, props, key
const RenderPoliceman: Function = (): JSX.Element[] | null => {
    const { dState } = useContext(DetectorStateContext);
    const handleCalloutPress=(marker:IFirebase):void=>{
        Alert.alert("Delete policeman","The police are no longer there?",[
          {
            text:"Cancel",
      
            style:"cancel"
          },{
            text:"Delete",
            onPress:()=>console.log("database",database().ref('Policeman')),
          }
        ],{cancelable:false})
      }
    if (dState.onlyThreeToShow !== null && dState.onlyThreeToShow !== undefined) {
        return (
            dState.onlyThreeToShow.map((marker: IFirebase, index: number) => (
                <Marker
                    key={index}
                    tracksViewChanges={true}
                    tracksInfoWindowChanges={false}
                    coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
                >
                    <Policeman />
                    <Callout onPress={() => handleCalloutPress(marker)}>
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: "Merriweather-Regular" }}>Before 10min</Text>
                        </View>
                    </Callout>
                </Marker>
            ))
        )
    }
    return null;

}
export default RenderPoliceman;