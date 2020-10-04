import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ICON_SIZE } from '../../../helpers/constants/MapScreenConst';
import { checkColor } from '../../../helpers/map/functions';
interface IProps{
    onPress:()=>void;
    mode:string;
}
const FullScreen = ({onPress,mode}:IProps): JSX.Element => {
    return (
        <View style={styles.iconPosition}>
            <MaterialCommunityIcons name="fullscreen" size={ICON_SIZE}
                onPress={() => onPress()}
                color={checkColor(mode)} />
        </View>
    )
}
const styles = StyleSheet.create({
    iconPosition: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    }
})

export default FullScreen;