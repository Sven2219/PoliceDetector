import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { IMapMode } from '../../helpers/interface/interfaces';
import { DOT_SIZE, IMAGE_WIDTH } from '../../helpers/constants/SettingsConst';

interface IProps {
    scrollX: Animated.Value;
    mapMode: IMapMode[];
}

const Dots = ({ scrollX, mapMode }: IProps): JSX.Element => {
    const translateX = scrollX.interpolate({
        inputRange: [-IMAGE_WIDTH, 0, IMAGE_WIDTH],
        outputRange: [-DOT_SIZE, 0, DOT_SIZE]
    })

    return (
        <View style={{ flexDirection: 'row' }}>
            <Animated.View style={[styles.paginationIndicator, { transform: [{ translateX }] }]} />
            {mapMode.map(({ id }) => {
                return (<View style={styles.dotContainer} key={id}>
                    <View style={[styles.dotStyle]} />
                </View>)
            })}
        </View>)
}
const styles = StyleSheet.create({
    dotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotStyle: {
        borderRadius: DOT_SIZE / 2,
        width: DOT_SIZE * 0.4,
        height: DOT_SIZE * 0.4,
        borderWidth: 1,
        marginLeft: 5
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#a52a2a',
        left: DOT_SIZE + 3
    }
})

export default Dots;