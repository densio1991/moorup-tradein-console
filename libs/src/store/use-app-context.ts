/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import * as actions from './actions';
import { RootContext } from './provider';

export const useAppContext = () => {
  const { state, dispatch } = useContext(RootContext);

  const loginUser = (payload: any) => {
    actions.loginUser(payload)(dispatch);
  }

  const logoutUser = () => {
    actions.logoutUser({})(dispatch);
  }

  const getUserDetailsById = (payload: any) => {
    actions.getUserDetailsById(payload)(dispatch);
  }

  return {
    state,
    loginUser,
    logoutUser,
    getUserDetailsById,
  };
};
