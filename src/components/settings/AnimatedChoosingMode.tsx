import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { IMapMode } from '../../helpers/interface/interfaces';
import { IMAGE_WIDTH, IMAGE_HEIGHT, width, RIGHT_PADDING, TICKER_HEIGHT, DOT_SIZE } from '../../helpers/constants/SettingsConst';
import Ticker from './Ticker';
import Dots from './Dots';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface IProps {
    mode: string;
    setMode: (name: string) => void;
}

const AnimatedChoosingMode = ({ mode, setMode }: IProps): JSX.Element => {
    const [mapMode, setMapMode] = useState<IMapMode[]>([]);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setMapModes();
    }, [])
    
    const setMapModes = async (): Promise<void> => {
        try {
            const data = await require('./mapModes/mapMode.json');
            setMapMode(data);
        } catch (error) {
            console.log(error)
        }
    }
    const handleRequest = (name: string): void => {
        if (name !== mode) {
            setMode(name)
        }
    }
    return (
        <View>
            <View style={styles.tickerContainer}>
                <Ticker scrollX={scrollX} mapMode={mapMode} mode={mode} />
            </View>
            <View style={{ padding: RIGHT_PADDING / 2 }}>
                <Animated.FlatList
                    data={mapMode}
                    horizontal
                    scrollEventThrottle={16}
                    bounces={false}
                    decelerationRate={0}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }: { item: IMapMode, index: number }) => {
                        const inputRange = [(index - 1) * IMAGE_WIDTH, index * IMAGE_WIDTH, (index + 1) * IMAGE_WIDTH]
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        })
                        return (
                            <View style={styles.imageContainer}>
                                <TouchableWithoutFeedback onPress={() => handleRequest(item.name)}>
                                    <Animated.Image source={{ uri: item.uri }} style={[styles.imageSize, { transform: [{ scale }] }]} />
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={styles.dotsContainer}>
                <Dots scrollX={scrollX} mapMode={mapMode} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    tickerContainer: {
        bottom: TICKER_HEIGHT * 2,
        left: 2
    },
    imageSize: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },
    imageContainer: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: -DOT_SIZE,
        left: width / 5
    }
})

export default AnimatedChoosingMode;