/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as types from './action-types';

export const getUsers = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_USERS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/admins?platform=${platform}&exclude=${payload}`, { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_USERS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_USERS.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_USERS.FAILED,
          payload: error,
        });
      }
    });
};

export const clearUsers = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_USERS,
    payload,
  });
};

export const createUser = (payload: any, currentUserId: string, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.CREATE_USER.baseType,
    payload,
  });

  axiosInstance()
    .post('/api/admins', payload)
    .then((response) => {
      dispatch({
        type: types.CREATE_USER.SUCCESS,
        payload: response?.data,
      });

      getUsers(currentUserId, platform)(dispatch);
      toast.success('User successfully added!');
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_USER.FAILED,
        payload: error,
      });

      getUsers(currentUserId, platform)(dispatch);
      toast.error('Failed to add user!');
    });
};

export const updateUser = (id: string, platform: string, payload: any) => (dispatch: any) => {
  dispatch({
    type: types.UPDATE_USER.baseType,
    payload,
  });

  axiosInstance()
    .patch(`/api/admins/${id}`, payload)
    .then((response) => {
      dispatch({
        type: types.UPDATE_USER.SUCCESS,
        payload: response?.data,
      });

      getUsers({}, platform)(dispatch);
      toast.success('User successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_USER.FAILED,
        payload: error,
      });

      toast.error('Failed to update user!');
    });
};
