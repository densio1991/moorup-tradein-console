import { createActionTypes } from '../../helpers';

export const FETCH_PRODUCTS = createActionTypes('FETCH_PRODUCTS');
export const FETCH_PRODUCT_TYPES = createActionTypes('FETCH_PRODUCT_TYPES');
export const FETCH_PRODUCT_CATEGORIES = createActionTypes('FETCH_PRODUCT_CATEGORIES');
export const FETCH_PRODUCT_STATUSES = createActionTypes('FETCH_PRODUCT_STATUSES');
export const FETCH_PRODUCT_BRANDS = createActionTypes('FETCH_PRODUCT_BRANDS');
export const ADD_PRODUCT = createActionTypes('ADD_PRODUCT');
export const FETCH_PRODUCT = createActionTypes('FETCH_PRODUCT');
export const UPDATE_PRODUCT = createActionTypes('UPDATE_PRODUCT');
export const ADD_PRODUCT_VARIANT = createActionTypes('ADD_PRODUCT_VARIANT');
export const UPDATE_PRODUCT_VARIANT = createActionTypes('UPDATE_PRODUCT_VARIANT');
export const UPLOAD_PRODUCTS_EXCEL = createActionTypes('UPLOAD_PRODUCTS_EXCEL');

export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const SET_ADD_PRODUCT_PAYLOAD = 'SET_ADD_PRODUCT_PAYLOAD';
export const SET_INCLUDE_PRODUCT_VARIANT = 'SET_INCLUDE_PRODUCT_VARIANT';
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
