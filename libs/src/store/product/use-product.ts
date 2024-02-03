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

  const getProductTypes = () => {
    actions.getProductTypes()(dispatch);
  }

  const getProductCategories = (payload: any) => {
    actions.getProductCategories(activePlatform, payload)(dispatch);
  }

  const getProductBrands = (payload: any) => {
    actions.getProductBrands(activePlatform, payload)(dispatch);
  }

  const getProductStatuses = () => {
    actions.getProductStatuses()(dispatch);
  }

  const setAddProductPayload = (payload: any) => {
    actions.setAddProductPayload(payload)(dispatch);
  }

  return {
    state: state.product,
    getProducts,
    clearProducts,
    getProductTypes,
    getProductCategories,
    getProductBrands,
    getProductStatuses,
    setAddProductPayload,
  };
};
