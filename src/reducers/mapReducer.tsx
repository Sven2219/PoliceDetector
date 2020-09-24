import { IPosition, ISettings } from "../helpers/interface/interfaces";

export interface IState {
    markerPosition: IPosition;
    showMarker: boolean;
    fullScreen: boolean;
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
type setFullScreen = {
    readonly type: "setFullScreen";
    readonly payload: boolean;
}
export type Actions = setShowMarker | setMarkerPosition | setSettings | setFullScreen;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMarkerPosition":
            return { ...state, markerPosition: actions.payload };
        case "setShowMarker":
            return { ...state, showMarker: actions.payload };
        case "setSettings":
            return { ...state, settings: actions.payload };
        case "setFullScreen":
            return { ...state, fullScreen: actions.payload };
        default:
            return state;
    }
}