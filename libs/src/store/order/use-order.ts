/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useOrder = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getOrderItems = (payload: any, signal: AbortSignal) => {
    actions.getOrderItems(payload, activePlatform, signal)(dispatch);
  }

  const clearOrderItems = (payload: any) => {
    actions.clearOrderItems(payload)(dispatch);
  }

  return {
    state: state.order,
    getOrderItems,
    clearOrderItems,
  };
};
