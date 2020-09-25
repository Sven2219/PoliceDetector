//interface that represent our current location
export interface IPosition{
    latitude: number;
    longitude: number;
}

export interface IMapMode{
    name:string;
    uri:string;
    id:number;
}

export interface ISettings{
  autofocusFlag:boolean;
  notificationFlag:boolean;
  mode:string;
}

export interface IFirebase{
  
}