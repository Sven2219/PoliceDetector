import { dark, classic, retro, silver, night } from '../../components/settings/mapModes/modesFromGoogle';
import { IPosition } from '../interface/interfaces';
import { getPreciseDistance } from 'geolib';
//mode depend on state=>mode
export const checkMode = (mode: string) => {
    switch (mode) {
        case "classic":
            return classic;
        case "dark":
            return dark;
        case "retro":
            return retro;
        case "night":
            return night;
        case "silver":
            return silver;
    }
}
//color depend on mode
export const checkColor = (mode: string): string => {
    return (mode === 'night' || mode === 'dark' ? "#fff" : "#000");
}

////////////////////////////////////////////////////////////
//POLICEMAN methods
export const preciseDistance=(markerPosition:IPosition,myPosition:IPosition)=>{
    var dis=getPreciseDistance(
        { latitude: markerPosition.latitude, longitude: markerPosition.longitude },
        { latitude: myPosition.latitude, longitude: myPosition.longitude }
    )
    return dis;
}




