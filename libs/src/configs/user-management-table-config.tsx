/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { Chip, StyledMenuIcon } from '../components';
import { DefaultStatus } from '../constants';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const parseStatus = (value: string) => {
  let textColor = 'white';
  let bgColor = '#216A4C';

  switch (value) {
    case DefaultStatus.ACTIVE:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case DefaultStatus.INACTIVE:
      textColor = 'white';
      bgColor = '#f7564a';
      break;

    default:
      textColor = 'white';
      bgColor = '#216A4C';
      break;
  }

  return <Chip value={value} textColor={textColor} bgColor={bgColor} width='100px'/>
}

export const userManagementParsingConfig = {
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
  'Actions': ({ row, menuItems }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} />;
  },
};
