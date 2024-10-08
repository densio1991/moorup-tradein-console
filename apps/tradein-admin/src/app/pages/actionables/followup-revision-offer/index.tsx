/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  CenterModal,
  Loader,
  openInNewTab,
  OrderItemStatus,
  PageSubHeader,
  Table,
  REVISED_DEVICES_MANAGEMENT_COLUMNS,
  revisedDevicesManagementParsingConfig,
  useAuth,
  useCommon,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { FollowUpRevisionOfferModal } from './modal-content';

export function FollowUpRevisionOfferPage() {
  const {
    state,
    fetchOrderFollowups,
    clearOrder,
    clearOrders,
    setActiveOrder,
  } = useOrder();
  const { orders, order, isFetchingOrderFollowups } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { setSearchTerm } = useCommon();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const headers = REVISED_DEVICES_MANAGEMENT_COLUMNS;

  const getOrdersForFollowup = (signal?: any) => {
    const filters = {
      is_recycled: false,
      order_item_status: 'for-revision',
      platform: activePlatform,
    };
    fetchOrderFollowups(filters, signal);
  };

  const handleRowClick = (row: any) => {
    setIsModalOpen(true);
    setActiveOrder(row);
    setSelectedRow(row);
  };

  const hasUnsentOrderItems = (orderItems: any[]) => {
    return orderItems?.some(
      (item: any) => item?.status === OrderItemStatus.FOR_REVISION,
    );
  };

  useEffect(() => {
    if (order && hasUnsentOrderItems(order?.order_items)) {
      setSelectedRow(order);
    } else {
      if (!isEmpty(selectedRow)) {
        getOrdersForFollowup();
        setSelectedRow({});
      } else {
        setIsModalOpen(false);
      }
    }
  }, [order]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getOrdersForFollowup(signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearOrder();
      clearOrders();
      setSearchTerm('');
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
        label="Follow-Up Revision Offer"
        isLoading={isFetchingOrderFollowups}
        headers={headers}
        rows={filteredOrders || []}
        parsingConfig={revisedDevicesManagementParsingConfig}
        onRowClick={handleRowClick}
      />
      <CenterModal
        title={
          <h4
            className="text-lg cursor-pointer hover:text-emerald-800"
            onClick={() => openInNewTab(`/dashboard/order/${selectedRow?._id}`)}
          >
            {selectedRow?.order_number || 'Loading...'}
          </h4>
        }
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRow({});
        }}
      >
        <div className="pb-5">
          {isModalOpen && isEmpty(selectedRow) ? (
            <div className="py-8">
              <Loader />
            </div>
          ) : (
            <FollowUpRevisionOfferModal order={selectedRow} />
          )}
        </div>
      </CenterModal>
    </>
  );
}
