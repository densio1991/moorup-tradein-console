/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as types from './action-types';

export const getTemplates = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_TEMPLATES.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/template?platform=${platform}`, { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_TEMPLATES.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_TEMPLATES.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_TEMPLATES.FAILED,
          payload: error,
        });
      }
    });
};

export const createTemplate = (currentTemplateId: string, payload: any, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.CREATE_TEMPLATE.baseType,
    payload,
  });

  axiosInstance()
    .post('/api/template', payload)
    .then((response) => {
      dispatch({
        type: types.CREATE_TEMPLATE.SUCCESS,
        payload: response?.data,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.success('Template successfully added!');
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_TEMPLATE.FAILED,
        payload: error,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.error('Failed to add template!');
    });
};

export const requestTemplateChange = (currentTemplateId: string, payload: any, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.REQUEST_TEMPLATE_CHANGE.baseType,
    payload,
  });

  axiosInstance()
    .post(`/api/template/request-change/${currentTemplateId}`, payload)
    .then((response) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_CHANGE.SUCCESS,
        payload: response?.data,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.success('Template change request successfully submitted!');
    })
    .catch((error) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_CHANGE.FAILED,
        payload: error,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.error('Failed to submit template change request!');
    });
};

export const updateTemplate = (id: string, currentTemplateId: string, platform: string, payload: any) => (dispatch: any) => {
  dispatch({
    type: types.UPDATE_TEMPLATE.baseType,
    payload,
  });

  axiosInstance()
    .patch(`/api/admins/${id}`, payload)
    .then((response) => {
      dispatch({
        type: types.UPDATE_TEMPLATE.SUCCESS,
        payload: response?.data,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.success('Template successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_TEMPLATE.FAILED,
        payload: error,
      });

      getTemplates(currentTemplateId, platform)(dispatch);
      toast.error('Failed to update template!');
    });
};

export const clearTemplates = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_TEMPLATES,
    payload,
  });
};