import { createContext } from 'react';
import { Actions } from '../../reducers/detectorReducer';
interface IContextProps {
    dDispatch: React.Dispatch<Actions>;
}
export const DetectorDispatchContext = createContext({} as IContextProps);