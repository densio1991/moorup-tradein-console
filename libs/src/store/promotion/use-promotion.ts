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

  return {
    state: state.promotion,
    getPromotions,
    clearPromotions,
  };
};
