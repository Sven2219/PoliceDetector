import { createContext } from 'react';
import {Actions,IState} from '../reducers/detectorReducer';


interface IContextProps {
    dispatch: React.Dispatch<Actions>
    state: IState;
}
export const DetectorContext = createContext({} as IContextProps);