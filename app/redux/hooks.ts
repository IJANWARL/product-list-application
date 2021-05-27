import {
  TypedUseSelectorHook,
  useDispatch as useDispatchCreator,
  useSelector as useSelectorCreator
} from 'react-redux';

import IAgentState from './models';
import { DispatchType } from './store';

export const useAppSelector: TypedUseSelectorHook<IAgentState> = useSelectorCreator;
export const useAppDispatch = () => useDispatchCreator<DispatchType>();
