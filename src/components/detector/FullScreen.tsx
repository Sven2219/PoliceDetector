import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ICON_SIZE } from '../../helpers/constants/MapScreenConst';

interface IProps {
    onPress: () => void;
}

const FullScreen = ({ onPress }: IProps) => {
    return (
        <View style={styles.iconPosition}>
            <MaterialCommunityIcons name="fullscreen" size={ICON_SIZE} onPress={() => onPress()} color={"#fff"}/>
        </View>
    )
}
const styles = StyleSheet.create({
    iconPosition:{
        position:'absolute',
        right:10,
        top:10,
        zIndex:1
    }
})

export default FullScreen;