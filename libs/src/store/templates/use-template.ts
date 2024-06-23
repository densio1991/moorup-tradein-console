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

  const requestTemplateChange = (currentTemplateId: string, payload: any) => {
    actions.requestTemplateChange(currentTemplateId, payload, activePlatform)(dispatch);
  }

  const updateTemplate = (id: string, currentTemplateId: string, payload: any) => {
    actions.updateTemplate(id, currentTemplateId, activePlatform, payload)(dispatch);
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

  return {
    state: state.template,
    getTemplates,
    clearTemplates,
    requestTemplateChange,
    updateTemplate,
    requestTemplatePreview,
    clearTemplatePreview,
    setActivePill,
  };
};
