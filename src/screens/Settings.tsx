import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedChoosingMode from '../components/settings/AnimatedChoosingMode';
import Autofocus from '../components/settings/Autofocus';
import Notification from '../components/settings/Notification';
import { SettingsContext } from '../context/SettingsContext';
import { IState, Actions, reducer } from '../reducers/settingsReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { ICON_SIZE } from '../helpers/constants/SettingsConst';
interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Settings = ({ navigation }: IProps): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { autofocusFlag: false, notificationFlag: false, mode: "classic" })
    const updateUserOptions = (): void => {
        database().ref('Users/' + auth().currentUser?.uid).update({
            autofocusFlag: state.autofocusFlag,
            notificationFlag: state.notificationFlag,
            mode: state.mode
        })
    }
    const logOut = async (): Promise<void> => {
        try {
            await auth().signOut()
            navigation.navigate('Identifcation')
        } catch (error) {
            console.log(error)
        }
    }
    return (<ScrollView>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>SETTINGS</Text>
            <MaterialCommunityIcons name="logout" size={ICON_SIZE} onPress={() => logOut()} />
        </View>
        <SettingsContext.Provider value={{ state, dispatch }}>
            <Notification />
            <AnimatedChoosingMode />
            <Autofocus />
        </SettingsContext.Provider>
        <View style={[styles.positionCenter, styles.updateButtonPosition]}>
            <TouchableWithoutFeedback onPress={() => updateUserOptions()}>
                <Text style={styles.updateText}>UPDATE</Text>
            </TouchableWithoutFeedback>
        </View>
    </ScrollView>)
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
    },
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 22,
        fontFamily: 'Merriweather-Regular'
    },
    updateButtonPosition: {
        marginBottom: 30,
        top: 20
    }
})
export default Settings;