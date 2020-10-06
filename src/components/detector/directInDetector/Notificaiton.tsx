import React, { useContext } from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DetectorDispatchContext } from '../../../context/detector/DispatchContext';
import { checkTextColorForModal, modalColor } from '../../../helpers/map/functions';
import { height } from '../../../helpers/constants/MapScreenConst';

const Notification = (): JSX.Element | null => {
    const { dState } = useContext(DetectorStateContext);
    const { dDispatch } = useContext(DetectorDispatchContext);

    const policeDistance = (): number | null => {
        try {
            const dis: number | undefined = dState.onlyThreeToShow[0].distance;
            if (dis !== undefined) {
                return dis;
            }
        } catch (error) { }
        return null;
    }
    return (
        <Modal transparent={true} visible={dState.notificationModalFlag}>
            <View style={{ backgroundColor: modalColor(dState.settings.mode), flex: 1 }}>
                <View style={styles.positionCenter}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={60}
                        color={checkTextColorForModal(dState.settings.mode)}
                        onPress={() => dDispatch({ type: "setNotificationModalFlag", payload: false })} />
                </View>
                <View style={[styles.distanceTextContainer,styles.positionCenter]}>
                    <Text style={styles.distanceTextStyle}>COUNTING DOWN{'\n'}METERS TO THE{'\n'}POLICE = {policeDistance()}m</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    distanceTextContainer: {
        height: height / 2,
    },
    distanceTextStyle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Notification;