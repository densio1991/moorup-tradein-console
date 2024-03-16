/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  Table,
  promotionClaimsManagementParsingConfig,
  useAuth,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function PromotionClaimsPage() {
  const { state, getPromotionClaims, clearPromotionClaims } = usePromotion();
  const { state: authState } = useAuth();
  const { promotionClaims, isFetchingPromotionClaims } = state;
  const { activePlatform } = authState;

  const headers = [...PROMOTION_CLAIMS_MANAGEMENT_COLUMNS];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getPromotionClaims({}, signal);
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
      isLoading={isFetchingPromotionClaims}
      headers={headers}
      rows={promotionClaims || []}
      parsingConfig={promotionClaimsManagementParsingConfig}
    />
  );
}
