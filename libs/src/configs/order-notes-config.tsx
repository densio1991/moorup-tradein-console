/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { formatDate } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

export const orderNotesParsingConfig = {
  'Author': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdBy'])) return '--';
    const authorDetails = row ? row['createdBy'] : null;
    if (!authorDetails || (isEmpty(authorDetails['first_name']) && isEmpty(authorDetails['last_name']))) return '--';
    const firstName = authorDetails['first_name'] || '';
    const lastName = authorDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Note': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['note'])) return '--';
    return row['note'];
  },
  'Timestamp': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt'], 'DD/MM/YYYY - hh:mmA');
  },
};
