/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { StyledMenuIcon } from '../components';
import { ROLES } from '../constants';
import { parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

export const userManagementParsingConfig = {
  'Role': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['role'])) return '--';

    const role = ROLES.find((item: any) => row['role'] === item?.value);
    return role?.label;
  },
  'First Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['first_name'])) return '--';
    return row['first_name'];
  },
  'Last Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['last_name'])) return '--';
    return row['last_name'];
  },
  'Email': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['email'])) return '--';
    return row['email'];
  },
  'Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  'Actions': ({ row, menuItems, index }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} index={index} />;
  },
};
