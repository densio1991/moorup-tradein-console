/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONABLES_MANAGEMENT_COLUMNS,
  ACTIONS_COLUMN,
  OrderItemStatus,
  PageSubHeader,
  Table,
  actionablesManagementParsingConfig,
  useAuth,
  useOrder,
  usePermission,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function ActionablesPage() {
  const { hasPrintLabelPermission } = usePermission();
  const {
    state,
    getOrderItems,
    clearOrderItems,
    printLabels,
    printOutboundLabel,
    updateOrderItemsStatus,
  } = useOrder();
  const { state: authState } = useAuth();
  const { orderItems, isFetchingOrderItems } = state;
  const { activePlatform } = authState;

  const headers = [
    ...ACTIONABLES_MANAGEMENT_COLUMNS,
    ...(hasPrintLabelPermission ? ACTIONS_COLUMN : []),
  ];

  const addPrintLabelAction = (orderItems: any) => {
    return orderItems.map((orderItem: any) => ({
      ...orderItem,
      printLabelAction: () =>
        printLabels({ item_id: orderItem?.order_items?._id }),
      returnDeviceAction: () => {
        toast.info('Make sure to Download or Save a copy on your device.', {
          onClose: () => {
            printOutboundLabel({ item_id: orderItem?.order_items?._id });
            updateOrderItemsStatus(
              orderItem?.order_items?._id,
              OrderItemStatus.DEVICE_RETURED,
            );
          },
        });
      },
    }));
  };

  const formattedOrderItems = addPrintLabelAction(orderItems || []);

  useEffect(() => {
    const filters = {
      status: [
        OrderItemStatus.CREATED,
        OrderItemStatus.REVISION_REJECTED,
      ]?.join(','),
      // product_type: [PRODUCT_TYPES.LAPTOPS, PRODUCT_TYPES.TABLETS]?.join(','),
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
