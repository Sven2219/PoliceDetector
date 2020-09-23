export interface IState {
    email: string;
    emailValidationError: string;
    password: string;
    passwordValidationError: string;
    confirmPassword: string;
    loginFlag: boolean;
    toggled: boolean;
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
export type Actions = setValidateEmail | setValidatePassword | setValidateConfirmPassword | setLoginFlag  | setToggled;

export const reducer = (state: IState, actions: Actions) => {
    switch (actions.type) {
        case "setValidateEmail":
            return { ...state, email: actions.email, emailValidationError: actions.emailValidationError };
        case "setValidatePassword":
            return { ...state, password: actions.password, passwordValidationError: actions.passwordValidationError };
        case "setValidateConfirmPassword":
            return { ...state, confirmPassword: actions.payload };
        case "setLoginFlag":
            return { ...state, loginFlag: actions.payload };
        case "setToggled":
            if(actions.payload===state.toggled){
                return state;
            }
            return{...state,toggled:actions.payload};
        default:
            return state;
    }
}