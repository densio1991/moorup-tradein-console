/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const userState = {
  users: [],
  isFetchingUsers: true,
  isCreatingUser: false,
  isUpdatingUser: false,
};

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCH_USERS.baseType: {
      return {
        ...state,
        isFetchingUsers: true,
        users: [],
      };
    }
    case types.FETCH_USERS.SUCCESS: {
      return {
        ...state,
        isFetchingUsers: false,
        users: action.payload?.data,
      };
    }
    case types.FETCH_USERS.FAILED: {
      return {
        ...state,
        isFetchingUsers: false,
        users: [],
      };
    }
    case types.FETCH_USERS.CANCELLED: {
      return {
        ...state,
        isFetchingUsers: true,
        users: [],
      };
    }

    case types.CLEAR_USERS:
      return {
        ...state,
        isFetchingUsers: true,
        users: [],
      };

    case types.CREATE_USER.baseType: {
      return {
        ...state,
        isCreatingUser: true,
      };
    }
    case types.CREATE_USER.SUCCESS: {
      return {
        ...state,
        isCreatingUser: false,
      };
    }
    case types.CREATE_USER.FAILED: {
      return {
        ...state,
        isCreatingUser: false,
      };
    }

    case types.UPDATE_USER.baseType: {
      return {
        ...state,
        isUpdatingUser: true,
      };
    }
    case types.UPDATE_USER.SUCCESS: {
      return {
        ...state,
        isUpdatingUser: false,
      };
    }
    case types.UPDATE_USER.FAILED: {
      return {
        ...state,
        isUpdatingUser: false,
      };
    }

    default:
      return state;
  }
};

export { userReducer, userState };
