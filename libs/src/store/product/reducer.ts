/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const productState = {
  products: [],
  isFetchingProducts: true,
};

const productReducer = (state: any, action: any) => {
  console.log('\x1b[33m product action: ', action);

  switch (action.type) {
    case types.FETCH_PRODUCTS.baseType: {
      return {
        ...state,
        isFetchingProducts: true,
        products: [],
      };
    }
    case types.FETCH_PRODUCTS.SUCCESS: {
      return {
        ...state,
        isFetchingProducts: false,
        products: action.payload?.data,
      };
    }
    case types.FETCH_PRODUCTS.FAILED: {
      return {
        ...state,
        isFetchingProducts: false,
        products: [],
      };
    }

    case types.CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
      };

    default:
      return state;
  }
};

export { productReducer, productState };
