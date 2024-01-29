/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import * as types from './action-types';

export const loginUser = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.LOGIN_USER.baseType,
    payload,
  });
  axiosInstance()
    .post('/api/auth/omc-login', payload)
    .then((response: { data: any; }) => {
      dispatch({
        type: types.LOGIN_USER.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.LOGIN_USER.FAILED,
        payload: err,
      });
    });
};

export const logoutUser = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.LOGOUT_USER.baseType,
    payload,
  });

  try {
    localStorage.removeItem('FTK');
    localStorage.removeItem('FTKX');
  
    dispatch({
      type: types.LOGOUT_USER.SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: types.LOGOUT_USER.FAILED,
      payload,
    });
  }
};

export const getUserDetailsById = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.GET_USER_DETAILS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/admins/${payload}`)
    .then((response: { data: any; }) => {
      dispatch({
        type: types.GET_USER_DETAILS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: types.GET_USER_DETAILS.FAILED,
        payload: error,
      });
    });
};

export const setActivePlatform = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ACTIVE_PLATFORM,
    payload,
  });
};
