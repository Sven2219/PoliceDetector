import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ADD_POLICEMAN_BUTTON_HEIGHT, BUTTON_BOTTOM_FULL_SCREEN, BUTTON_BOTTOM_NOT_FULL_SCREEN, width } from '../../../helpers/constants/MapScreenConst';
import { checkColor } from '../../../helpers/map/functions';

interface IProps {
    onPress: () => void;
    showMarker: boolean;
    fullScreen: boolean;
    mode: string;
}

const AddPolicemanButton = ({ onPress, showMarker, mode, fullScreen }: IProps) => {
    const checkText = () => {
        return (showMarker ? "SAVE POLICEMAN" : "ADD POLICEMAN");
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
    }
})

export default AddPolicemanButton;