import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
    autofocusFlag: boolean;
    onPress: () => void;
}

const Autofocus = ({ autofocusFlag, onPress }: IProps): JSX.Element => {
    const isActive = (): string => {
        return autofocusFlag ? "#006400" : "#000";
    }
    return (<View style={styles.mainContainer}>
        <MaterialCommunityIcons name="crosshairs-gps" size={50} color={isActive()} onPress={() => onPress()} />
        <Text style={styles.textStyle}>If you want to autofocus your{'\n'}car while driving, press icon.</Text>
    </View>)
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        padding: 20,
        top: 20
    },
    textStyle: {
        fontSize: 17,
        fontFamily: 'Merriweather-Regular',
        top: 5,
        left: 10
    }
})

export default Autofocus;