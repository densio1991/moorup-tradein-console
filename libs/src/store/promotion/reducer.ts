/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_PROMOTION_CLAIMS_PAYLOAD,
  ADD_PROMOTION_CONDITIONS_PAYLOAD,
  ADD_PROMOTION_DETAILS_PAYLOAD,
  ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
  ADD_PROMOTION_STEPS_PAYLOAD
} from '../../constants';
import * as types from './action-types';

const promotionState = {
  promotions: [],
  isFetchingPromotions: true,
  isAddingPromotion: false,
  addPromotionDetailsPayload: ADD_PROMOTION_DETAILS_PAYLOAD,
  addPromotionClaimsPayload: ADD_PROMOTION_CLAIMS_PAYLOAD,
  addPromotionStepsPayload: ADD_PROMOTION_STEPS_PAYLOAD,
  addPromotionConditionPayload: ADD_PROMOTION_CONDITIONS_PAYLOAD,
  addPromotionEligibilityAndFaqsPayload: ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
  promotionClaims: [],
  isFetchingPromotionClaims: true,
};

const promotionReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.FETCH_PROMOTIONS.baseType: {
      return {
        ...state,
        isFetchingPromotions: true,
        promotions: [],
      };
    }
    case types.FETCH_PROMOTIONS.SUCCESS: {
      return {
        ...state,
        isFetchingPromotions: false,
        promotions: action.payload?.data,
      };
    }
    case types.FETCH_PROMOTIONS.FAILED: {
      return {
        ...state,
        isFetchingPromotions: false,
        promotions: [],
      };
    }
    case types.FETCH_PROMOTIONS.CANCELLED: {
      return {
        ...state,
        isFetchingPromotions: true,
        promotions: [],
      };
    }

    case types.CLEAR_PROMOTIONS:
      return {
        ...state,
        isFetchingPromotions: true,
        promotions: [],
      };

    case types.CREATE_PROMOTION.baseType: {
      return {
        ...state,
        isAddingPromotion: true,
      };
    }
    case types.CREATE_PROMOTION.SUCCESS: {
      return {
        ...state,
        isAddingPromotion: false,
      };
    }
    case types.CREATE_PROMOTION.FAILED: {
      return {
        ...state,
        isAddingPromotion: false,
      };
    }

    case types.SET_ADD_PROMOTION_DETAILS_PAYLOAD:
      return {
        ...state,
        addPromotionDetailsPayload: action.payload,
      };

    case types.SET_ADD_PROMOTION_CLAIMS_PAYLOAD:
      return {
        ...state,
        addPromotionClaimsPayload: action.payload,
      };

    case types.SET_ADD_PROMOTION_STEPS_PAYLOAD:
      return {
        ...state,
        addPromotionStepsPayload: action.payload,
      };

    case types.SET_ADD_PROMOTION_CONDITION_PAYLOAD:
      return {
        ...state,
        addPromotionConditionPayload: action.payload,
      };

    case types.SET_ADD_PROMOTION_ELIGIBILITY_AND_FAQS:
      return {
        ...state,
        addPromotionEligibilityAndFaqsPayload: action.payload,
      };

    case types.FETCH_PROMOTION_CLAIMS.baseType: {
      return {
        ...state,
        isFetchingPromotionClaims: true,
        promotionClaims: [],
      };
    }
    case types.FETCH_PROMOTION_CLAIMS.SUCCESS: {
      return {
        ...state,
        isFetchingPromotionClaims: false,
        promotionClaims: action.payload?.data,
      };
    }
    case types.FETCH_PROMOTION_CLAIMS.FAILED: {
      return {
        ...state,
        isFetchingPromotionClaims: false,
        promotionClaims: [],
      };
    }
    case types.FETCH_PROMOTION_CLAIMS.CANCELLED: {
      return {
        ...state,
        isFetchingPromotionClaims: true,
        promotionClaims: [],
      };
    }

    default:
      return state;
  }
};

export { promotionReducer, promotionState };
