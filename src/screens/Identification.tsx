import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, Image, Keyboard } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
//@ts-ignore
import { useTransition } from 'react-native-redash/lib/module/v1';
import { reducer, Actions, IState } from '../reducers/loginReducer';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../helpers/constants/LoginConst';
import BottomText from '../components/identification/BottomText';
import AnimatedTextInput from '../components/identification/AnimatedTextInput';
import ErrorText from '../components/identification/ErrorText'
import SubmitButtonText from '../components/identification/SubmitBottomText';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import Spinner from '../components/identification/Spinner';
import GlobalError from '../components/identification/GlobalError';

//The goal is to create validation with regular expression not with yup/formik or something like that
interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Login = ({ navigation }: IProps): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        email: "", password: "", confirmPassword: "",
        emailValidationError: "", passwordValidationError: "",
        loginFlag: false, toggled: false, showPassword: false,
        showConfirmPassword: false, globalError: "", spinnerFlag: false
    });
    //transition depend on toggle state
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


    const validateEmail = (email: string): void => {
        const validateEmail = email.match(/^\w+(.\w+)@gmail.com$/g);
        if (validateEmail) {
            dispatch({ type: "setValidateEmail", email: email, emailValidationError: "Email is valid" })
        }
        else {
            dispatch({ type: "setValidateEmail", email: email, emailValidationError: "Invalid email" })
        }
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
        if (!state.loginFlag) {
            return (
                <AnimatedTextInput iconName={"account-key"} onFocus={() => dispatch({ type: "setToggled", payload: true })}
                    secureTextEntry={state.showConfirmPassword} translateY={translateY}
                    value={state.confirmPassword} placeholder="***********"
                    onChangeText={(confirmPassword: string) => dispatch({ type: "setValidateConfirmPassword", payload: confirmPassword })}
                    onPress={() => dispatch({ type: "setShowConfirmPassword", payload: !state.showConfirmPassword })} />
            )
        }
        return null;
    }
    const bottomText = (): JSX.Element => {
        if (!state.loginFlag) {
            return (
                <BottomText firstPart={'Allready have an account?'} secondPart={'Sign in here'}
                    onPress={() => dispatch({ type: "setLoginFlag", payload: true })} marginTop={80} />
            )
        }
        return (
            <BottomText firstPart={'Dont have an account?'} secondPart={'Register here'}
                onPress={() => dispatch({ type: "setLoginFlag", payload: false })} marginTop={155} />
        )

    }

    const login = async () => {
        try {
            await auth().signInWithEmailAndPassword(state.email, state.password);
            dispatch({ type: "clear" })
            navigation.navigate('TabBar')
        } catch (error) {
            dispatch({ type: "setGlobalError", payload: "Email or password is incorrect" })
        }
    }

    const register = async () => {
        try {
            await auth().createUserWithEmailAndPassword(state.email, state.password);
            await database().ref('Users/' + auth().currentUser?.uid).set({
                autofocusFlag: false,
                notificationFlag: false,
                mode: "classic"
            })
            dispatch({ type: "clear" })
            navigation.navigate('TabBar')
        } catch (error) {
            dispatch({ type: "setGlobalError", payload: "Email is already in use" })
        }
    }

    const identificate = (): void => {
        dispatch({ type: "setSpinnerFlag", payload: true });
        //Login
        if (state.loginFlag && state.emailValidationError === "Email is valid" && state.passwordValidationError === "Password is valid") {
            login();
        }
        //Register
        else if (!state.loginFlag && state.password === state.confirmPassword && state.emailValidationError === "Email is valid" && state.passwordValidationError === "Password is valid") {
            register();
        }
        else {
            dispatch({ type: "setGlobalError", payload: "You have not met all the conditions" })
        }
    }

    const showButtonOrSpinner = (): JSX.Element => {
        if (state.spinnerFlag) {
            return (
                <View style={styles.positionCenter}><Spinner size={30} /></View>
            )
        }
        return (
            <SubmitButtonText loginFlag={state.loginFlag} onPress={() => identificate()} />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <Animated.View style={[styles.titleContainer, styles.positionCenter, { transform: [{ translateY }] }]}>
                <Text style={styles.titleStyle}>POLICE DETECTOR</Text>
            </Animated.View>
            <Animated.View style={[styles.capContainer, { transform: [{ translateY }] }]}>
                <Image source={require('../images/policeCap.png')} style={styles.policeCapDimensions} />
            </Animated.View>
            <AnimatedTextInput iconName={"email"} onFocus={() => dispatch({ type: "setToggled", payload: true })}
                translateY={translateY} secureTextEntry={true}
                onChangeText={(email: string) => validateEmail(email)} value={state.email} placeholder="sven.suk5@gmail.com"
            />
            <ErrorText translateY={translateY} validationError={state.emailValidationError} />
            <AnimatedTextInput iconName={"account-key"} onFocus={() => dispatch({ type: "setToggled", payload: true })}
                translateY={translateY} secureTextEntry={state.showPassword}
                onChangeText={(password: string) => validatePassword(password)} value={state.password}
                placeholder="***********" onPress={() => dispatch({ type: "setShowPassword", payload: !state.showPassword })} />
            <ErrorText translateY={translateY} validationError={state.passwordValidationError} />
            {showConfirmPassword()}
            <View style={styles.positionCenter}>
                <GlobalError globalError={state.globalError} />
            </View>
            {showButtonOrSpinner()}
            {bottomText()}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
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
