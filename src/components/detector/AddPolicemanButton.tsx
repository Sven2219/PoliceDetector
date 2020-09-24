import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
    onPress: () => void;
    showMarker: boolean;
    fullScreen: boolean;
    mode:string;
}

const AddPolicemanButton = ({ onPress, showMarker,mode,fullScreen }: IProps) => {
    const checkText=()=>{
        return(showMarker?"SAVE POLICEMAN":"ADD POLICEMAN");
    }
    const checkColor=(mode:string):string=>{
        return "#000"
    }
    return (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onPress()}>
            <View style={styles.positionCenter}>
                <Text style={{ fontFamily: 'Merriweather-Regular', fontSize: 23, color: checkColor(mode) }}>
                    {checkText()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    positionCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default AddPolicemanButton;