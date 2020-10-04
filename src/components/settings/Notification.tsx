import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

interface IProps {
    notificationFlag: boolean;
    onPress: () => void;
}

const Notification = ({ notificationFlag, onPress }: IProps): JSX.Element => {
    const isActive = (): string => {
        return notificationFlag ? "#006400" : "#000";
    }
    return (<View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => onPress()}>
            <Feather name="bell" size={50} color={isActive()} />
        </TouchableWithoutFeedback>
        <Text style={styles.textStyle}>If you want to receive alerts {'\n'}1.5km before the map detects{'\n'}a police officer, press the icon.</Text>
    </View>)
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        padding: 20
    },
    textStyle: {
        left: 5,
        bottom: 5,
        fontSize: 17,
        fontFamily: 'Merriweather-Regular'
    }
})

export default Notification;