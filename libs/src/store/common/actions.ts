/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './action-types';

export const setSideModalState = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_SIDE_MODAL_STATE,
    payload,
  });
};

export const setCenterModalState = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_CENTER_MODAL_STATE,
    payload,
  });
};
