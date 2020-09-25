import { IPosition } from "../helpers/interface/interfaces";

export interface IState {
    markerPosition: IPosition;
    showMarker: boolean;
}

type setMarkerPosition = {
    readonly type: "setMarkerPosition";
    readonly payload: IPosition;
    readonly showMarker?: boolean | undefined;
}
type setShowMarker = {
    readonly type: "setShowMarker";
    readonly payload: boolean;
}
export type Actions = setShowMarker | setMarkerPosition;

export const reducer = (state: IState, actions: Actions): IState => {
    switch (actions.type) {
        case "setMarkerPosition":
            if (actions.showMarker !== undefined) {
                return { ...state, markerPosition: actions.payload, showMarker: actions.showMarker };
            }
            return { ...state, markerPosition: actions.payload };
        case "setShowMarker":
            return { ...state, showMarker: actions.payload };
        default:
            return state;
    }
}