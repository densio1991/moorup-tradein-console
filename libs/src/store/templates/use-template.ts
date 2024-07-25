/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useTemplate = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
    token,
  } = state.auth;

  const getTemplates = (payload: any, signal: AbortSignal) => {
    actions.getTemplates(payload, activePlatform, signal)(dispatch, token);
  }

  const clearTemplates = (payload: any) => {
    actions.clearTemplates(payload)(dispatch);
  }

  const requestTemplateChange = (currentTemplateId: string, payload: any, type: string) => {
    actions.requestTemplateChange(currentTemplateId, payload, type, activePlatform)(dispatch, token);
  }

  const requestTemplatePreview = (payload: any) => {
    actions.requestTemplatePreview(payload)(dispatch, token);
  }

  const clearTemplatePreview = (payload: any) => {
    actions.clearTemplatePreview(payload)(dispatch);
  }

  const setActivePill = (payload: any) => {
    actions.setActivePill(payload)(dispatch);
  }

  const getTemplateApprovals = (payload: any, signal: AbortSignal) => {
    actions.getTemplateApprovals(payload, signal)(dispatch, token);
  }

  const clearTemplateApprovals = (payload: any) => {
    actions.clearTemplateApprovals(payload)(dispatch);
  }

  const getTemplateApprovalById = (payload: any, signal: AbortSignal) => {
    actions.getTemplateApprovalById(payload, signal)(dispatch, token);
  }

  const clearTemplateApproval = (payload: any) => {
    actions.clearTemplateApproval(payload)(dispatch);
  }

  const processTemplateApproval = (payload: any, approvalId: string) => {
    actions.processTemplateApproval(payload, approvalId)(dispatch, token);
  }

  return {
    state: state.template,
    getTemplates,
    clearTemplates,
    requestTemplateChange,
    requestTemplatePreview,
    clearTemplatePreview,
    setActivePill,
    getTemplateApprovals,
    clearTemplateApprovals,
    getTemplateApprovalById,
    clearTemplateApproval,
    processTemplateApproval,
  };
};
