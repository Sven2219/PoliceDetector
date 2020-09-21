import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedChoosingMode from '../components/settings/AnimatedChoosingMode';
import Autofocus from '../components/settings/Autofocus';
import Notification from '../components/settings/Notification';
import { SettingsContext } from '../context/SettingsContext';
import { IState, Actions, reducer } from '../reducers/settingsReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Settings = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { autofocusFlag: false, notificationFlag: false, mode: "" })
    return (<View>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>SETTINGS</Text>
            <MaterialCommunityIcons name="update" size={40} onPress={()=>console.log("Update user options")}/>
        </View>
        <SettingsContext.Provider value={{ state, dispatch }}>
            <Notification />
            <AnimatedChoosingMode />
            <Autofocus />
        </SettingsContext.Provider>


    </View>)
}
const styles = StyleSheet.create({
    titleContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    titleStyle: {
        fontFamily: 'Merriweather-Regular',
        fontSize: 27,

    }
})
export default Settings;