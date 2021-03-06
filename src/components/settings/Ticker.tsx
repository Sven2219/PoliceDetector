import React from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { IMapMode } from '../../helpers/interface/interfaces';
import { TICKER_HEIGHT, IMAGE_WIDTH } from '../../helpers/constants/SettingsConst';

interface IProps {
    scrollX: Animated.Value;
    mapMode: IMapMode[];
    mode: string;
}

const Ticker = ({ scrollX, mapMode, mode }: IProps): JSX.Element => {

    const inputRange = [-IMAGE_WIDTH, 0, IMAGE_WIDTH];
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT]
    })
    return (<View style={styles.tickerContainer}>
        <Animated.View style={{ transform: [{ translateY }] }}>
            {mapMode.map(({ name }, index) => {
                return (
                    <Text key={index} style={[styles.tickerText, { color: name === mode ? "#228b22" : "#000" }]}>
                        {name}
                    </Text>
                )
            })}
        </Animated.View>
    </View>)
}
const styles = StyleSheet.create({
    tickerText: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: "bold"
    },
    tickerContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT
    }
})

export default Ticker;