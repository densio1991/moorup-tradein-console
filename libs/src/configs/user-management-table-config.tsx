/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { StyledMenuIcon } from '../components';
import { capitalizeFirstLetter } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const StyledChip = styled.span<{ value?: string; width?: string }>`
  display: inline-block;
  border-radius: 4px;
  font-weight: 600;
  padding: 2px 20px;
  text-decoration: none;
  width: ${(props) => props.width ?? 'auto'};
  text-align: center;
  background-color: ${(props) => props.value === 'active' ? '#b0d6d0' : '#ffdbd9'};
  color: ${(props) => props.value === 'active' ? '#01463A' : '#f7564a'};
`;

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
    return <StyledChip value={row['status']} width='100px'>{capitalizeFirstLetter(row['status'])}</StyledChip>;
  },
  'Actions': ({ row, menuItems }: ParsingFunctionParams) => {
    if (!row || isEmpty(menuItems)) return '--';
    return <StyledMenuIcon menuItems={menuItems} rowData={row} />;
  },
};
