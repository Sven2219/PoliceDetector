import React, {  useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedChoosingMode from '../components/settings/AnimatedChoosingMode';
import Autofocus from '../components/settings/Autofocus';
import Notification from '../components/settings/Notification';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SettingsContext } from '../context/SettingsContext';

const Settings = (): JSX.Element => {
    const {settingsState,settingsDispatch} = useContext(SettingsContext);
    return (<View>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>SETTINGS</Text>
            <MaterialCommunityIcons name="update" size={40} onPress={()=>console.log("save")}/>
        </View>
        <Notification/>
        <AnimatedChoosingMode/>
        <Autofocus/>
    </View>)
}
const styles = StyleSheet.create({
    titleContainer:{
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between',

    },
    titleStyle:{
        fontFamily:'Merriweather-Regular',
        fontSize:27,

    }
})
export default Settings;