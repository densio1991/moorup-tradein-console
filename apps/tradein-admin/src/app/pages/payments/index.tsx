import {
  ORDER_PAYMENTS_MANAGEMENT_COLUMNS,
  Table,
  useAuth,
  useOrder,
  usePermission,
} from '@tradein-admin/libs';
import { PageSubHeader } from '@tradein-admin/libs';
import { useEffect } from 'react';

export const PaymentPage = () => {
  const headers = [...ORDER_PAYMENTS_MANAGEMENT_COLUMNS];
  const { state: authState } = useAuth();
  const { state, fetchOrderPayments } = useOrder();
  const { paymentsItem, isFetchingPayments } = state;
  const { hasViewPaymentsPermission } = usePermission();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchOrderPayments(signal);
  }, []);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Payments"
        headers={headers}
        rows={paymentsItem}
        isLoading={isFetchingPayments}
      />
    </>
  );
};
