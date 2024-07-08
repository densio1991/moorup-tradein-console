import {
  ACTIONS_COLUMN,
  AppButton,
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
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

export const PaymentPage = () => {
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state, fetchOrderPayments, downloadOrderPaymentFile } = useOrder();
  const { paymentsItem, isFetchingPayments, isDownloadingPaymentFile } = state;
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
      <PageSubHeader
        withSearch
        leftControls={
          <AppButton
            width="fit-content"
            icon={faDownload}
            disabled={isDownloadingPaymentFile}
            onClick={() =>
              downloadOrderPaymentFile({
                platform: activePlatform,
                'generation-date': moment().format('YYYY-MM-DD'),
              })
            }
          >
            Download File
          </AppButton>
        }
      />
      <Table
        label="Payments"
        headers={headers}
        rows={paymentsItem === null ? [] : paymentsItem} // assign as empty list if item = null
        isLoading={isFetchingPayments}
      />
    </>
  );
};
