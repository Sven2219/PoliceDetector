import React, { useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Keyboard, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { interpolate } from 'react-native-reanimated';
//@ts-ignore
import {useTransition} from 'react-native-redash/lib/module/v1'

import { reducer, Actions, IState } from '../reducers/loginReducer';
import { IMAGE_WIDTH, IMAGE_HEIGHT, TEXTINPUT_WIDTH, LEFT, ICON_SIZE, width } from '../helpers/constants/LoginConst';


//The goal is to create validation with regular expression not with yup/formik or something like that

const Login = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        email: "", password: "", confirmPassword: "",
        emailValidationError: "", passwordValidationError: "",
        loginFlag: false, toggled:false
    });
    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);

      const _keyboardDidHide = () => {
        dispatch({type:"setToggled",payload:false})
      };
    const transition = useTransition(state.toggled,{duration:1000});
    const translateY = interpolate(transition,{
        inputRange:[0,1],
        outputRange:[0,-100]
    })
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
    const isValid = (valid: string): string => {
        return valid.match(/(?=valid$)/g) ? "green" : "#b22222";
    }

    return (
        <View style={{flex:1}}>
            <Animated.View style={[styles.titleContainer,{transform:[{translateY}]}]}>
                <Text style={styles.titleStyle}>POLICE DETECTOR</Text>
            </Animated.View>
            <Animated.View style={[styles.capContainer,{transform:[{translateY}]}]}>
                <Image source={require('../images/policeCap.png')} style={styles.policeCapDimensions} />
            </Animated.View>
            <Animated.View style={[styles.reinputContainer,{transform:[{translateY}]}]}>
                <MaterialCommunityIcons name="email" size={ICON_SIZE} />
                <TextInput onFocus={() => dispatch({type:"setToggled",payload:true})} value={state.email} onChangeText={(email: string) => validateEmail(email)} placeholder="sven.suk5@gmail.com" style={styles.textInputSize} />
            </Animated.View>
            <Animated.View style={[styles.errorPosition,{transform:[{translateY}]}]}>
                <Text style={{ fontSize: 16, color: isValid(state.emailValidationError) }}>{state.emailValidationError}</Text>
            </Animated.View>
            <Animated.View style={[styles.reinputContainer,{transform:[{translateY}]}]}>
                <MaterialCommunityIcons name="account-key" size={ICON_SIZE} />
                <TextInput onFocus={() => dispatch({type:"setToggled",payload:true})} secureTextEntry={true} value={state.password} onChangeText={(password: string) => validatePassword(password)} placeholder="***********" style={styles.textInputSize} />
            </Animated.View>
            <Animated.View style={[styles.errorPosition,{transform:[{translateY}]}]}>
                <Text style={{ fontSize: 16, color: isValid(state.passwordValidationError) }}>{state.passwordValidationError}</Text>
            </Animated.View>
            <Animated.View style={[styles.reinputContainer,{transform:[{translateY}]}]}>
                <MaterialCommunityIcons name="account-key" size={ICON_SIZE} />
                <TextInput onFocus={() => dispatch({type:"setToggled",payload:true})} secureTextEntry={true} value={state.confirmPassword} onChangeText={(confirmPassword: string) => dispatch({type:"setValidateConfirmPassword",payload:confirmPassword})} placeholder="***********" style={styles.textInputSize} />
            </Animated.View>
            <View style={styles.bottomOptionContainer}>
                <Text style={styles.bottomTextStyle}>Allready have an account?</Text>
                <TouchableOpacity onPress={() => dispatch({ type: "setLoginFlag", payload: true })}>
                    <Text style={[styles.bottomTextStyle, { color: 'blue' }]}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
    reinputContainer: {
        width: TEXTINPUT_WIDTH,
        flexDirection: 'row',
        borderWidth: 0.5,
        paddingLeft: LEFT / 2,
        alignItems: 'center',
        left: LEFT,
        borderRadius: LEFT / 2,
        marginBottom: 25
    },
    textInputSize: {
        width: TEXTINPUT_WIDTH - ICON_SIZE - LEFT
    },
    bottomOptionContainer: {
        marginTop:130,
        justifyContent:'center',
        alignItems:'center',
        width,
        flexDirection:'row',

    },
    bottomTextStyle: {
        fontSize: 17,
        fontFamily: 'Merriweather-Regular'
    },
    errorPosition: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 15
    }
})

export default Login;
