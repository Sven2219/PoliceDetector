import React, { useContext } from 'react';
import {View,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { ICON_SIZE } from '../../../helpers/constants/MapScreenConst';
import { animateToRegion, checkColor } from '../../../helpers/map/functions';
interface IProps{
    mapRef:any;
}
const AnimateToRegionButton=({mapRef}:IProps)=>{
    const {dState} = useContext(DetectorStateContext);
    return(
        <View style={{position:'absolute',top:5,right:5,zIndex:1}}>
        <TouchableOpacity onPress={()=>animateToRegion(2000,dState.myPosition,mapRef)}>
            <MaterialCommunityIcons name="crosshairs-gps" size={ICON_SIZE} color={checkColor(dState.settings.mode)}/>
        </TouchableOpacity>
      </View>
    )
}
export default AnimateToRegionButton;