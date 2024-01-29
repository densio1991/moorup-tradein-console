/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import * as types from './action-types';

export const getUsers = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_USERS.baseType,
    payload,
  });

  axiosInstance()
    .get('/api/admins')
    .then((response) => {
      dispatch({
        type: types.FETCH_USERS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_USERS.FAILED,
        payload: error,
      });
    });
};

export const clearUsers = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_USERS,
    payload,
  });
};
