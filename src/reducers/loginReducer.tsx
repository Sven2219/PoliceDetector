export interface IState {
    email: string;
    emailValidationError: string;
    password: string;
    passwordValidationError: string;
    confirmPassword: string;
    loginFlag: boolean;
    confirmPasswordAnimation: boolean;
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
    readonly confirmPassword: string;
}
type setLoginFlag = {
    readonly type: "setLoginFlag";
    readonly payload: boolean;
}
type setConfirmPasswordAnimation = {
    readonly type: "setConfirmPasswordAnimation";
    readonly payload: boolean;
}
export type Actions = setValidateEmail | setValidatePassword | setValidateConfirmPassword | setLoginFlag | setConfirmPasswordAnimation;

export const reducer = (state: IState, actions: Actions) => {
    switch (actions.type) {
        case "setValidateEmail":
            return { ...state, email: actions.email, emailValidationError: actions.emailValidationError };
        case "setValidatePassword":
            return { ...state, password: actions.password, passwordValidationError: actions.passwordValidationError };
        case "setValidateConfirmPassword":
            return { ...state, confirmPassword: actions.confirmPassword };
        case "setLoginFlag":
            return { ...state, loginFlag: actions.payload };
        case "setConfirmPasswordAnimation":
            return { ...state, confirmPasswordAnimation: actions.payload };
        default:
            return state;
    }
}