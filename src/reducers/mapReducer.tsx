import { IPosition } from "../helpers/interface/interfaces";

export interface IState {
    markerPosition: IPosition;
    showMarker: boolean;
}

type setMarkerPosition = {
    readonly type: "setMarkerPosition";
    readonly payload: IPosition;
}
type setShowMarker = {
    readonly type: "setShowMarker";
    readonly payload: boolean;
}
export type Actions = setShowMarker | setMarkerPosition;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMarkerPosition":
            return { ...state, markerPosition: actions.payload };
        case "setShowMarker":
            return { ...state, showMarker: actions.payload };
        default:
            return state;
    }
}