import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
    globalError: string;
}

const GlobalError = ({ globalError }: IProps): JSX.Element | null => {
    if (globalError !== "") {
        return (
            <Text style={styles.globalError}>{globalError}</Text>
        )
    }
    return null;
}

const styles = StyleSheet.create({
    globalError: {
        fontSize: 17,
        fontFamily: 'Merriweather-Regular',
        color: '#b22222'
    }
})

export default GlobalError