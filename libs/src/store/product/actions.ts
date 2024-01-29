/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import * as types from './action-types';

export const getProducts = (payload: any, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_PRODUCTS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/products?platform=${platform}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_PRODUCTS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_PRODUCTS.FAILED,
        payload: error,
      });
    });
};

export const clearProducts = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PRODUCTS,
    payload,
  });
};
