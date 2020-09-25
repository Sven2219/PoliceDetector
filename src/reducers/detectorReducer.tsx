import { IFirebase, IPosition, ISettings } from "../helpers/interface/interfaces";

export interface IState {
    myPosition: IPosition;
    fullScreenFlag: boolean;
    settings: ISettings;
    allPoliceman: IFirebase[];
    onlyThreeToShow: IFirebase[];
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
type setAllPoliceman = {
    readonly type: "setAllPoliceman";
    readonly payload: IFirebase[]
}
type setOnlyThreeToShow = {
    readonly type: "setOnlyThreeToShow";
    readonly payload: IFirebase[];
}
export type Actions = setMyPosition | setFullScreenFlag | setSettings | setAllPoliceman | setOnlyThreeToShow;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMyPostion":
            return { ...state, myPosition: actions.payload };
        case "setFullScreenFlag":
            return { ...state, fullScreenFlag: actions.payload };
        case "setSettings":
            return { ...state, settings: actions.payload };
        case "setAllPoliceman":
            return { ...state, allPoliceman: actions.payload };
        case "setOnlyThreeToShow":
            return { ...state, onlyThreeToShow: actions.payload };
        default:
            return state;
    }
}

