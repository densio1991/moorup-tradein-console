import { createActionTypes } from '../../helpers';

export const FETCH_PRODUCTS = createActionTypes('FETCH_PRODUCTS');
export const FETCH_PRODUCT_TYPES = createActionTypes('FETCH_PRODUCT_TYPES');
export const FETCH_PRODUCT_CATEGORIES = createActionTypes('FETCH_PRODUCT_CATEGORIES');
export const FETCH_PRODUCT_STATUSES = createActionTypes('FETCH_PRODUCT_STATUSES');
export const FETCH_PRODUCT_BRANDS = createActionTypes('FETCH_PRODUCT_BRANDS');

export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const SET_ADD_PRODUCT_PAYLOAD = 'SET_ADD_PRODUCT_PAYLOAD';
