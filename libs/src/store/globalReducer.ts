/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { authReducer, authState } from './auth';
import { userReducer, userState } from './user';

const rootReducer = (state: any, action: any) => ({
  auth: authReducer(state.auth, action),
  user: userReducer(state.user, action),
});

const initialState = {
  auth: authState,
  user: userState,
};

export const useAppReducer = () => useReducer(rootReducer, initialState);
