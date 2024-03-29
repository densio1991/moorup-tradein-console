/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { parseDateString, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const orderManagementParsingConfig = {
  'Customer Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['user_id'])) return '--';
    const userDetails = row ? row['user_id'] : null;
    if (!userDetails || (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))) return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Order Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_type'])) return '--';
    return parseStatus(row['order_type']);
  },
  'Credit Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['credit_type'])) return '--';
    return parseStatus(row['credit_type']);
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
