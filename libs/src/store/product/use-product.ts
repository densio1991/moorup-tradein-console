/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useProduct = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getProducts = (payload: any) => {
    actions.getProducts(activePlatform, payload)(dispatch);
  }

  const clearProducts = (payload: any) => {
    actions.clearProducts(payload)(dispatch);
  }

  return {
    state: state.product,
    getProducts,
    clearProducts,
  };
};
