import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DetectorDispatchContext } from '../../../context/detector/DispatchContext';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { ICON_SIZE } from '../../../helpers/constants/MapScreenConst';
import { checkColor } from '../../../helpers/map/functions';

const FullScreen = (): JSX.Element => {
    const { dDispatch } = useContext(DetectorDispatchContext);
    const { dState } = useContext(DetectorStateContext);

    return (
        <View style={styles.iconPosition}>
            <MaterialCommunityIcons name="fullscreen" size={ICON_SIZE}
                onPress={() => dDispatch({ type: "setFullScreenFlag", payload: !dState.fullScreenFlag })}
                color={checkColor(dState.settings.mode)} />
        </View>
    )
}
const styles = StyleSheet.create({
    iconPosition: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    }
})

export default FullScreen;