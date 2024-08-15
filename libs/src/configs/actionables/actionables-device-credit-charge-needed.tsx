/* eslint-disable @typescript-eslint/no-explicit-any */
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmpty, isUndefined } from 'lodash';
import { AppButton } from '../../components';
import { PaymentStatus } from '../../constants';
import { formatDate, parseStatus } from '../../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

export const actionablesDeviceCreditChargeNeededParsingConfig = {
  'Order Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_number'])) return '--';
    return row['order_number'];
  },
  'Customer Name': ({ row }: ParsingFunctionParams) => {
    const userDetails = row ? row['user_details'] : null;
    if (
      !userDetails ||
      (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))
    )
      return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Device ID': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['line_item_number'])) return '--';
    return orderItem['line_item_number'];
  },
  'Payment Status': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['payment'])) return '--';

    const payment = orderItem ? orderItem['payment'] : null;
    if (!payment || isEmpty(payment['payment_status'])) return '--';

    return parseStatus(payment['payment_status']);
  },
  'Remarks': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['payment'])) return '--';

    const payment = orderItem ? orderItem['payment'] : null;
    if (!payment || isEmpty(payment['remarks'])) return '--';

    return payment['remarks'];
  },
  'Order Date': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['createdAt'])) return '--';
    return formatDate(orderItem['createdAt']);
  },
  'Initial Device Value': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isUndefined(orderItem['original_offer'])) return '--';
    return orderItem['original_offer'];
  },
  'Charge Amount': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['charge_amount'])) return '--';
    return row['charge_amount'];
  },
  Actions: ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['_id'])) return '--';

    let disableChargedAction = true;
    let disableFailedAction = true;

    const payment = orderItem ? orderItem['payment'] : null;
    if (payment || !isEmpty(payment['payment_status'])) {
      switch (payment['payment_status']) {
        case PaymentStatus.PENDING:
          disableChargedAction = false;
          disableFailedAction = false;
          break;

        case PaymentStatus.FAILED:
          disableChargedAction = false;
          disableFailedAction = true;
          break;
      
        default:
          disableChargedAction = true;
          disableFailedAction = true;
          break;
      }
    }

    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        <AppButton
          type="button"
          variant="fill"
          width="fit-content"
          padding="4px 20px"
          icon={faCheck}
          onClick={() => row.chargedAction()}
          disabled={disableChargedAction}
        >
          Charged
        </AppButton>
        <AppButton
          type="button"
          variant="fill"
          width="fit-content"
          padding="4px 20px"
          icon={faXmark}
          onClick={() => row.failedAction()}
          disabled={disableFailedAction}
        >
          Failed
        </AppButton>
      </div>
    );
  },
};
