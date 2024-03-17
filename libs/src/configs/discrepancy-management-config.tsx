/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const discrepancyManagementParsingConfig = {
  'Order Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_number'])) return '--';
    return row['order_number'];
  },
  'Customer Name': ({ row }: ParsingFunctionParams) => {
    const userDetails = row ? row['user_details'] : null;
    if (!userDetails || (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))) return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Mobile Number': ({ row }: ParsingFunctionParams) => {
    const userDetails = row ? row['user_details'] : null;
    if (!userDetails || isEmpty(userDetails['mobile_number'])) return '--';
    return userDetails['mobile_number'];
  },
  'Email Address': ({ row }: ParsingFunctionParams) => {
    const userDetails = row ? row['user_details'] : null;
    if (!userDetails || isEmpty(userDetails['email'])) return '--';
    return userDetails['email'];
  },
  'Credit Timeframe': ({ row }: ParsingFunctionParams) => {
    const creditType = row ? row['credit_type'] : null;
    if (!creditType) return '--';

    const creditTypeMap: { [key: string]: string } = {
      'post_assessment': 'Post-Assessment',
      'upfront': 'Upfront'
    };

    return creditTypeMap[creditType] || '--';
  },
  'Device': ({ row }: ParsingFunctionParams) => {
    const orderItems = row ? row['order_items'] : null;
    if (!orderItems || (isEmpty(orderItems['product_name']))) return '--';
    return orderItems['product_name'];
  },
  'Original Offer': ({ row }: ParsingFunctionParams) => {
    const orderItems = row ? row['order_items'] : null;
    const originalOffer = orderItems ? orderItems['original_offer'] : null;

    if (originalOffer === undefined || originalOffer === null) return '--';
    return String(originalOffer);
},
};
