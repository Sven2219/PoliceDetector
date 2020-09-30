import React, { useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import { width, ITEM_HEIGHT } from '../helpers/constants/SplashScreenConst';
import auth from '@react-native-firebase/auth';

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SplashScreen = ({ navigation }: IProps): JSX.Element => {
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyBRyCWYq5ZavEbTl83Hs_95ST2Wn07fPU0",
            authDomain: "policedetector-fdd85.firebaseapp.com",
            databaseURL: "https://policedetector-fdd85.firebaseio.com",
            projectId: "policedetector-fdd85",
            storageBucket: "policedetector-fdd85.appspot.com",
            messagingSenderId: "52607038372",
            appId: "1:52607038372:web:7082e554e4ce23e21b4731",
            measurementId: "G-K0HX4FJ65T"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        //The goal is to show image for 3 sec
        setTimeout(() => {
            auth().onAuthStateChanged((user) => {
                user?.email ? navigation.navigate('TabBar') : navigation.navigate('Identifcation')
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