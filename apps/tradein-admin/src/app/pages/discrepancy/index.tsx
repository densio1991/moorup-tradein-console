/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DEFAULT_COLUMN,
  DISCREPANCY_MANAGEMENT_COLUMNS,
  PRODUCT_TYPES,
  Table,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function DiscrepancyPage() {
  const { state, getOrderItems, clearOrderItems } = useOrder();
  const { state: authState } = useAuth();
  const { orderItems, isFetchingOrderItems } = state;
  const { activePlatform } = authState;

  const headers = [...DEFAULT_COLUMN, ...DISCREPANCY_MANAGEMENT_COLUMNS];

  useEffect(() => {
    const filters = {
      status: 'revised',
      product_type: [
        PRODUCT_TYPES.LAPTOPS,
        PRODUCT_TYPES.TABLETS,
        PRODUCT_TYPES.PHONES,
        PRODUCT_TYPES.WATCHES,
      ].join(','),
    };

    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getOrderItems(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearOrderItems({});
    };
  }, [activePlatform]);

  return (
    <Table
      label="Discrepancy"
      isLoading={isFetchingOrderItems}
      headers={headers}
      rows={orderItems || []}
    />
  );
}
