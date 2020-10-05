import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IProps {
    loginFlag: boolean;
    onPress: () => void;
}

const SubmitButtonText = ({ loginFlag, onPress }: IProps): JSX.Element => {
    const submitButtonText = (): string => {
        return loginFlag ? "Sign in" : "Register";
    }
    return (
        <View style={styles.positionCenter}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.submitText}>
                    {submitButtonText()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20
    },
    submitText: {
        fontSize: 22,
        fontFamily: 'Merriweather-Regular'
    },
})

export default SubmitButtonText;