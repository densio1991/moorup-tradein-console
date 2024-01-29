/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { authReducer, authState } from './auth';
import { productReducer, productState } from './product';
import { userReducer, userState } from './user';

const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  user: userReducer(state.user, action),
  product: productReducer(state.product, action),
});

const initialState = {
  auth: authState,
  user: userState,
  product: productState,
};

export const useAppReducer = () => useReducer(rootReducer, initialState);
