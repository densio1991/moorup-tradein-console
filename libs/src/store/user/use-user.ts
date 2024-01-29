/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useUser = () => {
  const { state, dispatch } = useContext(RootContext);

  const getUsers = (payload: any) => {
    actions.getUsers(payload)(dispatch);
  }

  const clearUsers = (payload: any) => {
    actions.clearUsers(payload)(dispatch);
  }

  return {
    state,
    getUsers,
    clearUsers,
  };
};
