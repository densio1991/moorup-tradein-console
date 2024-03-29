/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  ADMIN,
  AppButton,
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  PageSubHeader,
  REGULAR,
  SUPERADMIN,
  Table,
  exportPromotionClaims,
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
  const { activePlatform, userDetails } = authState;
  const { setSearchTerm } = useCommon();

  const headers = [
    ...PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
    // {
    //   label: 'Action',
    //   order: 98,
    //   enableSort: false,
    //   keyName: '',
    // },
  ];

  switch (userDetails.role) {
    case REGULAR:
      headers.push({
        label: 'Claim Status',
        order: 9,
        enableSort: true,
        keyName: 'status',
      });
      break;

    case ADMIN:
    case SUPERADMIN:
      headers.push({
        label: 'Moorup Status',
        order: 8,
        enableSort: true,
        keyName: 'moorup_status',
      });
      break;

    default:
      break;
  }

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
      <PageSubHeader
        withSearch
        leftControls={
          <AppButton
            width="fit-content"
            icon={faDownload}
            onClick={() => exportPromotionClaims(promotionClaims)}
            disabled={isEmpty(promotionClaims)}
          >
            Export
          </AppButton>
        }
      />
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
