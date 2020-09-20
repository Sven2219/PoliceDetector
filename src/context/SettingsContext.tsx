import { createContext } from 'react';
import { Actions, ISettingsState } from '../reducers/settingsReducer';
interface IContextProps {
    settingsDispatch: React.Dispatch<Actions>
    settingsState: ISettingsState;
}
export const SettingsContext = createContext({} as IContextProps);