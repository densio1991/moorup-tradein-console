/* eslint-disable @typescript-eslint/no-explicit-any */

import * as types from './action-types';

const templateState = {
  templates: [],
  isFetchingTemplates: true,
  isUpdatingTemplate: false,
  isRequestingTemplateChange: false,
  isRequestingTemplatePreview: false,
  templatePreview: {},
  activePill: 0,
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

    case types.REQUEST_TEMPLATE_CHANGE.baseType: {
      return {
        ...state,
        isRequestingTemplateChange: true,
      };
    }
    case types.REQUEST_TEMPLATE_CHANGE.SUCCESS: {
      return {
        ...state,
        isRequestingTemplateChange: false,
      };
    }
    case types.REQUEST_TEMPLATE_CHANGE.FAILED: {
      return {
        ...state,
        isRequestingTemplateChange: false,
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

    case types.REQUEST_TEMPLATE_PREVIEW.baseType: {
      return {
        ...state,
        isRequestingTemplatePreview: true,
      };
    }
    case types.REQUEST_TEMPLATE_PREVIEW.SUCCESS: {
      return {
        ...state,
        isRequestingTemplatePreview: false,
        templatePreview: action?.payload?.data
      };
    }
    case types.REQUEST_TEMPLATE_PREVIEW.FAILED: {
      return {
        ...state,
        isRequestingTemplatePreview: false,
        templatePreview: {},
      };
    }

    case types.CLEAR_TEMPLATE_PREVIEW:
      return {
        ...state,
        templatePreview: [],
      };

    case types.SET_ACTIVE_PILL:
      return {
        ...state,
        activePill: action.payload,
      };

    default:
      return state;
  }
};

export { templateReducer, templateState };
