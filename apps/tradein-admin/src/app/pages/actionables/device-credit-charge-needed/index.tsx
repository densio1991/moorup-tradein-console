/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONABLES_DEVICE_CREDIT_CHARGE_NEEDED,
  ACTIONS_COLUMN,
  OrderItemStatus,
  PageSubHeader,
  PaymentStatus,
  Table,
  actionablesDeviceCreditChargeNeededParsingConfig,
  useAuth,
  useCommon,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function DeviceCreditChargeNeededPage() {
  const {
    state: orderState,
    getOrderItems,
    clearOrderItems,
    updateOrderItemsPaymentStatus,
  } = useOrder();
  const { isFetchingOrderItems, orderItems, isUpdatingOrderItemPaymentStatus } =
    orderState;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const { setSearchTerm } = useCommon();

  const headers = [
    ...ACTIONABLES_DEVICE_CREDIT_CHARGE_NEEDED,
    ...ACTIONS_COLUMN,
  ];

  const addActions = (orderItems: any) => {
    const filters = {
      status: [OrderItemStatus.FOR_RETURN, OrderItemStatus.FOR_RECYCLE]?.join(
        ',',
      ),
      payment_status: [PaymentStatus.PENDING, PaymentStatus.FAILED]?.join(','),
    };

    return orderItems.map((orderItem: any) => ({
      ...orderItem,
      chargedAction: () =>
        updateOrderItemsPaymentStatus(
          orderItem?.order_items?._id,
          {
            payment_status: 'charged',
            admin_id: userDetails?._id,
          },
          filters,
        ),
      failedAction: () =>
        updateOrderItemsPaymentStatus(
          orderItem?.order_items?._id,
          {
            payment_status: PaymentStatus.FAILED,
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
        status: [OrderItemStatus.FOR_RETURN, OrderItemStatus.FOR_RECYCLE]?.join(
          ',',
        ),
        payment_status: [PaymentStatus.PENDING, PaymentStatus.FAILED]?.join(
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
        label="Payment Action Needed"
        isLoading={isFetchingOrderItems || isUpdatingOrderItemPaymentStatus}
        headers={headers}
        rows={formattedOrderItems || []}
        parsingConfig={actionablesDeviceCreditChargeNeededParsingConfig}
      />
    </>
  );
}
