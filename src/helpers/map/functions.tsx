import { dark, classic, retro, silver, night } from '../../components/settings/mapModes/modesFromGoogle';
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
export const checkColor = (mode: string): string => {
    return (mode === 'night' || mode === 'dark' ? "#fff" : "#000");
}