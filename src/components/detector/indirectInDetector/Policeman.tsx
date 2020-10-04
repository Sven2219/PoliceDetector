import React from 'react';
import Svg, { Image } from 'react-native-svg';
import { POLICEMAN_IMAGE_HEIGHT, POLICEMAN_IMAGE_WIDTH, POLICEMAN_SVG_HEIGHT, POLICEMAN_SVG_WIDTH } from '../../../helpers/constants/MapScreenConst';

const Policeman = (): JSX.Element => {
    return (
        <Svg width={POLICEMAN_SVG_WIDTH} height={POLICEMAN_SVG_HEIGHT}>
            <Image href={require('../../../images/policeman.png')}
                width={POLICEMAN_IMAGE_WIDTH}
                height={POLICEMAN_IMAGE_HEIGHT} />
        </Svg>
    )
}

export default Policeman;