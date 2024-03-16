/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DEFAULT_COLUMN,
  ORDER_MANAGEMENT_COLUMNS,
  Table,
  orderManagementParsingConfig,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function OrderManagementPage() {
  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const { state, fetchOrders, clearOrders } = useOrder();
  const { orders, isFetchingOrders } = state;

  const headers = [...DEFAULT_COLUMN, ...ORDER_MANAGEMENT_COLUMNS];

  const addViewUrlToOrders = (orders: any) => {
    return orders.map((order: any) => ({
      ...order,
      viewURL: `/dashboard/order/${order._id}`,
    }));
  };

  const ordersWithViewUrl = addViewUrlToOrders(orders || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      fetchOrders(signal);
    }

    return () => {
      controller.abort();
      // Clear data on unmount
      clearOrders();
    };
  }, [activePlatform]);

  return (
    <Table
      label="Orders"
      isLoading={isFetchingOrders}
      headers={headers}
      rows={ordersWithViewUrl || []}
      parsingConfig={orderManagementParsingConfig}
    />
  );
}
