/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { capitalizeFirstLetter, parseDateString } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const promotionsManagementParsingConfig = {
  'Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['name'])) return '--';
    return row['name'];
  },
  'Products': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['products'])) return '--';
    const productNames = Array.isArray(row['products'])
      ? row['products'].map((product: { name: any }) => product.name)
      : [];
    return productNames.join(', ');
  },
  'Start Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['start_date'])) return '--';
    return parseDateString(row['start_date']);
  },
  'End Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['end_date'])) return '--';
    return parseDateString(row['end_date']);
  },
  'Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return capitalizeFirstLetter(row['status']);
  },
};
