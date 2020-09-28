import { dark, classic, retro, silver, night } from '../../components/settings/mapModes/modesFromGoogle';
import { IFirebase, IPosition } from '../interface/interfaces';
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
    return mode === 'night' || mode === 'dark' ? "#fff" : "#000";
}
export const modalColor = (mode: string) => {
    return mode === "dark" || mode === "night" ? "#ffffffaa" : "#000000aa";
}
export const checkTextColorForModal = (mode: string): string => {
    return mode === "dark" || mode === "night" ? "#000" : "#fff";
}

////////////////////////////////////////////////////////////
//POLICEMAN methods
export const preciseDistance = (markerPosition: IPosition, myPosition: IPosition): number => {
    var dis = getPreciseDistance(
        { latitude: markerPosition.latitude, longitude: markerPosition.longitude },
        { latitude: myPosition.latitude, longitude: myPosition.longitude }
    )
    return dis;
}

export const calculatingDistance = (data: IFirebase[], myPosition: IPosition) => {
    //O(n);
    return data.map((el) => {
        return ({ ...el, distance: preciseDistance({ longitude: el.longitude, latitude: el.latitude }, myPosition) })
    })

}
export const sortCalculatedDistance = (res: IFirebase[]): void => {
    //O(nLog(n))
    res.sort((a, b): any => {
        if (a.distance !== undefined && b.distance !== undefined) {
            return a.distance - b.distance;
        }
    })
}
// is O(n) where n is end - start.
//in my case worst scenario is O(3)
export const nearestThree = (res: IFirebase[]): IFirebase[] => {
    let len = res.length > 3 ? 3 : res.length;
    return res.slice(0, len)
}


//Animating to region when autofocus flag is true
export const animateToRegion = (timing: number, myPosition: IPosition, mapRef: any): void => {
    let region = {
        latitude: Number(myPosition.latitude),
        longitude: Number(myPosition.longitude),
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
        useNativeDriver: true
    };
    mapRef.current.animateToRegion(region, timing)
}






//CALLOUT -> IN RENDER POLICEMAN

export const getDifferenceInMinutes = (date1: any, date2: any) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
}
export const getDifferenceInHours = (date1: any, date2: any) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
}
export const getDifferenceInDays = (date1: any, date2: any) => {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
}


