//interface that represent our current location
export interface INativePosition{
    latitude: number;
    longitude: number;
    altitude: number;
    timestamp: number;
    accuracy: number;
    speed: number;
    heading: number;
    isFromMockProvider: boolean;
  }
  
export interface IMapMode{
    name:string;
    uri:string;
    id:number;
}