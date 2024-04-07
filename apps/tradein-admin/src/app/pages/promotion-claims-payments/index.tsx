/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADMIN,
  ClaimStatus,
  PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS,
  PageSubHeader,
  REGULAR,
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
    case REGULAR:
      headers.push({
        label: 'Action',
        order: 99,
        enableSort: false,
        keyName: '',
      });
      break;

    case ADMIN:
    case SUPERADMIN:
      headers.push({
        label: 'Moorup Status',
        order: 11,
        enableSort: true,
        keyName: 'moorup_status',
      });
      break;

    default:
      break;
  }

  const addActions = (claims: any) => {
    const filters = {
      status: ClaimStatus.APPROVED,
      moorup_status: ClaimStatus.APPROVED,
    };

    return claims.map((claim: any) => {
      return {
        ...claim,
        action: () => processPromotionClaimPayment({}, claim._id, filters),
      };
    });
  };

  const promotionClaimsWithActions = addActions(promotionClaims || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      const filters = {
        status: ClaimStatus.APPROVED,
        moorup_status: ClaimStatus.APPROVED,
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
