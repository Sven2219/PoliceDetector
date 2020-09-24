import { IPosition, ISettings } from "../helpers/interface/interfaces";

export interface IState {
    markerPosition: IPosition;
    showMarker: boolean;
    settings: ISettings;
}

type setMarkerPosition = {
    readonly type: "setMarkerPosition";
    readonly payload: IPosition;
}
type setShowMarker = {
    readonly type: "setShowMarker";
    readonly payload: boolean;
}
type setSettings = {
    readonly type: "setSettings";
    readonly payload: ISettings;
}
export type Actions = setShowMarker | setMarkerPosition | setSettings ;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMarkerPosition":
            return { ...state, markerPosition: actions.payload };
        case "setShowMarker":
            return { ...state, showMarker: actions.payload };
        case "setSettings":
            return { ...state, settings: actions.payload };
        default:
            return state;
    }
}