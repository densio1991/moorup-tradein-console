/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONABLES_DEVICES_FOR_RECYCLE_COLUMNS,
  ACTIONS_COLUMN,
  OrderItemStatus,
  PageSubHeader,
  PaymentStatus,
  Table,
  actionablesDevicesForRecycleParsingConfig,
  useAuth,
  useCommon,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function DevicesForRecyclePage() {
  const {
    state: orderState,
    getOrderItems,
    clearOrderItems,
    updateOrderItemsStatus,
  } = useOrder();
  const { isFetchingOrderItems, orderItems, isUpdatingOrderItem } = orderState;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const { setSearchTerm } = useCommon();

  const headers = [
    ...ACTIONABLES_DEVICES_FOR_RECYCLE_COLUMNS,
    ...ACTIONS_COLUMN,
  ];

  const addActions = (orderItems: any) => {
    const filters = {
      status: [OrderItemStatus.FOR_RECYCLE]?.join(','),
      payment_status: [PaymentStatus.CHARGED, PaymentStatus.CANCELLED]?.join(
        ',',
      ),
    };

    return orderItems.map((orderItem: any) => ({
      ...orderItem,
      recycleAction: () =>
        updateOrderItemsStatus(
          orderItem?.order_items?._id,
          {
            status: OrderItemStatus.RECYCLED,
            admin_id: userDetails?._id,
          },
          filters,
        ),
    }));
  };

  const formattedOrderItems = addActions(orderItems || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      const filters = {
        status: [OrderItemStatus.FOR_RECYCLE]?.join(','),
        payment_status: [PaymentStatus.CHARGED, PaymentStatus.CANCELLED]?.join(
          ',',
        ),
      };

      getOrderItems(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      setSearchTerm('');
      clearOrderItems([]);
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Devices For Recycle"
        isLoading={isFetchingOrderItems || isUpdatingOrderItem}
        headers={headers}
        rows={formattedOrderItems || []}
        parsingConfig={actionablesDevicesForRecycleParsingConfig}
      />
    </>
  );
}
