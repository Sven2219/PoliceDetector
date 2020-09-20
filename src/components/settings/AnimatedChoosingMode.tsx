import React, { useEffect, useRef, useState } from 'react';

import { View, Text, Animated, StyleSheet } from 'react-native';
import { IMapMode } from '../../helpers/interface/interfaces';
import {IMAGE_WIDTH,IMAGE_HEIGHT,width} from '../../helpers/constants/SettingsConst';
import Ticker from './Ticker';
interface IProps {
    mode:string;
    setMode:React.Dispatch<React.SetStateAction<string>>
}

const AnimatedChoosingMode = ({mode,setMode}:IProps) => {
    const [mapMode,setMapMode] = useState<IMapMode[]>([]);
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        setMapModes();
    },[])
    const setMapModes=async():Promise<void>=>{
        try {
            const data= await require('./mapModes/mapMode.json');
            setMapMode(data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
        <Ticker scrollX={scrollX} mapMode={mapMode}/>
        <Animated.FlatList
        data={mapMode}
        horizontal
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate={0}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{x:scrollX}}}],
            {useNativeDriver:true}
        )}
        keyExtractor={(_,index)=>index.toString()} 
        renderItem={({item,index}:{item:IMapMode,index:number})=>{
            const inputRange = [(index-1)*width,index*width,(index+1)*width]
            const scale = scrollX.interpolate({
                inputRange,
                outputRange:[0,1,0]
            })
            return(
                <View style={styles.imageContainer}>
                    <Animated.Image source={{uri:item.uri}} style={[styles.imageSize,{transform:[{scale}]}]}/>
                </View>
            )
        }}
        />
        </View>
    )
}
const styles = StyleSheet.create({
    imageSize:{
        width:IMAGE_WIDTH,
        height:IMAGE_HEIGHT,
    },
    imageContainer:{
        width:IMAGE_WIDTH,
        height:IMAGE_HEIGHT,
    }
})
export default AnimatedChoosingMode;