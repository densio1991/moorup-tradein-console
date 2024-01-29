/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { authReducer, authState } from './auth';
import { productReducer, productState } from './product';
import { promotionReducer, promotionState } from './promotion';
import { userReducer, userState } from './user';

const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  user: userReducer(state.user, action),
  product: productReducer(state.product, action),
  promotion: promotionReducer(state.promotion, action),
});

const initialState = {
  auth: authState,
  user: userState,
  product: productState,
  promotion: promotionState,
};

export const useAppReducer = () => useReducer(rootReducer, initialState);
