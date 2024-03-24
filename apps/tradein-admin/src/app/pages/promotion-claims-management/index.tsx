/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  PageSubHeader,
  Table,
  promotionClaimsManagementParsingConfig,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function PromotionClaimsPage() {
  const { state, getPromotionClaims, clearPromotionClaims } = usePromotion();
  const { promotionClaims, isFetchingPromotionClaims } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { setSearchTerm } = useCommon();

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
      setSearchTerm('');
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Promotion Claims"
        isLoading={isFetchingPromotionClaims}
        headers={headers}
        rows={promotionClaims || []}
        parsingConfig={promotionClaimsManagementParsingConfig}
      />
    </>
  );
}
