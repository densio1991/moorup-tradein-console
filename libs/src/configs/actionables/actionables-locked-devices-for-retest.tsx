/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { StyledMenuIcon } from '../../components';
import { formatDate } from '../../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

export const actionablesLockedDevicesForRetestParsingConfig = {
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
  'Lock Type': ({ row }: ParsingFunctionParams) => {
    const orderItem = row ? row['order_items'] : null;
    if (!orderItem || isEmpty(orderItem['lock'])) return '--';

    const lock = orderItem ? orderItem['lock'] : null;
    if (!lock || isEmpty(lock['type'])) return '--';

    return lock['type'];
  },
  'Order Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
  'Actions': ({ row, menuItems, index }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} index={index} />;
  },
};
