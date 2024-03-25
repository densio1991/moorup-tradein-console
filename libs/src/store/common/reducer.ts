/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const commonState = {
  sideModalState: {
    open: false,
    view: null,
  },
  centerModalState: {
    open: false,
    view: null,
  },
  searchTerm: '',
  showSideNav: true,
};

const commonReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.SET_SIDE_MODAL_STATE:
      return {
        ...state,
        sideModalState: action.payload,
      };

    case types.SET_CENTER_MODAL_STATE:
      return {
        ...state,
        centerModalState: action.payload,
      };

    case types.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case types.SET_SHOW_SIDE_NAV:
      return {
        ...state,
        showSideNav: action.payload,
      };

    default:
      return state;
  }
};

export { commonReducer, commonState };
