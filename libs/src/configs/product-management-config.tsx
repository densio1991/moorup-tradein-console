/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { StyledMenuIcon } from '../components';
import { capitalizeFirstLetter, parseTypes } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

export const productManagementParsingConfig = {
  'Display Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['display_name'])) return '--';
    return row['display_name'];
  },
  'Brand': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['brand'])) return '--';
    return capitalizeFirstLetter(row['brand']);
  },
  'Model': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['model'])) return '--';
    return capitalizeFirstLetter(row['model']);
  },
  'Year': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['year'])) return '--';
    return row['year'];
  },
  'Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['type'])) return '--';
    return parseTypes(row['type']);
  },
  'Actions': ({ row, menuItems }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} />;
  },
};
