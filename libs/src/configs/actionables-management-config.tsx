/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import { AppButton, Chip } from '../components';
import { OrderPaymentStatus, OrderStatus } from '../constants';
import { capitalizeFirstLetter, parseDateString } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

// const parseStatus = (value: string) => {
//   let textColor = 'white';
//   let bgColor = '#5e5d5d';
//   let text = value;

//   switch (value) {
//     case OrderItemStatus.CREATED:
//     case OrderItemStatus.COMPLETED:
//       textColor = 'white';
//       bgColor = '#216A4C';
//       break;

//     case OrderItemStatus.RECEIVED:
//       textColor = 'white';
//       bgColor = '#57A300';
//       break;

//     case OrderItemStatus.LABEL_SENT:
//       text = 'Label Sent';
//       textColor = 'white';
//       bgColor = '#428BDF';
//       break;

//     case OrderItemStatus.BOX_SENT:
//       text = 'Box Sent';
//       textColor = 'white';
//       bgColor = '#428BDF';
//       break;

//     case OrderItemStatus.EVALUATED:
//       case OrderItemStatus.REVISED:
//       textColor = 'white';
//       bgColor = '#216A4C';
//       break;

//     case OrderItemStatus.FOR_REVISION:
//       text = 'For Revision';
//       textColor = 'white';
//       bgColor = '#f28933';
//       break;

//     default:
//       textColor = 'white';
//       bgColor = '#5e5d5d';
//       break;
//   }

//   return (
//     <Chip value={capitalizeFirstLetter(text)} textColor={textColor} bgColor={bgColor} width="100px" />
//   );
// };

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
