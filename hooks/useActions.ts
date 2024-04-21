import { bindActionCreators } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import { allActions } from '@/redux/allActions';
import { type AppDispatch, type RootState } from '@/redux/store';

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(allActions, dispatch);
};

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
