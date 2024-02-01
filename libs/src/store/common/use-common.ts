/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useCommon = () => {
  const { state, dispatch } = useContext(RootContext);

  const setSideModalState = (payload: any) => {
    actions.setSideModalState(payload)(dispatch);
  }

  return {
    state: state.common,
    setSideModalState,
  };
};
