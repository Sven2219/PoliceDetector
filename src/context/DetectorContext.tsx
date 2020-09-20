import { createContext } from 'react';
import {Actions,IState} from '../reducers/detectorReducer';
import { ISettingsState } from '../reducers/settingsReducer';


interface IContextProps {
    dispatch: React.Dispatch<Actions>
    state: IState;
    settingsState:ISettingsState;
}
export const DetectorContext = createContext({} as IContextProps);