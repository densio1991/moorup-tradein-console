/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as commonTypes from '../common/action-types';
import * as types from './action-types';

export const getTemplates = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_TEMPLATES.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/template?platform=${platform}&type=${payload}`, { signal: signal })
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

export const requestTemplateChange = (currentTemplateId: string, payload: any, type: string, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.REQUEST_TEMPLATE_CHANGE.baseType,
    payload,
  });

  axiosInstance()
    .patch(`/api/template/request-change/${currentTemplateId}`, payload)
    .then((response) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_CHANGE.SUCCESS,
        payload: response?.data,
      });

      getTemplates(type, platform)(dispatch);
      toast.success('Template change request successfully submitted!');
    })
    .catch((error) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_CHANGE.FAILED,
        payload: error,
      });

      getTemplates(type, platform)(dispatch);
      toast.error('Failed to submit template change request!');
    });
};

export const clearTemplates = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_TEMPLATES,
    payload,
  });
};

export const requestTemplatePreview = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.REQUEST_TEMPLATE_PREVIEW.baseType,
    payload,
  });

  axiosInstance()
    .post('/api/template/request-change-preview', payload)
    .then((response) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_PREVIEW.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.REQUEST_TEMPLATE_PREVIEW.FAILED,
        payload: error,
      });

      toast.error('Failed to preview template.');
    });
};

export const clearTemplatePreview = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_TEMPLATE_PREVIEW,
    payload,
  });
};

export const setActivePill = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ACTIVE_PILL,
    payload,
  });
};

export const getTemplateApprovals = (payload: any, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_TEMPLATE_APPROVALS.baseType,
    payload,
  });

  axiosInstance()
    .get('/api/template/approvals', { params: payload, signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_TEMPLATE_APPROVALS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_TEMPLATE_APPROVALS.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_TEMPLATE_APPROVALS.FAILED,
          payload: error,
        });
      }
    });
};

export const clearTemplateApprovals = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_TEMPLATE_APPROVALS,
    payload,
  });
};

export const getTemplateApprovalById = (payload: any, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_TEMPLATE_APPROVAL_BY_ID.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/template/request-change/${payload}`,  { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_TEMPLATE_APPROVAL_BY_ID.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_TEMPLATE_APPROVAL_BY_ID.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_TEMPLATE_APPROVAL_BY_ID.FAILED,
          payload: error,
        });
      }
    });
};

export const clearTemplateApproval = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_TEMPLATE_APPROVAL,
    payload,
  });
};

export const processTemplateApproval = (payload: any, approvalId: string) => (dispatch: any) => {
  dispatch({
    type: types.PROCESS_TEMPLATE_APPROVAL.baseType,
    payload,
  });

  axiosInstance()
    .patch(`/api/template/approvals/${approvalId}/update-status`, payload)
    .then((response) => {
      dispatch({
        type: types.PROCESS_TEMPLATE_APPROVAL.SUCCESS,
        payload: response?.data,
      });

      toast.success(`Template successfully ${payload?.type}!`);

      dispatch({
        type: commonTypes.SET_REDIRECT,
        payload: '/dashboard/templates/approvals',
      });
    })
    .catch((error) => {
      dispatch({
        type: types.PROCESS_TEMPLATE_APPROVAL.FAILED,
        payload: error,
      });

      toast.error('Failed to process template approval.');
    });
};
