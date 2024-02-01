/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const userState = {
  users: [],
  isFetchingUsers: false,
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

    case types.CLEAR_USERS:
      return {
        ...state,
        users: [],
      };

    default:
      return state;
  }
};

export { userReducer, userState };
