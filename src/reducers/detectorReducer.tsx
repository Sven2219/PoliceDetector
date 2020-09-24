import { IPosition } from "../helpers/interface/interfaces";

export interface IState {
    myPosition: IPosition;
}

type setMyPosition = {
    readonly type: "setMyPostion";
    readonly payload: IPosition;
}
export type Actions = setMyPosition

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMyPostion":
            return { ...state, myPosition: actions.payload };
        default:
            return state;
    }
}

