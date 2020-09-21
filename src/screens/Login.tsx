import React, { useReducer } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, Image,TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { reducer, Actions, IState } from '../reducers/loginReducer';
import { IMAGE_WIDTH, IMAGE_HEIGHT, TEXTINPUT_WIDTH, LEFT, ICON_SIZE } from '../helpers/constants/LoginConst';


//The goal is to create validation with regular expression not with yup/formik or something like that

const Login = (): JSX.Element => {
    const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, {
        email: "", password: "", confirmPassword: "",
        emailValidationError: "", passwordValidationError: "",
        loginFlag: false,confirmPasswordAnimation:false
    });

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
    return (<View>
        <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>POLICE DETECTOR</Text>
        </View>
        <View style={styles.capContainer}>
            <Image source={require('../images/policeCap.png')} style={styles.policeCapDimensions} />
        </View>
        <View style={styles.reinputContainer}>
            <MaterialCommunityIcons name="email" size={ICON_SIZE} />
            <TextInput value={state.email} onChangeText={(email: string) => validateEmail(email)} placeholder="sven.suk5@gmail.com" style={styles.textInputSize} />
        </View>
        <View style={styles.errorPosition}>
            <Text style={{ fontSize: 16, color: isValid(state.emailValidationError) }}>{state.emailValidationError}</Text>
        </View>
        <View style={styles.reinputContainer}>
            <MaterialCommunityIcons name="account-key" size={ICON_SIZE} />
            <TextInput secureTextEntry={true} value={state.password} onChangeText={(password: string) => validatePassword(password)} placeholder="***********" style={styles.textInputSize} />
        </View>
        <View style={styles.errorPosition}>
            <Text style={{ fontSize: 16, color: isValid(state.passwordValidationError) }}>{state.passwordValidationError}</Text>
        </View>
        <View style={styles.reinputContainer}>
            <MaterialCommunityIcons name="account-key" size={ICON_SIZE} />
            <TextInput onFocus={()=>console.log("focused")} onBlur={()=>console.log("blured")} secureTextEntry={true} value={state.confirmPassword} onChangeText={(email: string) => validateEmail(email)} placeholder="***********" style={styles.textInputSize} />
        </View>
        <View style={styles.bottomOptionContainer}>
            <Text style={styles.bottomTextStyle}>Allready have an account?</Text>
            <TouchableOpacity onPress={() => dispatch({ type: "setLoginFlag", payload: true })}>
                <Text style={[styles.bottomTextStyle, { color: 'blue' }]}>Login here</Text>
            </TouchableOpacity>
        </View>
    </View>)
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
