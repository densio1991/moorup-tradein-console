/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import * as types from './action-types';

export const getPromotions = (payload: any, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_PROMOTIONS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/promotions?platform=${platform}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_PROMOTIONS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_PROMOTIONS.FAILED,
        payload: error,
      });
    });
};

export const clearPromotions = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PROMOTIONS,
    payload,
  });
};
