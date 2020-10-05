import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ADD_POLICEMAN_BUTTON_HEIGHT, BUTTON_BOTTOM_FULL_SCREEN, BUTTON_BOTTOM_NOT_FULL_SCREEN, ICON_SIZE, UNDO_BUTTON_BOTTOM, width } from '../../../helpers/constants/MapScreenConst';
import { checkColor } from '../../../helpers/map/functions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
    onPress: () => void;
    showMarker: boolean;
    fullScreen: boolean;
    mode: string;
    undo: () => void;
}

const AddPolicemanButton = ({ onPress, showMarker, mode, fullScreen, undo }: IProps): JSX.Element => {
    
    const checkText = (): string => {
        return (showMarker ? "SAVE POLICEMAN" : "ADD POLICEMAN");
    }
    const undoActions = (): JSX.Element | null => {
        if (showMarker) {
            return (
                <View style={styles.undoButtonContainer}>
                    <MaterialCommunityIcons name="keyboard-backspace"
                        size={ICON_SIZE - 10}
                        color={checkColor(mode)}
                        onPress={() => undo()}
                    />
                </View>
            )
        }
        return null;
    }
    return (
        <View style={[styles.buttonContainer, { bottom: fullScreen ? BUTTON_BOTTOM_FULL_SCREEN : BUTTON_BOTTOM_NOT_FULL_SCREEN }]}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.positionCenter}>
                    <Text style={[styles.text, { color: checkColor(mode) }]}>
                        {checkText()}
                    </Text>
                </View>
            </TouchableOpacity>
            {undoActions()}
        </View>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
        height: ADD_POLICEMAN_BUTTON_HEIGHT,
        width,
        borderRadius: ADD_POLICEMAN_BUTTON_HEIGHT
    },
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Merriweather-Regular',
        fontSize: 23,
    },
    undoButtonContainer: {
        position: 'absolute',
        left: 10,
        bottom: UNDO_BUTTON_BOTTOM
    }
})

export default AddPolicemanButton;