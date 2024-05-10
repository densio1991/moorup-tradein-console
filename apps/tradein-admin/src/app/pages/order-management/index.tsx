/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONS_COLUMN,
  ORDER_MANAGEMENT_COLUMNS,
  PageSubHeader,
  Table,
  orderManagementParsingConfig,
  useAuth,
  useCommon,
  useOrder,
  usePermission,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OrderManagementPage() {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state, fetchOrders, clearOrders } = useOrder();
  const { orders, isFetchingOrders } = state;
  const { setSearchTerm } = useCommon();
  const { hasViewOrderDetailsPermission } = usePermission();

  const headers = [
    ...ORDER_MANAGEMENT_COLUMNS,
    ...(hasViewOrderDetailsPermission ? ACTIONS_COLUMN : []),
  ];

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
      setSearchTerm('');
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Orders"
        isLoading={isFetchingOrders}
        headers={headers}
        rows={orders || []}
        parsingConfig={orderManagementParsingConfig}
        menuItems={[
          {
            label: 'View',
            action: (value: any) => navigate(`/dashboard/order/${value._id}`),
          },
        ]}
      />
    </>
  );
}
