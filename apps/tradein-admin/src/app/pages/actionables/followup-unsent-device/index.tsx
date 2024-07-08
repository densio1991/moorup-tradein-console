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
  const { state, fetchOrders, clearOrders } = useOrder();
  const { orders, isFetchingOrders } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const [activeOrder, setActiveOrder] = useState<any>({});

  const headers = UNSENT_DEVICES_MANAGEMENT_COLUMNS;

  const handleRowClick = (row: any) => {
    console.log(row);
    setActiveOrder(row);
  };

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

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) =>
      order.order_items?.some(
        (item: any) => item?.status === OrderItemStatus.CREATED,
      ),
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
            onClick={() => openInNewTab(`/dashboard/order/${activeOrder?._id}`)}
          >
            {activeOrder?.order_number}
          </h4>
        }
        isOpen={!isEmpty(activeOrder)}
        onClose={() => {
          setActiveOrder({});
        }}
      >
        <div className="pb-5">
          <FollowUpUnsentDeviceModal order={activeOrder} />
        </div>
      </CenterModal>
    </>
  );
}
