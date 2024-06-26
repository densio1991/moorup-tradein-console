/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useProduct = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
    userDetails,
  } = state.auth;

  const getProducts = (payload: any, signal: AbortSignal) => {
    actions.getProducts(activePlatform, payload, signal)(dispatch);
  }

  const clearProducts = (payload: any) => {
    actions.clearProducts(payload)(dispatch);
  }

  const getProductTypes = (signal: AbortSignal) => {
    actions.getProductTypes(signal)(dispatch);
  }

  const getProductCategories = (payload: any) => {
    actions.getProductCategories(activePlatform, payload)(dispatch);
  }

  const getProductBrands = (payload: any) => {
    actions.getProductBrands(activePlatform, payload)(dispatch);
  }

  const getProductStatuses = (signal: AbortSignal) => {
    actions.getProductStatuses(signal)(dispatch);
  }

  const setAddProductPayload = (payload: any) => {
    actions.setAddProductPayload(payload)(dispatch);
  }

  const setIncludeProductVariant = (payload: any) => {
    actions.setIncludeProductVariant(payload)(dispatch);
  }

  const addProduct = (payload: any) => {
    actions.addProduct(payload, activePlatform)(dispatch);
  }

  const getProduct = (payload: any, signal: AbortSignal) => {
    actions.getProduct(payload, signal)(dispatch);
  }

  const clearProduct = (payload: any) => {
    actions.clearProduct(payload)(dispatch);
  }

  const updateProduct = (id: string, payload: any) => {
    actions.updateProduct(id, payload)(dispatch);
  }

  const addProductVariant = (id: string, payload: any) => {
    actions.addProductVariant(id, payload)(dispatch);
  }

  const updateProductVariant = (id: string, productId: string, payload: any) => {
    actions.updateProductVariant(id, productId, payload)(dispatch);
  }

  const uploadProductsExcelFile = (payload: any) => {
    actions.uploadProductsExcelFile(payload, userDetails._id, activePlatform)(dispatch);
  }

  const clearUploadProductsErrors = (payload: any) => {
    actions.clearUploadProductsErrors(payload)(dispatch);
  }

  const downloadProductPricingRevisionTemplate = () => {
    actions.downloadProductPricingRevisionTemplate(activePlatform)(dispatch);
  }

  const uploadProductsPricingTemplate = (payload: any) => {
    actions.uploadProductsPricingTemplate(payload, userDetails._id, activePlatform)(dispatch);
  }

  const clearUploadProductsPricingTemplateErrors = (payload: any) => {
    actions.clearUploadProductsPricingTemplateErrors(payload)(dispatch);
  }

  const getProductUploadLogs = (payload: any, signal: AbortSignal) => {
    actions.getProductUploadLogs(payload, activePlatform, signal)(dispatch);
  }

  const clearProductUploadLogs = (payload: any) => {
    actions.clearProductUploadLogs(payload)(dispatch);
  }

  const downloadProductUploadTemplate = () => {
    actions.downloadProductUploadTemplate(activePlatform)(dispatch);
  }

  return {
    state: state.product,
    getProducts,
    clearProducts,
    getProductTypes,
    getProductCategories,
    getProductBrands,
    getProductStatuses,
    setAddProductPayload,
    setIncludeProductVariant,
    addProduct,
    getProduct,
    clearProduct,
    updateProduct,
    addProductVariant,
    updateProductVariant,
    uploadProductsExcelFile,
    downloadProductPricingRevisionTemplate,
    uploadProductsPricingTemplate,
    clearUploadProductsPricingTemplateErrors,
    getProductUploadLogs,
    clearProductUploadLogs,
    clearUploadProductsErrors,
    downloadProductUploadTemplate,
  };
};
