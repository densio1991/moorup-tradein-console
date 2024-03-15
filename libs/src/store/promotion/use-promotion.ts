/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const usePromotion = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getPromotions = (payload: any, signal: AbortSignal) => {
    actions.getPromotions(payload, activePlatform, signal)(dispatch);
  }

  const clearPromotions = (payload: any) => {
    actions.clearPromotions(payload)(dispatch);
  }

  const createPromotion = (payload: any) => {
    actions.createPromotion(payload, activePlatform)(dispatch);
  }

  const setAddPromotionDetailsPayload = (payload: any) => {
    actions.setAddPromotionDetailsPayload(payload)(dispatch);
  }

  const setAddPromotionClaimsPayload = (payload: any) => {
    actions.setAddPromotionClaimsPayload(payload)(dispatch);
  }

  const setAddPromotionStepsPayload = (payload: any) => {
    actions.setAddPromotionStepsPayload(payload)(dispatch);
  }

  const setAddPromotionConditionPayload = (payload: any) => {
    actions.setAddPromotionConditionPayload(payload)(dispatch);
  }

  const setAddPromotionEligibilityAndFaqsPayload = (payload: any) => {
    actions.setAddPromotionEligibilityAndFaqsPayload(payload)(dispatch);
  }

  return {
    state: state.promotion,
    getPromotions,
    clearPromotions,
    createPromotion,
    setAddPromotionDetailsPayload,
    setAddPromotionClaimsPayload,
    setAddPromotionStepsPayload,
    setAddPromotionConditionPayload,
    setAddPromotionEligibilityAndFaqsPayload,
  };
};
