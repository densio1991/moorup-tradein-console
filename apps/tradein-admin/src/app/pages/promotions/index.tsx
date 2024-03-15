/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ADD_PROMOTION_CLAIMS_PAYLOAD,
  ADD_PROMOTION_CONDITIONS_PAYLOAD,
  ADD_PROMOTION_DETAILS_PAYLOAD,
  ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
  ADD_PROMOTION_STEPS_PAYLOAD,
  AppButton,
  CenterModal,
  DEFAULT_COLUMN,
  MODAL_TYPES,
  PROMOTIONS_MANAGEMENT_COLUMNS,
  SideModal,
  Table,
  promotionsManagementParsingConfig,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { AddPromotionForm } from './add-promotion';
import { AddPromotionClaimsForm } from './add-promotion-claims';
import { AddPromotionConditionsForm } from './add-promotion-condition';
import { AddPromotionEligibilityAndFaqsForm } from './add-promotion-eligibility-and-faqs';
import { AddPromotionStepsForm } from './add-promotion-steps';
import { PromotionPreview } from './preview-content';

export function PromotionsPage() {
  const {
    state,
    getPromotions,
    clearPromotions,
    setAddPromotionDetailsPayload,
    setAddPromotionClaimsPayload,
    setAddPromotionConditionPayload,
    setAddPromotionStepsPayload,
    setAddPromotionEligibilityAndFaqsPayload,
  } = usePromotion();
  const { state: authState } = useAuth();
  const { promotions, isFetchingPromotions, isAddingPromotion } = state;
  const { activePlatform } = authState;
  const {
    state: commonState,
    setSideModalState,
    setCenterModalState,
  } = useCommon();
  const { sideModalState, centerModalState } = commonState;

  const headers = [...DEFAULT_COLUMN, ...PROMOTIONS_MANAGEMENT_COLUMNS];

  const steps = [
    MODAL_TYPES.ADD_PROMOTION,
    MODAL_TYPES.ADD_PROMOTION_CLAIMS,
    MODAL_TYPES.ADD_PROMOTION_STEPS,
    MODAL_TYPES.ADD_PROMOTION_CONDITION,
    MODAL_TYPES.ADD_PROMOTION_ELIGIBILITY_AND_FAQS,
  ];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getPromotions({}, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotions({});
    };
  }, [activePlatform]);

  const renderForm = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.ADD_PROMOTION:
        return <AddPromotionForm />;

      case MODAL_TYPES.ADD_PROMOTION_CLAIMS:
        return <AddPromotionClaimsForm />;

      case MODAL_TYPES.ADD_PROMOTION_STEPS:
        return <AddPromotionStepsForm />;

      case MODAL_TYPES.ADD_PROMOTION_CONDITION:
        return <AddPromotionConditionsForm />;

      case MODAL_TYPES.ADD_PROMOTION_ELIGIBILITY_AND_FAQS:
        return <AddPromotionEligibilityAndFaqsForm />;

      default:
        break;
    }
  };

  return (
    <>
      <Table
        label="Promotions"
        isLoading={isFetchingPromotions || isAddingPromotion}
        headers={headers}
        rows={promotions || []}
        parsingConfig={promotionsManagementParsingConfig}
        rightControls={
          <AppButton
            width="fit-content"
            icon={faPlus}
            onClick={() =>
              setSideModalState({
                ...sideModalState,
                open: true,
                view: MODAL_TYPES.ADD_PROMOTION,
              })
            }
          >
            Add
          </AppButton>
        }
      />
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          setSideModalState({
            ...sideModalState,
            open: false,
            view: null,
          });

          // Clear forms on modal close
          setAddPromotionDetailsPayload(ADD_PROMOTION_DETAILS_PAYLOAD);
          setAddPromotionClaimsPayload(ADD_PROMOTION_CLAIMS_PAYLOAD);
          setAddPromotionStepsPayload(ADD_PROMOTION_STEPS_PAYLOAD);
          setAddPromotionConditionPayload(ADD_PROMOTION_CONDITIONS_PAYLOAD);
          setAddPromotionEligibilityAndFaqsPayload(
            ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD,
          );
        }}
        withSteps
        steps={steps}
        activeStep={sideModalState.view}
      >
        {renderForm()}
      </SideModal>

      <CenterModal
        isOpen={centerModalState?.open}
        onClose={() => {
          setCenterModalState({
            ...centerModalState,
            open: false,
            view: null,
          });
        }}
      >
        <PromotionPreview />
      </CenterModal>
    </>
  );
}
