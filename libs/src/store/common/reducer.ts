/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const commonState = {
  sideModalState: {
    open: false,
  },
};

const commonReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.SET_SIDE_MODAL_STATE:
      return {
        ...state,
        sideModalState: action.payload,
      };

    default:
      return state;
  }
};

export { commonReducer, commonState };
