import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ICON_SIZE, LEFT, TEXTINPUT_WIDTH } from '../../helpers/constants/LoginConst';

interface IProps {
    value: string;
    secureTextEntry?: boolean;
    onFocus: () => void;
    onChangeText: (text: string) => void;
    onPress?: () => void;
    placeholder: string;
    translateY: Animated.Node<number>;
    iconName: string;
}

const AnimatedTextInput = ({ value, secureTextEntry, onFocus, onChangeText, onPress, placeholder, translateY, iconName }: IProps) => {

    const secureTextEntryIcon = (flag: boolean): JSX.Element => {
        return flag ? <MaterialCommunityIcons name="eye-outline" size={ICON_SIZE} /> : <MaterialCommunityIcons name="eye-off-outline" size={ICON_SIZE} />
    }
    const optionalIcon = () => {
        if (secureTextEntry !== undefined && onPress) {
            return (
                <TouchableOpacity onPress={() => onPress()}>{secureTextEntryIcon(secureTextEntry)}</TouchableOpacity>
            )
        }
        return null;
    }
    return (
        <Animated.View style={[styles.reinputContainer, { transform: [{ translateY }] }]}>
            <MaterialCommunityIcons name={iconName} size={ICON_SIZE} />
            <TextInput onFocus={() => onFocus()} secureTextEntry={!secureTextEntry} value={value} onChangeText={(text: string) => onChangeText(text)} placeholder={placeholder} style={styles.textInputSize} />
            {optionalIcon()}
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    reinputContainer: {
        width: TEXTINPUT_WIDTH,
        flexDirection: 'row',
        borderWidth: 0.5,
        paddingLeft: LEFT / 2,
        alignItems: 'center',
        left: LEFT,
        borderRadius: LEFT / 2,
        marginBottom: 25
    },
    textInputSize: {
        width: TEXTINPUT_WIDTH - ICON_SIZE * 2 - LEFT
    },
})

export default AnimatedTextInput