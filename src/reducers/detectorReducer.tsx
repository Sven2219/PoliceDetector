import { IPosition } from "../helpers/interface/interfaces";

export interface IState {
    myPosition: IPosition;
    fullScreenFlag: boolean;
}

type setMyPosition = {
    readonly type: "setMyPostion";
    readonly payload: IPosition;
}
type setFullScreenFlag = {
    readonly type: "setFullScreenFlag";
    readonly payload: boolean;
}
export type Actions = setMyPosition | setFullScreenFlag

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMyPostion":
            return { ...state, myPosition: actions.payload };
        case "setFullScreenFlag":
            return { ...state, fullScreenFlag: actions.payload };
        default:
            return state;
    }
}

