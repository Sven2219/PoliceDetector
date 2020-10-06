import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get("window");
//button constants
export const ADD_POLICEMAN_BUTTON_HEIGHT = 40;
export const BUTTON_BOTTOM_NOT_FULL_SCREEN = 80;
export const BUTTON_BOTTOM_FULL_SCREEN = 40;


//map
export const LATITUDE_DELTA = 100;
export const LONGITUDE_DELTA = 100;

//fullscreen
export const ICON_SIZE = 50;


//undoButton
export const UNDO_BUTTON_BOTTOM = -3;



//callout dim
export const CALLOUT_WIDTH = 70;
export const CALLOUT_HEIGHT = 50;


export const POLICEMAN_SVG_WIDTH = width / 15.6;
export const POLICEMAN_SVG_HEIGHT = height / 15;
export const POLICEMAN_IMAGE_WIDTH = width / 13;
export const POLICEMAN_IMAGE_HEIGHT = height / 14.9;