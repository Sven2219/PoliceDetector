import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedChoosingMode from '../components/settings/AnimatedChoosingMode';
import { width } from '../helpers/constants/SplashScreenConst';
import { IMapMode } from '../helpers/interface/interfaces';



const Settings = (): JSX.Element => {
    const [mode,setMode] = useState<string>("");
    const [autofocusFlag,setAutofocusFlag] = useState<boolean>(false);
    const [notificationFlag,setNotificationFlag] = useState<boolean>(false);

    return (<View>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>SETTINGS</Text>
        </View>
        <View style={{height:100,width}}>

        </View>
        
        <AnimatedChoosingMode mode={mode} setMode={setMode}/>
    </View>)
}
const styles = StyleSheet.create({
    titleContainer:{
        padding:20,
    },
    titleStyle:{
        fontFamily:'Merriweather-Regular',
        fontSize:27,

    }
})
export default Settings;