/* eslint-disable @typescript-eslint/no-explicit-any */
import { CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as types from './action-types';

export const getOrderItems = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_ORDER_ITEMS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/orders/items?platform=${platform}`, { params: payload, signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_ORDER_ITEMS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_ORDER_ITEMS.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_ORDER_ITEMS.FAILED,
          payload: error,
        });
      }
    });
};

export const clearOrderItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDER_ITEMS,
    payload,
  });
};
