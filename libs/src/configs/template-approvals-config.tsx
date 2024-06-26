/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { capitalizeFirstLetters, formatDate, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const templateApprovalsParsingConfig = {
  'ID': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['_id'])) return '--';
    return row['_id'];
  },
  'Template Name': ({ row }: ParsingFunctionParams) => {
    const currentTemplate = row ? row['current'] : null;
    if (!currentTemplate || isEmpty(currentTemplate['template_name'])) return '--';
    return capitalizeFirstLetters(currentTemplate['template_name']);
  },
  'Requested By': ({ row }: ParsingFunctionParams) => {
    const adminDetails = row ? row['admin_id'] : null;
    if (
      !adminDetails ||
      (isEmpty(adminDetails['first_name']) && isEmpty(adminDetails['last_name']))
    )
      return '--';
    const firstName = adminDetails['first_name'] || '';
    const lastName = adminDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  Status: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  Created: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
  Updated: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['updatedAt'])) return '--';
    return formatDate(row['updatedAt']);
  },
};
