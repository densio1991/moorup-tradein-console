/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  DEFAULT_COLUMN,
  PROMOTIONS_MANAGEMENT_COLUMNS,
  Table,
  useAuth,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

export function PromotionsPage() {
  const { state, getPromotions, clearPromotions } = usePromotion();
  const { state: authState } = useAuth();
  const { promotions, isFetchingPromotions } = state.promotion;
  const { activePlatform } = authState.auth;
  const shouldRun = useRef(true);

  const headers = [...DEFAULT_COLUMN, ...PROMOTIONS_MANAGEMENT_COLUMNS];

  useEffect(() => {
    if (shouldRun.current && !isEmpty(activePlatform)) {
      getPromotions({});
      shouldRun.current = false;
    }

    return () => {
      // Clear data on unmount
      clearPromotions({});
    };
  }, [activePlatform]);

  return (
    <Table
      label="Promotions"
      isLoading={isFetchingPromotions}
      headers={headers}
      rows={promotions || []}
      rightControls={
        <AppButton width="fit-content" icon={faPlus}>
          Add
        </AppButton>
      }
    />
  );
}
