/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { Chip } from '../components';
import { OrderPaymentStatus, OrderStatus } from '../constants';
import { parseDateString } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const parseStatus = (value: string) => {
  let textColor = 'white';
  let bgColor = '#5e5d5d';

  switch (value) {
    case OrderStatus.PROCESSING:
      textColor = 'white';
      bgColor = '#f28933';
      break;

    case OrderStatus.COMPLETED:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case OrderStatus.CREATED:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case OrderStatus.DELETED:
      textColor = 'white';
      bgColor = '#f7564a';
      break;

    case OrderPaymentStatus.PENDING:
      textColor = 'white';
      bgColor = '#f28933';
      break;

    default:
      textColor = 'white';
      bgColor = '#5e5d5d';
      break;
  }

  return <Chip value={value} textColor={textColor} bgColor={bgColor} />
}

export const orderManagementParsingConfig = {
  'User Email': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['user_id'])) return '--';
    const userDetails = row ? row['user_id'] : null;
    if (!userDetails || isEmpty(userDetails['email'])) return '--';
    return userDetails['email'];
  },
  'Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  'Payment Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['payment'])) return '--';
    const paymentDetails = row ? row['payment'] : null;
    if (!paymentDetails || isEmpty(paymentDetails['payment_status'])) return '--';
    return parseStatus(paymentDetails['payment_status']);
  },
  'Order Count': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_items'])) return '--';
    const orderItems = row ? row['order_items'] : null;
    const orderCount = orderItems?.length;
    return orderCount;
  },
  'Updated': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['updatedAt'])) return '--';
    return parseDateString(row['updatedAt']);
  },
};
