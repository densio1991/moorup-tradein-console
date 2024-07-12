/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { formatDate } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const orderPaymentParsingConfig = {  
  'Device ID': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['deviceId'])) return '--';
    return row['deviceId'];
  },
  'Customer Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['customerName'])) return '--';
    return row['customerName'];
  },
  'Customer Email Address': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['customerEmailAddress'])) return '--';
    return row['customerEmailAddress'];
  },
  'Quoted Amount': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['paymentAmount'])) return '--';
    return row['paymentAmount'];
  },
  'Payment Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['paymentType'])) return '--';
    return row['paymentType'];
  },
  'Payment Reference': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['paymentReference'])) return '--';
    return row['paymentReference'];
  },
  'Evaluated Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['updatedAt'])) return '--';
    return formatDate(row['updatedAt']);
  },
};
