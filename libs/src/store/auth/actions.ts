/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import axiosInstance from '../axios';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  ACTIVE_PLATFORM,
  CANCELLED_AXIOS,
} from './../../constants';
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
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRY);
    localStorage.removeItem(ACTIVE_PLATFORM)
  
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

export const getPlatformConfig = (payload: any, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.GET_PLATFORM_CONFIG.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/configurations?platform=${payload}`, { signal: signal })
    .then((response: { data: any; }) => {
      dispatch({
        type: types.GET_PLATFORM_CONFIG.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error: any) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.GET_PLATFORM_CONFIG.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.GET_PLATFORM_CONFIG.FAILED,
          payload: error,
        });
      }
    })
};

export const setActivePlatform = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ACTIVE_PLATFORM,
    payload,
  });
};

export const setLoading = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_LOADING,
    payload,
  });
};

export const clearPlatformConfig = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PLATFORM_CONFIG,
    payload,
  });
};

export const updatePlatformConfig = (id: string, activePlatform: string, payload: any) => (dispatch: any) => {
  dispatch({
    type: types.UPDATE_PLATFORM_CONFIG.baseType,
    payload: payload,
  });

  axiosInstance()
    .patch(`/api/configurations/${id}`, payload)
    .then((response) => {
      dispatch({
        type: types.UPDATE_PLATFORM_CONFIG.SUCCESS,
        payload: response?.data,
      });

      getPlatformConfig(activePlatform)(dispatch);
      toast.success('Configurations successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_PLATFORM_CONFIG.FAILED,
        payload: error,
      });

      getPlatformConfig(activePlatform)(dispatch);
      toast.error('Failed to update configurations!');
    });
};
