
export interface ISettingsState{
    mode:string;
    autofocusFlag:boolean;
    notificationFlag:boolean;
}


type setMode={
    readonly type:"setMode";
    readonly payload:string;
}
type setAutofocusFlag={
    readonly type:"setAutofocusFlag";
    readonly payload:boolean;
}
type setNotificationFlag={
    readonly type:"setNotificationFlag";
    readonly payload:boolean;
}
export type Actions = setMode|setAutofocusFlag|setNotificationFlag;


export const reducer=(state:ISettingsState,actions:Actions):ISettingsState=>{
    switch(actions.type){
        case "setMode":
            return{...state,mode:actions.payload};
        case "setAutofocusFlag":
            return{...state,autofocusFlag:actions.payload};
        case "setNotificationFlag":{
            return{...state,notificationFlag:actions.payload};
        }
        default:
            return state;
    }
}