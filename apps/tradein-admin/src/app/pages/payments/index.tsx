import {
  ACTIONS_COLUMN,
  clearOrderPaymentItems,
  ORDER_PAYMENTS_MANAGEMENT_COLUMNS,
  Table,
  useAuth,
  useOrder,
  usePermission,
} from '@tradein-admin/libs';
import { PageSubHeader } from '@tradein-admin/libs';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

export const PaymentPage = () => {
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state, fetchOrderPayments } = useOrder();
  const { paymentsItem, isFetchingPayments } = state;
  const { hasViewPaymentsPermission } = usePermission();

  const headers = [
    ...ORDER_PAYMENTS_MANAGEMENT_COLUMNS,
    ...(hasViewPaymentsPermission ? ACTIONS_COLUMN : []),
  ];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      fetchOrderPayments(signal);
    }

    return () => {
      controller.abort();
      clearOrderPaymentItems({});
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Payments"
        headers={headers}
        rows={paymentsItem === null ? [] : paymentsItem} // assign as empty list if item = null
        isLoading={isFetchingPayments}
      />
    </>
  );
};
