import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Image, Keyboard } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
//@ts-ignore
import { useTransition } from 'react-native-redash/lib/module/v1';
import firebase from '@react-native-firebase/app';
import { reducer, Actions, IState } from '../reducers/loginReducer';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../helpers/constants/LoginConst';
import BottomText from '../components/identification/BottomText';
import AnimatedTextInput from '../components/identification/AnimatedTextInput';
import ErrorText from '../components/identification/ErrorText'
import SubmitButtonText from '../components/identification/SubmitBottomText';

//The goal is to create validation with regular expression not with yup/formik or something like that

const Login = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        email: "", password: "", confirmPassword: "",
        emailValidationError: "", passwordValidationError: "",
        loginFlag: false, toggled: false, showPassword: false,
        showConfirmPassword: false
    });
    const transition = useTransition(state.toggled, { duration: 1000 });
    const translateY = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, -100]
    })
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);
    //togle animation depend on keyboard visibility
    const _keyboardDidShow = (): void => {
        dispatch({ type: "setToggled", payload: true })
    }
    const _keyboardDidHide = (): void => {
        dispatch({ type: "setToggled", payload: false })
    };
    //simple transition depend on toggle state
    //if toggle is true it will go to -100 else => 0

    //function that validate user input
    const validateEmail = (email: string): void => {
        const validateEmail = email.match(/^\w+(.\w+)@gmail.com?/g);
        validateEmail ? dispatch({ type: "setValidateEmail", email: email, emailValidationError: "Email is valid" }) :
            dispatch({ type: "setValidateEmail", email: email, emailValidationError: "Invalid email" })
    }
    const validatePassword = (password: string): void => {
        const validateNumbers = password.match(/(?=(?:\D*\d){2,})/g);
        const validateWords = password.match(/(?=(?:[^A-Z]*[A-Z]){2,})/g);
        const validateLength = password.match(/^(?=\w{6,}$)/gi);
        if (!validateNumbers) {
            dispatch({ type: "setValidatePassword", password: password, passwordValidationError: "Password require at least 2 number" })
        }
        else if (!validateWords) {
            dispatch({ type: "setValidatePassword", password: password, passwordValidationError: "Password require at least 2 upper case letter" });
        }
        else if (!validateLength) {
            dispatch({ type: "setValidatePassword", password: password, passwordValidationError: "Password require at least 6 words" });
        }
        else {
            dispatch({ type: "setValidatePassword", password: password, passwordValidationError: "Password is valid" });
        }
    }

    const showConfirmPassword = (): JSX.Element | null => {
        return !state.loginFlag ?
            <AnimatedTextInput translateY={translateY} iconName={"account-key"}
                onFocus={() => dispatch({ type: "setToggled", payload: true })} secureTextEntry={state.showConfirmPassword}
                value={state.confirmPassword}
                onChangeText={(confirmPassword: string) => dispatch({ type: "setValidateConfirmPassword", payload: confirmPassword })}
                placeholder="***********" onPress={() => dispatch({ type: "setShowConfirmPassword", payload: !state.showConfirmPassword })} />
            : null;
    }
    const bottomText = (): JSX.Element => {
        return !state.loginFlag ?
            <BottomText firstPart={'Allready have an account?'} secondPart={'Sign in here'}
                onPress={() => dispatch({ type: "setLoginFlag", payload: true })} marginTop={80} />
            :
            <BottomText firstPart={'Dont have an account?'} secondPart={'Register here'}
                onPress={() => dispatch({ type: "setLoginFlag", payload: false })} marginTop={155} />
    }
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[styles.titleContainer, styles.positionCenter, { transform: [{ translateY }] }]}>
                <Text style={styles.titleStyle}>POLICE DETECTOR</Text>
            </Animated.View>
            <Animated.View style={[styles.capContainer, { transform: [{ translateY }] }]}>
                <Image source={require('../images/policeCap.png')} style={styles.policeCapDimensions} />
            </Animated.View>
            <AnimatedTextInput iconName={"email"} onFocus={() => dispatch({ type: "setToggled", payload: true })} translateY={translateY}
                onChangeText={(email: string) => validateEmail(email)} value={state.email} placeholder="sven.suk5@gmail.com"
            />
            <ErrorText translateY={translateY} validationError={state.emailValidationError} />
            <AnimatedTextInput translateY={translateY} iconName={"account-key"} onFocus={() => dispatch({ type: "setToggled", payload: true })} secureTextEntry={state.showPassword}
                value={state.password} onChangeText={(password: string) => validatePassword(password)}
                placeholder="***********" onPress={() => dispatch({ type: "setShowPassword", payload: !state.showPassword })} />
            <ErrorText translateY={translateY} validationError={state.passwordValidationError} />
            {showConfirmPassword()}
            <SubmitButtonText loginFlag={state.loginFlag} />
            {bottomText()}
        </View>
    )
}

const styles = StyleSheet.create({
    positionCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleContainer: {
        height: 125,
    },
    titleStyle: {
        fontSize: 23,
        fontFamily: 'Merriweather-Regular'
    },
    capContainer: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    policeCapDimensions: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        transform: [{ rotate: '55deg' }]
    },
})

export default Login;
