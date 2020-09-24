import { createContext } from 'react';
import { IState } from '../../reducers/detectorReducer';
interface IContextProps {
    dState: IState;
}
export const DetectorStateContext = createContext({} as IContextProps);