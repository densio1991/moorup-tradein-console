/* eslint-disable @typescript-eslint/no-explicit-any */
import { CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as types from './action-types';

export const getPromotions = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_PROMOTIONS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/promotions?platform=${platform}`, { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_PROMOTIONS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_PROMOTIONS.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_PROMOTIONS.FAILED,
          payload: error,
        });
      }
    });
};

export const clearPromotions = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PROMOTIONS,
    payload,
  });
};
