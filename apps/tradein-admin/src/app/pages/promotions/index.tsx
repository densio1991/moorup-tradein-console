/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  DEFAULT_COLUMN,
  PROMOTIONS_MANAGEMENT_COLUMNS,
  Table,
  capitalizeFirstLetter,
  parseDateString,
  useAuth,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';

export function PromotionsPage() {
  const { state, getPromotions, clearPromotions } = usePromotion();
  const { state: authState } = useAuth();
  const { promotions, isFetchingPromotions } = state;
  const { activePlatform } = authState;

  const headers = [...DEFAULT_COLUMN, ...PROMOTIONS_MANAGEMENT_COLUMNS];

  useEffect(() => {
    if (!isEmpty(activePlatform)) {
      getPromotions({});
    }

    return () => {
      // Clear data on unmount
      clearPromotions({});
    };
  }, [activePlatform]);

  const formattedRows = useMemo(() => {
    return promotions.map((row) => {
      const productNames = Array.isArray(row?.products)
        ? row.products.map((product: { name: any }) => product.name)
        : [];
      const concatenatedNames = productNames.join(', ');

      return {
        _id: row?._id,
        name: !isEmpty(row?.name) ? capitalizeFirstLetter(row?.name) : '--',
        products: concatenatedNames,
        start_date: !isEmpty(row?.start_date)
          ? parseDateString(row?.start_date)
          : '--',
        end_date: !isEmpty(row?.end_date)
          ? parseDateString(row?.end_date)
          : '--',
        status: !isEmpty(row?.status)
          ? capitalizeFirstLetter(row?.status)
          : '--',
      };
    });
  }, [promotions]);

  return (
    <Table
      label="Promotions"
      isLoading={isFetchingPromotions}
      headers={headers}
      rows={formattedRows || []}
      rightControls={
        <AppButton width="fit-content" icon={faPlus}>
          Add
        </AppButton>
      }
    />
  );
}
