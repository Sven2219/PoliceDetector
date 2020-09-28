import React, { useContext, useState } from 'react';
import { MapEvent, Marker } from 'react-native-maps'
import { DetectorStateContext } from '../../../context/detector/StateContext';
import { IPosition } from '../../../helpers/interface/interfaces';
import Policeman from './Policeman';

interface IProps {
    showMarker: boolean;
    onDragEnd: (e: MapEvent<{}>) => void;
}

const AddNewMarker = ({ showMarker, onDragEnd }: IProps): JSX.Element | null => {
    const { dState } = useContext(DetectorStateContext);
    const [fixedMarkerPosition, setFixedMarkerPosition] = useState<IPosition>({ latitude: 0, longitude: 0 });

    if (showMarker) {
        if ((fixedMarkerPosition.latitude === 0 && fixedMarkerPosition.longitude === 0)) {
            setFixedMarkerPosition(dState.myPosition)
        }
        return (
            <Marker
                draggable={true}
                tracksViewChanges={true}
                onDragEnd={(e) => onDragEnd(e)}
                coordinate={{
                    latitude: Number(fixedMarkerPosition.latitude),
                    longitude: Number(fixedMarkerPosition.longitude)
                }}>
                <Policeman />
            </Marker>)
    }
    return null;
}

export default AddNewMarker;