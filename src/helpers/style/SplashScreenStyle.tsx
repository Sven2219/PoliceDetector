import {StyleSheet} from 'react-native';
import {width,ITEM_HEIGHT} from '../constants/SplashScreenConst';
export const styles=StyleSheet.create({
    imageStyle:{
      width:width,
      height:ITEM_HEIGHT,
      marginTop:100
    },
    containerStyle:{
      backgroundColor:'#ffffff',
      flex:1
    }
  })