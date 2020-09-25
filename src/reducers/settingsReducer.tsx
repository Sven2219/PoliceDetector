
export interface IState {
    mode: string;
    autofocusFlag: boolean;
    notificationFlag: boolean;
}


type setMode = {
    readonly type: "setMode";
    readonly payload: string;
}
type setAutofocusFlag = {
    readonly type: "setAutofocusFlag";
    readonly payload: boolean;
}
type setNotificationFlag = {
    readonly type: "setNotificationFlag";
    readonly payload: boolean;
}
type setAllSettings = {
    readonly type: "setAllSettings";
    readonly autofocusFlag: boolean;
    readonly notificationFlag: boolean;
    readonly mode: string;
}
export type Actions = setMode | setAutofocusFlag | setNotificationFlag | setAllSettings;


export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMode":
            return { ...state, mode: actions.payload };
        case "setAutofocusFlag":
            return { ...state, autofocusFlag: actions.payload };
        case "setNotificationFlag":
            return { ...state, notificationFlag: actions.payload };
        case "setAllSettings":
            return { ...state, autofocusFlag: actions.autofocusFlag, mode: actions.mode, notificationFlag: actions.notificationFlag };
        default:
            return state;
    }
}