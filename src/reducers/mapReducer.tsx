import { IPosition } from "../helpers/interface/interfaces";

export interface IState {
    markerPosition: IPosition;
    showMarker: boolean;
    policeCounter: number;
}

type setMarkerPosition = {
    readonly type: "setMarkerPosition";
    readonly payload: IPosition;
    readonly showMarker?: boolean | undefined;
    readonly policeCounter?: number | undefined;
}
type setShowMarker = {
    readonly type: "setShowMarker";
    readonly payload: boolean;
}
type setPoliceCounter = {
    readonly type: "setPoliceCounter";
    readonly payload: number;
}
export type Actions = setShowMarker | setMarkerPosition | setPoliceCounter;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMarkerPosition":
            if (actions.showMarker !== undefined && actions.policeCounter !== undefined) {
                return { ...state, markerPosition: actions.payload, showMarker: actions.showMarker, policeCounter: actions.policeCounter };
            }
            return { ...state, markerPosition: actions.payload };
        case "setShowMarker":
            return { ...state, showMarker: actions.payload };
        case "setPoliceCounter":
            return { ...state, policeCounter: actions.payload };
        default:
            return state;
    }
}