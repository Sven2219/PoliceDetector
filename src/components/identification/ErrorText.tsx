import React from 'react';
import Animated from 'react-native-reanimated';
import { Text, StyleSheet } from 'react-native';

interface IProps {
    translateY: Animated.Node<number>;
    validationError: string;
}

const ErrorText = ({ translateY, validationError }: IProps): JSX.Element => {
    const isValidColor = (valid: string): string => {
        return valid.match(/(?=valid$)/g) ? "green" : "#b22222";
    }
    return (
        <Animated.View style={[styles.errorPosition, styles.positionCenter, { transform: [{ translateY }] }]}>
            <Text style={[styles.errorText, { color: isValidColor(validationError) }]}>{validationError}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    errorPosition: {
        bottom: 15
    },
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16
    }
})

export default ErrorText;