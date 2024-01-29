/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeJWT } from '../../helpers';
import * as types from './action-types';

const authState = {
  token: localStorage.getItem('FTK') || null,
  expiry: localStorage.getItem('FTKX') || null,
  isAuthenticating: false,
  authenticationError: null,
  isLoggingOut: false,
  userDetails: {},
  isFetchingUserDetails: false,
  activePlatform: '',
};

const authReducer = (state: any, action: any) => {
  console.log('\x1b[33m auth action: ', action);

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
      const accessToken = action.payload?.data?.access_token?.token;
      const decodedToken = decodeJWT(accessToken);

      if (decodedToken) {
        localStorage.setItem('FTK', accessToken);
        localStorage.setItem('FTKX', decodedToken.exp.toString());
      }

      return {
        ...state,
        isAuthenticating: false,
        token: accessToken,
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
        userDetails: action.payload.data,
        activePlatform: action.payload?.data?.platforms[0] || '',
      };
    }
    case types.GET_USER_DETAILS.FAILED: {
      return {
        ...state,
        isFetchingUserDetails: false,
        userDetails: {},
      };
    }

    case types.SET_ACTIVE_PLATFORM:
      return {
        ...state,
        activePlatform: action.payload,
      };

    default:
      return state;
  }
};

export { authReducer, authState };
