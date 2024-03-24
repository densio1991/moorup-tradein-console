/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { parseDateString, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const StyledChip = styled.span<{ value?: string; width?: string; bgColor?: string; textColor?: string }>`
  display: inline-block;
  border-radius: 4px;
  padding: 2px 20px;
  text-decoration: none;
  width: ${(props) => props.width ?? 'auto'};
  text-align: center;
  background-color: ${(props) => props.bgColor ?? (props.value === 'active' ? '#b0d6d0' : '#ffdbd9')};
  color: ${(props) => props.textColor ?? (props.value === 'active' ? '#01463A' : '#f7564a')};
`;

const ProductChipsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
`;

export const promotionsManagementParsingConfig = {
  'Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['name'])) return '--';
    return row['name'];
  },
  'Products': ({ row }: ParsingFunctionParams) => {
    // if (!row || isEmpty(row['claims'])) return '--';
    if (!row || (isEmpty(row['claims']) && isEmpty(row['products']))) return '--';

    // const products = Array.isArray(row['claims']?.products) ? row['claims'].products : [];
    const products = Array.isArray(row['claims']?.products) && row['claims'].products.length > 0 ? row['claims'].products : (Array.isArray(row['products']) ? row['products'] : []);
    const maxItems = 2;

    if (products.length <= maxItems) {
      return (
        <ProductChipsContainer>
          {products.map((product: { name: any; product_name: any }, index: number) => (
            <StyledChip key={index} bgColor='#216A4C' textColor='white'>{product.product_name || product.name}</StyledChip>
          ))}
        </ProductChipsContainer>
      );
    } else {
      const visibleProducts = products.slice(0, maxItems);
      const remainingCount = products.length - maxItems;

      return (
        <ProductChipsContainer>
          {visibleProducts.map((product: { name: any; product_name: any }, index: number) => (
            <StyledChip key={index} bgColor='#216A4C' textColor='white'>{product.product_name || product.name}</StyledChip>
          ))}
          <StyledChip key="more" bgColor='#216A4C' textColor='white'>{`+${remainingCount} more`}</StyledChip>
        </ProductChipsContainer>
      );
    }
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
    return parseStatus(row['status']);
  },
};
