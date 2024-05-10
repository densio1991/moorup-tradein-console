/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { formatDate, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: #216A4C;
`

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

export const promotionClaimsManagementParsingConfig = {  
  'Order Number': ({ row }: ParsingFunctionParams) => {
    const orderDetails = row ? row['order_id'] : null;
    if (!orderDetails || isEmpty(orderDetails['order_number'])) return '--';
    return orderDetails['order_number'];
  },
  'Promotion Name': ({ row }: ParsingFunctionParams) => {
    const promotionDetails = row ? row['promotion_id'] : null;
    if (!promotionDetails || isEmpty(promotionDetails['name'])) return '--';
    return promotionDetails['name'];
  },
  'Promotion Link': ({ row }: ParsingFunctionParams) => {
    const promotionDetails = row ? row['promotion_id'] : null;
    if (!promotionDetails || isEmpty(promotionDetails['slug']) || isEmpty(row['platformOrigin'])) return '--';

    const promotionLink = `${row['platformOrigin']}/promotions/${promotionDetails?.slug}`
    return <StyledLink href={promotionLink} target="_blank" rel="noopener noreferrer">{promotionLink}</StyledLink>
    ;
  },
  'Receipt Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['receipt_number'])) return '--';
    return row['receipt_number'];
  },
  'Claim Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['claim_number'])) return '--';
    return row['claim_number'];
  },
  'Claimed By': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['user_id'])) return '--';
    const userDetails = row ? row['user_id'] : null;
    if (!userDetails || (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))) return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Claimed Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
  'Moorup Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['moorup_status'])) return '--';
    return parseStatus(row['moorup_status']);
  },
  'Claim Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';

    return parseStatus(row['status']);
  },
  'Device Model': ({ row }: ParsingFunctionParams) => {
    const orderDetails = row ? row['order_id'] : null;
    if (!orderDetails || isEmpty(orderDetails['order_number'])) return '--';
  
    const orderItems = Array.isArray(orderDetails?.order_items) && orderDetails?.order_items?.length > 0 ? orderDetails.order_items : [];
    const maxItems = 2;
  
    if (orderItems.length <= maxItems) {
      return (
        <ProductChipsContainer>
          {orderItems.map((item: { product_variant_id: { product_id: { model: any } } }, index: number) => (
            item.product_variant_id ? (
              <StyledChip key={index} bgColor='#216A4C' textColor='white'>{item?.product_variant_id?.product_id?.model}</StyledChip>
            ) : (
              '--'
            )
          ))}
        </ProductChipsContainer>
      );
    } else {
      const visibleItems = orderItems.slice(0, maxItems);
      const remainingCount = orderItems.length - maxItems;
  
      return (
        <ProductChipsContainer>
          {visibleItems?.map((item: { product_variant_id: { product_id: { model: any } } }, index: number) => (
            item.product_variant_id ? (
              <StyledChip key={index} bgColor='#216A4C' textColor='white'>{item?.product_variant_id?.product_id?.model}</StyledChip>
            ) : (
              '--'
            )
          ))}
          <StyledChip key="more" bgColor='#216A4C' textColor='white'>{`+${remainingCount} more`}</StyledChip>
        </ProductChipsContainer>
      );
    }
  },
};
