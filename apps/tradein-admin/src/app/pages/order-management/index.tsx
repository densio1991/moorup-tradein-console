import { useEffect, useMemo } from 'react';
import {
  DEFAULT_COLUMN,
  ORDER_MANAGEMENT_COLUMNS,
  OrderInterface,
  Table,
  parseDateString,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';

export function OrderManagementPage() {
  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const { state, fetchOrders, clearOrders } = useOrder();
  const { orders = [], isFetchingOrders } = state;

  useEffect(() => {
    if (!isEmpty(activePlatform)) {
      fetchOrders();
    }

    return () => {
      // Clear data on unmount
      clearOrders();
    };
  }, [activePlatform]);

  const headers = [...DEFAULT_COLUMN, ...ORDER_MANAGEMENT_COLUMNS];

  const formattedRows = useMemo(() => {
    return orders?.map((order: OrderInterface) => {
      return {
        _id: order?._id,
        user_email: order?.user_id?.email,
        status: order?.status,
        payment_status: order?.payment?.payment_status,
        order_count: order?.order_items?.length,
        updated: parseDateString(order?.updatedAt),
        viewURL: `/dashboard/order/${order._id}`,
      };
    });
  }, [orders]);

  return (
    <Table
      label="Orders"
      isLoading={isFetchingOrders}
      headers={headers}
      rows={formattedRows || []}
    />
  );
}
