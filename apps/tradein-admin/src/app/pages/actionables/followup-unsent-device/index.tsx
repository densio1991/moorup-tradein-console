/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  CenterModal,
  openInNewTab,
  OrderItemStatus,
  PageSubHeader,
  Table,
  UNSENT_DEVICES_MANAGEMENT_COLUMNS,
  unsentDevicesManagementParsingConfig,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { FollowUpUnsentDeviceModal } from './modal-content';

export function FollowUpUnsentDevicePage() {
  const { state, fetchOrders, clearOrder, clearOrders, setActiveOrder } =
    useOrder();
  const { orders, order, isFetchingOrders } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const [selectedRow, setSelectedRow] = useState<any>({});

  const headers = UNSENT_DEVICES_MANAGEMENT_COLUMNS;

  const handleRowClick = (row: any) => {
    setActiveOrder(row);
    setSelectedRow(row);
  };

  const hasUnsentOrderItems = (orderItems: any[]) => {
    return orderItems?.some(
      (item: any) => item?.status === OrderItemStatus.CREATED,
    );
  };

  useEffect(() => {
    if (order && hasUnsentOrderItems(order?.order_items)) {
      setSelectedRow(order);
    } else {
      if (!isEmpty(selectedRow)) {
        const controller = new AbortController();
        const signal = controller.signal;
        fetchOrders(signal);
        setSelectedRow({});
      }
    }
  }, [order]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      fetchOrders(signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearOrder();
      clearOrders();
    };
  }, [activePlatform]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) =>
      hasUnsentOrderItems(order?.order_items),
    );
  }, [orders]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Followup - Unsent Devices"
        isLoading={isFetchingOrders}
        headers={headers}
        rows={filteredOrders || []}
        parsingConfig={unsentDevicesManagementParsingConfig}
        onRowClick={handleRowClick}
      />
      <CenterModal
        title={
          <h4
            className="text-lg cursor-pointer hover:text-emerald-800"
            onClick={() => openInNewTab(`/dashboard/order/${selectedRow?._id}`)}
          >
            {selectedRow?.order_number}
          </h4>
        }
        isOpen={!isEmpty(selectedRow)}
        onClose={() => {
          setSelectedRow({});
        }}
      >
        <div className="pb-5">
          <FollowUpUnsentDeviceModal order={selectedRow} />
        </div>
      </CenterModal>
    </>
  );
}
