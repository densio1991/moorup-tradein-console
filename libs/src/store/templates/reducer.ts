/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const templateState = {
  templates: [],
  isFetchingTemplates: true,
  isCreatingTemplate: false,
  isUpdatingTemplate: false,
};

const templateReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCH_TEMPLATES.baseType: {
      return {
        ...state,
        isFetchingTemplates: true,
        templates: [],
      };
    }
    case types.FETCH_TEMPLATES.SUCCESS: {
      return {
        ...state,
        isFetchingTemplates: false,
        templates: action.payload?.data,
      };
    }
    case types.FETCH_TEMPLATES.FAILED: {
      return {
        ...state,
        isFetchingTemplates: false,
        templates: [],
      };
    }
    case types.FETCH_TEMPLATES.CANCELLED: {
      return {
        ...state,
        isFetchingTemplates: true,
        templates: [],
      };
    }

    case types.CLEAR_TEMPLATES:
      return {
        ...state,
        isFetchingTemplates: true,
        templates: [],
      };

    case types.CREATE_TEMPLATE.baseType: {
      return {
        ...state,
        isCreatingTemplate: true,
      };
    }
    case types.CREATE_TEMPLATE.SUCCESS: {
      return {
        ...state,
        isCreatingTemplate: false,
      };
    }
    case types.CREATE_TEMPLATE.FAILED: {
      return {
        ...state,
        isCreatingTemplate: false,
      };
    }

    case types.UPDATE_TEMPLATE.baseType: {
      return {
        ...state,
        isUpdatingTemplate: true,
        isFetchingTemplates: true,
        templates: [],
      };
    }
    case types.UPDATE_TEMPLATE.SUCCESS: {
      return {
        ...state,
        isUpdatingTemplate: false,
      };
    }
    case types.UPDATE_TEMPLATE.FAILED: {
      return {
        ...state,
        isUpdatingTemplate: false,
      };
    }

    default:
      return state;
  }
};

export { templateReducer, templateState };
