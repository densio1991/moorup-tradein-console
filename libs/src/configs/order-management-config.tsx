/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { StyledMenuIcon } from '../components';
import { formatDate, parseStatus, parseTypes } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
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
    return parseTypes(row['order_type'], true);
  },
  'Credit Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['credit_type'])) return '--';
    return parseTypes(row['credit_type'], true);
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
    return formatDate(row['updatedAt']);
  },
  'Actions': ({ row, menuItems, index }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} index={index} />;
  },
};
