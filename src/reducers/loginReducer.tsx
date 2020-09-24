export interface IState {
    email: string;
    emailValidationError: string;
    password: string;
    passwordValidationError: string;
    confirmPassword: string;
    loginFlag: boolean;
    toggled: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    globalError: string;
    spinnerFlag: boolean;
}
type setValidateEmail = {
    readonly type: "setValidateEmail";
    readonly email: string;
    readonly emailValidationError: string;
}
type setValidatePassword = {
    readonly type: "setValidatePassword";
    readonly password: string;
    readonly passwordValidationError: string;
}
type setValidateConfirmPassword = {
    readonly type: "setValidateConfirmPassword";
    readonly payload: string;
}
type setLoginFlag = {
    readonly type: "setLoginFlag";
    readonly payload: boolean;
}
type setToggled = {
    readonly type: "setToggled";
    readonly payload: boolean;
}
type setShowPassword = {
    readonly type: "setShowPassword";
    readonly payload: boolean;
}
type setShowConfirmPassowrd = {
    readonly type: "setShowConfirmPassword";
    readonly payload: boolean;
}
type clear = {
    readonly type: "clear";
}
type setGlobalError = {
    readonly type: "setGlobalError";
    readonly payload: string;
}
type setSpinnerFlag = {
    readonly type: "setSpinnerFlag";
    readonly payload: boolean;
}
export type Actions = setValidateEmail | setValidatePassword | setValidateConfirmPassword | setLoginFlag | setToggled | setShowPassword | setShowConfirmPassowrd | clear | setGlobalError | setSpinnerFlag;

export const reducer = (state: IState, actions: Actions) => {
    switch (actions.type) {
        case "setValidateEmail":
            return { ...state, email: actions.email, emailValidationError: actions.emailValidationError };
        case "setValidatePassword":
            return { ...state, password: actions.password, passwordValidationError: actions.passwordValidationError };
        case "setValidateConfirmPassword":
            return { ...state, confirmPassword: actions.payload };
        case "setLoginFlag":
            return { ...state, loginFlag: actions.payload, email: "", password: "", confirmPassword: "", showConfirmPassword: false, showPassword: false, globalError: "" };
        case "setToggled":
            if (actions.payload === state.toggled) {
                return state;
            }
            return { ...state, toggled: actions.payload };
        case "setShowPassword":
            return { ...state, showPassword: actions.payload };
        case "setShowConfirmPassword":
            return { ...state, showConfirmPassword: actions.payload };
        case "clear":
            return { ...state, email: "", password: "", confirmPassword: "", showConfirmPassword: false, spinnerFlag: false, showPassword: false, passwordValidationError: "", emailValidationError: "", globalError: "" }
        case "setGlobalError":
            return { ...state, globalError: actions.payload, spinnerFlag: false };
        case "setSpinnerFlag":
            return { ...state, spinnerFlag: actions.payload };
        default:
            return state;
    }
}