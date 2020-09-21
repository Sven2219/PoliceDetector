import { createContext } from 'react';
import { Actions, IState } from '../reducers/settingsReducer';
interface IContextProps {
    dispatch: React.Dispatch<Actions>
    state: IState;
}
export const SettingsContext = createContext({} as IContextProps);