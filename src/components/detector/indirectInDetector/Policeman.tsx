import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Image } from 'react-native-svg';
const { width, height } = Dimensions.get("screen");
const Policeman = (): JSX.Element => {
    return (
        <Svg width={width / 15.6} height={height / 15}>
            <Image href={require('../../../images/policeman.png')} width={width / 13} height={height / 14.9} />
        </Svg>
    )
}
export default Policeman;