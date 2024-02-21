/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  DEFAULT_COLUMN,
  PROMOTIONS_MANAGEMENT_COLUMNS,
  Table,
  useAuth,
  useCustomEffect,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';

export function PromotionsPage() {
  const { state, getPromotions, clearPromotions } = usePromotion();
  const { state: authState } = useAuth();
  const { promotions, isFetchingPromotions } = state;
  const { activePlatform } = authState;

  const headers = [...DEFAULT_COLUMN, ...PROMOTIONS_MANAGEMENT_COLUMNS];

  useCustomEffect(() => {
    if (!isEmpty(activePlatform)) {
      getPromotions({});
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
