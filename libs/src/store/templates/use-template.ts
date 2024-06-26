/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useTemplate = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getTemplates = (payload: any, signal: AbortSignal) => {
    actions.getTemplates(payload, activePlatform, signal)(dispatch);
  }

  const clearTemplates = (payload: any) => {
    actions.clearTemplates(payload)(dispatch);
  }

  const requestTemplateChange = (currentTemplateId: string, payload: any, type: string) => {
    actions.requestTemplateChange(currentTemplateId, payload, type, activePlatform)(dispatch);
  }

  const requestTemplatePreview = (payload: any) => {
    actions.requestTemplatePreview(payload)(dispatch);
  }

  const clearTemplatePreview = (payload: any) => {
    actions.clearTemplatePreview(payload)(dispatch);
  }

  const setActivePill = (payload: any) => {
    actions.setActivePill(payload)(dispatch);
  }

  const getTemplateApprovals = (payload: any, signal: AbortSignal) => {
    actions.getTemplateApprovals(payload, signal)(dispatch);
  }

  const clearTemplateApprovals = (payload: any) => {
    actions.clearTemplateApprovals(payload)(dispatch);
  }

  const getTemplateApprovalById = (payload: any, signal: AbortSignal) => {
    actions.getTemplateApprovalById(payload, signal)(dispatch);
  }

  const clearTemplateApproval = (payload: any) => {
    actions.clearTemplateApproval(payload)(dispatch);
  }

  const processTemplateApproval = (payload: any, approvalId: string) => {
    actions.processTemplateApproval(payload, approvalId)(dispatch);
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
