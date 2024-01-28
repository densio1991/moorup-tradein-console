/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';
import { decodeJWT } from '../helpers';

const globalState = {
  token: localStorage.getItem('FTK') || null,
  expiry: localStorage.getItem('FTKX') || null,
  isAuthenticating: false,
  authenticationError: null,
  isLoggingOut: false,
  userDetails: {},
  isFetchingUserDetails: false,
};

const globalReducer = (state: any, action: any) => {
  console.log('\x1b[33m action: ', action);

  switch (action.type) {
    case types.LOGIN_USER.baseType: {
      return {
        ...state,
        isAuthenticating: true,
        token: null,
        authenticationError: null,
      };
    }
    case types.LOGIN_USER.SUCCESS: {
      const decodedToken = decodeJWT(action.payload?.data?.access_token?.token);

      if (decodedToken) {
        localStorage.setItem('FTK', action.payload?.data?.access_token?.token);
        localStorage.setItem('FTKX', decodedToken.exp.toString());
      }

      return {
        ...state,
        isAuthenticating: false,
        token: action.payload.result,
        expiry: decodedToken?.exp.toString(),
        authenticationError: null,
      };
    }
    case types.LOGIN_USER.FAILED: {
      return {
        ...state,
        isAuthenticating: false,
        token: null,
        expiry: null,
        authenticationError: 'Invalid username or password. Please try again.',
      };
    }

    case types.LOGOUT_USER.baseType: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case types.LOGOUT_USER.SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        token: null,
        expiry: null,
        userDetails: null,
      };
    }
    case types.LOGOUT_USER.FAILED: {
      return {
        ...state,
        isLoggingOut: false,
      };
    }

    case types.GET_USER_DETAILS.baseType: {
      return {
        ...state,
        isFetchingUserDetails: true,
        userDetails: {},
      };
    }
    case types.GET_USER_DETAILS.SUCCESS: {
      return {
        ...state,
        isFetchingUserDetails: false,
        userDetails: action.payload,
      };
    }
    case types.GET_USER_DETAILS.FAILED: {
      return {
        ...state,
        isFetchingUserDetails: false,
        userDetails: {},
      };
    }

    default:
      return state;
  }
};

export { globalReducer, globalState };
