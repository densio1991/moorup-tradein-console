/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const orderState = {
  orderItems: [],
  isFetchingOrderItems: true,
};

const orderReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCH_ORDER_ITEMS.baseType: {
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };
    }
    case types.FETCH_ORDER_ITEMS.SUCCESS: {
      return {
        ...state,
        isFetchingOrderItems: false,
        orderItems: action.payload?.data,
      };
    }
    case types.FETCH_ORDER_ITEMS.FAILED: {
      return {
        ...state,
        isFetchingOrderItems: false,
        orderItems: [],
      };
    }
    case types.FETCH_ORDER_ITEMS.CANCELLED: {
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };
    }

    case types.CLEAR_ORDER_ITEMS:
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };

    default:
      return state;
  }
};

export { orderReducer, orderState };
