import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { IFirebase } from '../../../helpers/interface/interfaces';
import { getDifferenceInMinutes, getDifferenceInHours, getDifferenceInDays } from '../../../helpers/map/functions';
import Policeman from './Policeman';
import database from '@react-native-firebase/database';
import { CALLOUT_HEIGHT, CALLOUT_WIDTH } from '../../../helpers/constants/MapScreenConst';
//Error => Solution :Function
//JSX element type 'Element[]' is not a constructor function for JSX elements.
//Type 'Element[]' is missing the following properties from type 'Element': type, props, key

const RenderPoliceman: Function = (): JSX.Element[] | null => {
    const { dState } = useContext(DetectorStateContext);

    const handleCalloutPress = (marker: IFirebase): void => {
        Alert.alert("Delete policeman", "The police are no longer there?", [
            {
                text: "Cancel",

                style: "cancel"
            }, {
                text: "Delete",
                onPress: () => database().ref('Policeman/' + marker.id).remove(),
            }
        ], { cancelable: false })
    }
    const formatDifferenceInMinutes = (marker: IFirebase) => {
        //I don't like to use moment.js because it is huge library
        //From their documentation
        //In most cases, you should not choose Moment for new projects.
        //However there are some possible reasons you might want to keep using it
        const date1 = new Date(marker.date.year, marker.date.month - 1, marker.date.day, marker.date.hours, marker.date.minutes);
        const date2 = new Date();
        const differenceInMinutes = Math.floor(getDifferenceInMinutes(date1, date2));
        let differenceInHours = 0;
        let differenceInDay = 0;
        if (differenceInMinutes >= 60) {
            differenceInHours = Math.floor(getDifferenceInHours(date1, date2));
            if (differenceInHours >= 24) {
                differenceInDay = Math.floor(getDifferenceInDays(date1, date2));
            }
        }
        return createMessage(differenceInMinutes, differenceInHours, differenceInDay)
    }
    const createMessage = (differenceInMinutes: number, differenceInHours: number, differenceInDay: number) => {
        if (differenceInDay !== 0) {
            return "before " + differenceInDay + " day";
        }
        else if (differenceInHours !== 0) {
            return "before " + differenceInHours + " hours";
        }
        return "before " + differenceInMinutes + " min";
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
                    <Callout onPress={() => handleCalloutPress(marker)} style={styles.calloutContainer}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutTextStyle}>{formatDifferenceInMinutes(marker)}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))
        )
    }
    return null;

}
const styles = StyleSheet.create({
    calloutContainer: {
        height: CALLOUT_HEIGHT,
        width: CALLOUT_WIDTH
    },
    calloutTextStyle: {
        fontSize: 16,
        fontFamily: "Merriweather-Regular"
    }
})

export default RenderPoliceman;