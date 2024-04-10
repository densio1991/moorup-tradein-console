/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useUser = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getUsers = (payload: any, signal: AbortSignal) => {
    actions.getUsers(payload, activePlatform, signal)(dispatch);
  }

  const clearUsers = (payload: any) => {
    actions.clearUsers(payload)(dispatch);
  }

  const createUser = (payload: any, currentUserId: string) => {
    actions.createUser(payload, currentUserId, activePlatform)(dispatch);
  }

  const updateUser = (id: string, currentUserId: string, payload: any) => {
    actions.updateUser(id, currentUserId, activePlatform, payload)(dispatch);
  }

  return {
    state: state.user,
    getUsers,
    clearUsers,
    createUser,
    updateUser,
  };
};
