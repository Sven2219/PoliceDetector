import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("window");

interface IProps {
    firstPart: string;
    secondPart: string;
    onPress: () => void;
    marginTop: number;
}

const BottomText = ({ firstPart, secondPart, onPress, marginTop }: IProps): JSX.Element => {
    return (
        <View style={[styles.positionCenter, { width, marginTop }]}>
            <Text style={styles.bottomTextStyle}>{firstPart}</Text>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={[styles.bottomTextStyle, { color: 'blue' }]}>{secondPart}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    bottomTextStyle: {
        fontSize: 17,
        fontFamily: 'Merriweather-Regular'
    },
})

export default BottomText;