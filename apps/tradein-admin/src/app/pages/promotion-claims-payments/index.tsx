/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADMIN,
  ClaimStatus,
  PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS,
  PageSubHeader,
  SUPERADMIN,
  Table,
  promotionClaimsPaymentManagementParsingConfig,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function PromotionClaimsPaymentPage() {
  const {
    state,
    getPromotionClaims,
    clearPromotionClaims,
    processPromotionClaimPayment,
  } = usePromotion();
  const {
    promotionClaims,
    isFetchingPromotionClaims,
    isProcessingPromotionClaimPayment,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const { setSearchTerm } = useCommon();

  const headers = [...PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS];

  switch (userDetails.role) {
    case ADMIN:
    case SUPERADMIN:
      headers.push({
        label: 'Moorup Status',
        order: 11,
        enableSort: true,
        keyName: 'moorup_status',
      });

      headers.push({
        label: 'Action',
        order: 99,
        enableSort: false,
        keyName: '',
      });
      break;

    default:
      break;
  }

  const addActions = (claims: any) => {
    const filters = {
      status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
      moorup_status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
    };

    return claims.map((claim: any) => {
      return {
        ...claim,
        action: () =>
          processPromotionClaimPayment({ claimId: claim._id }, filters),
      };
    });
  };

  const promotionClaimsWithActions = addActions(promotionClaims || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      const filters = {
        status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
        moorup_status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
      };

      getPromotionClaims(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotionClaims({});
      setSearchTerm('');
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Claims Payment"
        isLoading={
          isFetchingPromotionClaims || isProcessingPromotionClaimPayment
        }
        headers={headers}
        rows={promotionClaimsWithActions || []}
        parsingConfig={promotionClaimsPaymentManagementParsingConfig}
      />
    </>
  );
}
