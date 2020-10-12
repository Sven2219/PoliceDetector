import React, { useEffect } from 'react';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import { width, ITEM_HEIGHT } from '../helpers/constants/SplashScreenConst';
import auth from '@react-native-firebase/auth';

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SplashScreen = ({ navigation }: IProps): JSX.Element => {
    
    useEffect(() => {
        //Cilj je prikazati sliku 3 sekunde
        setTimeout(() => {
            auth().onAuthStateChanged((user) => {
                if(user?.email){
                    navigation.navigate('TabBar')
                }
                else{
                    navigation.navigate('Identifcation')
                }
            })
        }, 3000)
    }, [])

    return (
        <View style={styles.containerStyle}>
            <StatusBar backgroundColor="#000" />
            <Image style={styles.imageStyle} source={require('../images/splashImage.jpg')} />
        </View>)
}

const styles = StyleSheet.create({
    imageStyle: {
        width: width,
        height: ITEM_HEIGHT,
        marginTop: 100
    },
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1
    }
})

export default SplashScreen;