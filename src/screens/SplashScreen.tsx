import React,{useEffect} from 'react';
import firebase from 'firebase';

import {View,StatusBar,Image} from 'react-native';
import {styles} from '../helpers/style/SplashScreenStyle';

interface IProps{
    navigation:any;
}

const SplashScreen=({navigation}:IProps)=>{
    useEffect(()=>{
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
        setTimeout(()=>{
           navigation.navigate('TabBar')
        },3000)
      },[])
    return(
        <View style={styles.containerStyle}>
            <StatusBar backgroundColor="#000"/>
            <Image style={ styles.imageStyle} source={require('../images/splashImage.jpg')}/>
        </View>)
}
export default SplashScreen;