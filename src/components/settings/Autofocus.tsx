import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SettingsContext } from '../../context/SettingsContext';

const Autofocus = () => {
    const { settingsState, settingsDispatch } = useContext(SettingsContext);
    const isActive = (): string => {
        return settingsState.autofocusFlag ? "#006400" : "#000";
    }
    return (<View style={styles.mainContainer}>
        <MaterialCommunityIcons name="crosshairs-gps" size={50} color={isActive()} onPress={() => settingsDispatch({ type: "setAutofocusFlag", payload: !settingsState.autofocusFlag })} />
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