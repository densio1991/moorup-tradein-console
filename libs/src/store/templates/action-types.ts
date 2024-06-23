import { createActionTypes } from '../../helpers';

export const FETCH_TEMPLATES = createActionTypes('FETCH_TEMPLATES');
export const REQUEST_TEMPLATE_CHANGE = createActionTypes('REQUEST_TEMPLATE_CHANGE');
export const UPDATE_TEMPLATE = createActionTypes('UPDATE_TEMPLATE');
export const REQUEST_TEMPLATE_PREVIEW = createActionTypes('REQUEST_TEMPLATE_PREVIEW');

export const CLEAR_TEMPLATES = 'CLEAR_TEMPLATES';
export const CLEAR_TEMPLATE_PREVIEW = 'CLEAR_TEMPLATE_PREVIEW';
export const SET_ACTIVE_PILL = 'SET_ACTIVE_PILL';
