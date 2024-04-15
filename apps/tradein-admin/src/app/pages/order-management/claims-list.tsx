import React, { useEffect } from 'react';
import {
  ClaimStatus,
  OrderInterface,
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  promotionClaimsManagementParsingConfig,
  REGULAR,
  Table,
  useAuth,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';

type ClaimsListProps = {
  order: OrderInterface;
};

const ClaimsList = ({ order }: ClaimsListProps) => {
  const { state, getPromotionClaims, clearPromotionClaims } = usePromotion();
  const {
    promotionClaims,
    isFetchingPromotionClaims,
    isUpdatingPromotionClaimMoorupStatus,
    isUpdatingPromotionClaimStatus,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const headers = [...PROMOTION_CLAIMS_MANAGEMENT_COLUMNS];

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

  return (
    <Table
      label="Promotion Claims"
      margin="0px"
      isLoading={
        isFetchingPromotionClaims ||
        isUpdatingPromotionClaimMoorupStatus ||
        isUpdatingPromotionClaimStatus
      }
      headers={headers}
      rows={promotionClaims || []}
      parsingConfig={promotionClaimsManagementParsingConfig}
    />
  );
};

export default ClaimsList;
