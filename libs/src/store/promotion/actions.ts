/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
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

export const createPromotion = (payload: any, activePlatform: string) => (dispatch: any) => {
  dispatch({
    type: types.CREATE_PROMOTION.baseType,
    payload,
  });

  axiosInstance()
    .post('/api/promotions', payload)
    .then((response) => {
      dispatch({
        type: types.CREATE_PROMOTION.SUCCESS,
        payload: response?.data,
      });

      getPromotions({}, activePlatform)(dispatch);
      toast.success('Promotion successfully added!');
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_PROMOTION.FAILED,
        payload: error,
      });

      getPromotions({}, activePlatform)(dispatch);
      toast.error('Failed to add promotion.');
    });
};

export const setAddPromotionDetailsPayload = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ADD_PROMOTION_DETAILS_PAYLOAD,
    payload,
  });
};

export const setAddPromotionClaimsPayload = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ADD_PROMOTION_CLAIMS_PAYLOAD,
    payload,
  });
};

export const setAddPromotionStepsPayload = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ADD_PROMOTION_STEPS_PAYLOAD,
    payload,
  });
};

export const setAddPromotionConditionPayload = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ADD_PROMOTION_CONDITION_PAYLOAD,
    payload,
  });
};

export const setAddPromotionEligibilityAndFaqsPayload = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ADD_PROMOTION_ELIGIBILITY_AND_FAQS,
    payload,
  });
};

export const getPromotionClaims = (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_PROMOTION_CLAIMS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/claims?platform=${platform}`, { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_PROMOTION_CLAIMS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_PROMOTION_CLAIMS.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_PROMOTION_CLAIMS.FAILED,
          payload: error,
        });
      }
    });
};

export const clearPromotionClaims = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PROMOTION_CLAIMS,
    payload,
  });
};

export const getPromotionById = (payload: any, signal?: AbortSignal) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_PROMOTION_BY_ID.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/promotions/${payload}`,  { signal: signal })
    .then((response) => {
      dispatch({
        type: types.FETCH_PROMOTION_BY_ID.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      if (error.code === CANCELLED_AXIOS) {
        dispatch({
          type: types.FETCH_PROMOTION_BY_ID.CANCELLED,
          payload: error,
        });
      } else {
        dispatch({
          type: types.FETCH_PROMOTION_BY_ID.FAILED,
          payload: error,
        });
      }
    });
};

export const clearPromotion = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PROMOTION,
    payload,
  });
};

export const updatePromotion = (payload: any, promotionId: string, activePlatform: string) => (dispatch: any) => {
  dispatch({
    type: types.UPDATE_PROMOTION.baseType,
    payload,
  });

  axiosInstance()
    .patch(`/api/promotions/${promotionId}`, payload)
    .then((response) => {
      dispatch({
        type: types.UPDATE_PROMOTION.SUCCESS,
        payload: response?.data,
      });

      getPromotions({}, activePlatform)(dispatch);
      toast.success('Promotion successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_PROMOTION.FAILED,
        payload: error,
      });

      getPromotions({}, activePlatform)(dispatch);
      toast.error('Failed to update promotion.');
    });
};
