/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const promotionState = {
  promotions: [],
  isFetchingPromotions: true,
};

const promotionReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCH_PROMOTIONS.baseType: {
      return {
        ...state,
        isFetchingPromotions: true,
        promotions: [],
      };
    }
    case types.FETCH_PROMOTIONS.SUCCESS: {
      return {
        ...state,
        isFetchingPromotions: false,
        promotions: action.payload?.data,
      };
    }
    case types.FETCH_PROMOTIONS.FAILED: {
      return {
        ...state,
        isFetchingPromotions: false,
        promotions: [],
      };
    }

    case types.CLEAR_PROMOTIONS:
      return {
        ...state,
        promotions: [],
      };

    default:
      return state;
  }
};

export { promotionReducer, promotionState };
