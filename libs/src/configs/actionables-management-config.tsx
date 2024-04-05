/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import { AppButton } from '../components';
import { capitalizeFirstLetter, parseDateString, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const actionablesManagementParsingConfig = {
  'Order Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_number'])) return '--';
    return row['order_number'];
  },
  Name: ({ row }: ParsingFunctionParams) => {
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
  'Product Name': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['product_name'])) return '--';
    return orderItem['product_name'];
  },
  'Product Type': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['product_type'])) return '--';
    return capitalizeFirstLetter(orderItem['product_type']);
  },
  Status: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  Created: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return parseDateString(row['createdAt']);
  },
  Updated: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['updatedAt'])) return '--';
    return parseDateString(row['updatedAt']);
  },
  Actions: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['_id'])) return '--';
    return (
      <AppButton
        type="button"
        variant="fill"
        width="fit-content"
        padding='4px 20px'
        icon={faPrint}
        onClick={() => row.action()}
      >
        Print Labels
      </AppButton>
    );
  },
};
