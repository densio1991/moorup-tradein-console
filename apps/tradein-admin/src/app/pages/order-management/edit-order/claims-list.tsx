/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionHeaderContainer,
  ClaimStatus,
  MODAL_TYPES,
  OrderInterface,
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  promotionClaimsManagementParsingConfig,
  REGULAR,
  SideModal,
  Table,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { AccordionHeading } from '.';
import { AddOrderPromotionClaimForm } from './forms/add-claims';

type ClaimsListProps = {
  order: OrderInterface;
  onToggle: any;
  isOpen: boolean;
};

const ClaimsList = ({ order, isOpen, onToggle }: ClaimsListProps) => {
  const { state, getPromotionClaims, clearPromotionClaims } = usePromotion();
  const {
    promotionClaims,
    isFetchingPromotionClaims,
    isUpdatingPromotionClaimMoorupStatus,
    isUpdatingPromotionClaimStatus,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const [claims, setClaims] = useState([]);
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const headers = [...PROMOTION_CLAIMS_MANAGEMENT_COLUMNS];

  const handleAddClaim = () => {
    setSideModalState({
      ...sideModalState,
      open: true,
      view: MODAL_TYPES.ADD_ORDER_PROMOTION_CLAIM,
    });
  };

  const handleSubmitClaim = (values) => {
    console.log({values});
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      if (userDetails?.role === REGULAR) {
        const filters = {
          status: ClaimStatus.PENDING,
          moorup_status: ClaimStatus.APPROVED,
          include_all: true,
        };

        getPromotionClaims(filters, signal);
      } else {
        getPromotionClaims({ include_all: true }, signal);
      }
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotionClaims({});
    };
  }, [activePlatform]);

  useEffect(() => {
    if (promotionClaims) {
      setClaims(
        promotionClaims.filter(
          (claim: any) => claim.order_id?.order_number === order?.order_number,
        ),
      );
    }
  }, [promotionClaims]);

  const renderForm = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.ADD_ORDER_PROMOTION_CLAIM:
        return <AddOrderPromotionClaimForm onFormSubmit={handleSubmitClaim}/>;

      default:
        break;
    }
  };

  return (
    <>
      <AccordionHeaderContainer>
        <AccordionHeading
          id="claims"
          title="Claims"
          isOpen={isOpen}
          onToggle={onToggle}
        />
      </AccordionHeaderContainer>
      <AccordionContent isOpen={isOpen} key="Claims List">
        <div className="flex justify-end mb-2">
          <button
            className="text-md text-white bg-emerald-600 py-1 px-3 rounded-md hover:bg-emerald-700"
            onClick={handleAddClaim}
          >
            Add Claim
          </button>
        </div>
        {isFetchingPromotionClaims ? (
          <h6 className="text-center text-gray-500 mb-2">Loading...</h6>
        ) : claims.length > 0 ? (
          <Table
            label="Promotion Claims"
            margin="8px 0"
            isLoading={
              isFetchingPromotionClaims ||
              isUpdatingPromotionClaimMoorupStatus ||
              isUpdatingPromotionClaimStatus
            }
            headers={headers}
            rows={claims || []}
            parsingConfig={promotionClaimsManagementParsingConfig}
          />
        ) : (
          <h6 className="text-center text-gray-500 mb-2">
            No Promotion Claims
          </h6>
        )}
      </AccordionContent>
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          setSideModalState({
            ...sideModalState,
            open: false,
            view: null,
          });
        }}
      >
        {renderForm()}
      </SideModal>
    </>
  );
};

export default ClaimsList;