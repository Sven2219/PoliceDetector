import { IFirebase, IPosition, ISettings } from "../helpers/interface/interfaces";

export interface IState {
    myPosition: IPosition;
    fullScreenFlag: boolean;
    settings: ISettings;
    policeman: IFirebase[];
}

type setMyPosition = {
    readonly type: "setMyPostion";
    readonly payload: IPosition;
}
type setFullScreenFlag = {
    readonly type: "setFullScreenFlag";
    readonly payload: boolean;
}
type setSettings = {
    readonly type: "setSettings";
    readonly payload: ISettings;
}
type setPoliceman = {
    readonly type: "setPoliceman";
    readonly payload: IFirebase[]
}
export type Actions = setMyPosition | setFullScreenFlag | setSettings | setPoliceman;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMyPostion":
            return { ...state, myPosition: actions.payload };
        case "setFullScreenFlag":
            return { ...state, fullScreenFlag: actions.payload };
        case "setSettings":
            return { ...state, settings: actions.payload };
        case "setPoliceman":
            return { ...state, policeman: actions.payload };
        default:
            return state;
    }
}

