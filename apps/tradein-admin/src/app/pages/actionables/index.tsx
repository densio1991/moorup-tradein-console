/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONABLES_MANAGEMENT_COLUMNS,
  ACTIONS_COLUMN,
  OrderStatus,
  PRODUCT_TYPES,
  PageSubHeader,
  Table,
  actionablesManagementParsingConfig,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function ActionablesPage() {
  const { state, getOrderItems, clearOrderItems, generateLabels } = useOrder();
  const { state: authState } = useAuth();
  const { orderItems, isFetchingOrderItems } = state;
  const { activePlatform } = authState;

  const headers = [...ACTIONABLES_MANAGEMENT_COLUMNS, ...ACTIONS_COLUMN];

  const addPrintLabelAction = (orderItems: any) => {
    return orderItems.map((orderItem: any) => ({
      ...orderItem,
      action: () =>
        generateLabels({ item_id: orderItem?.order_items?._id }, true),
    }));
  };

  const formattedOrderItems = addPrintLabelAction(orderItems || []);

  useEffect(() => {
    const filters = {
      status: OrderStatus.CREATED,
      product_type: [PRODUCT_TYPES.LAPTOPS, PRODUCT_TYPES.TABLETS]?.join(','),
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
    <>
      <PageSubHeader withSearch />
      <Table
        label="Actionables"
        isLoading={isFetchingOrderItems}
        headers={headers}
        rows={formattedOrderItems || []}
        parsingConfig={actionablesManagementParsingConfig}
      />
    </>
  );
}
