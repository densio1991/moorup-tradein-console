/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionHeaderContainer,
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
import { AccordionHeading } from '.';

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

  useEffect(() => {
    if (promotionClaims) {
      setClaims(
        promotionClaims.filter(
          (claim: any) => claim.order_id?.order_number === order?.order_number,
        ),
      );
    }
  }, [promotionClaims]);

  return (
    !isFetchingPromotionClaims &&
    claims.length > 0 && (
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
        </AccordionContent>
      </>
    )
  );
};

export default ClaimsList;
