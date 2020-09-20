import { INativePosition } from "../helpers/interface/interfaces";

export interface IState{
    myPosition:INativePosition;
    fullScreenFlag:boolean;
    settingsModal:boolean;
}

type setMyPosition={
    readonly type:"setMyPostion";
    readonly payload:INativePosition;
}
type setFullScreenFlag={
    readonly type:"setFullScreenFlag";
    readonly payload:boolean;
}
type setSettingsModal={
    readonly type:"setSettingsModal";
    readonly payload:boolean;
}
export type Actions=setMyPosition|setFullScreenFlag|setSettingsModal;

export const reducer=(state:IState,actions:Actions):IState=>{
    switch(actions.type){
        case "setMyPostion":
            return{...state,myPosition:actions.payload};
        case "setFullScreenFlag":
            return{...state,fullScreenFlag:actions.payload};
        case "setSettingsModal":
            return{...state,settingsModal:actions.payload};
        default:
            return state;
    }
}

