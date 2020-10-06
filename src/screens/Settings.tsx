import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AnimatedChoosingMode from '../components/settings/AnimatedChoosingMode';
import Autofocus from '../components/settings/Autofocus';
import Notification from '../components/settings/Notification';
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
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, { autofocusFlag: false, 
        notificationFlag: false, mode: "classic" })

    useEffect(() => {
        setUserOptions()
    }, [])
    //I used once because I don't need to listen for changes
    //The data is needed only once
    const setUserOptions = async (): Promise<void> => {
        try {
            const result = (await database().ref('Users/' + auth().currentUser?.uid).once('value')).val();
            if (result) {
                dispatch({
                    type: "setAllSettings", notificationFlag: result.notificationFlag, autofocusFlag: result.autofocusFlag,
                    mode: result.mode
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateUserOptions = (): void => {
        database().ref('Users/' + auth().currentUser?.uid).update({
            autofocusFlag: state.autofocusFlag,
            notificationFlag: state.notificationFlag,
            mode: state.mode
        }).then(() => Alert.alert('You have successfully updated settings'))
    }
    const logOut = async (): Promise<void> => {
        try {
            await auth().signOut()
            navigation.navigate('Identifcation')
        } catch (error) {
            console.log(error)
        }
    }

    //In this screen, useMemo might do more harm than good because It will take up memory but there are no performance issues

    return (<ScrollView>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>SETTINGS</Text>
            <MaterialCommunityIcons name="logout" size={ICON_SIZE} onPress={logOut} />
        </View>

        <Notification notificationFlag={state.notificationFlag}
            onPress={() => dispatch({ type: "setNotificationFlag", payload: !state.notificationFlag })} />

        <AnimatedChoosingMode mode={state.mode} setMode={(name) => dispatch({ type: "setMode", payload: name })} />

        <Autofocus autofocusFlag={state.autofocusFlag}
            onPress={() => dispatch({ type: "setAutofocusFlag", payload: !state.autofocusFlag })} />

        <View style={[styles.positionCenter, styles.updateButtonPosition]}>
            <TouchableWithoutFeedback onPress={updateUserOptions}>
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