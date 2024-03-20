/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { parseDateString, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: #216A4C;
`

export const promotionClaimsManagementParsingConfig = {
  'Order Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_number'])) return '--';
    return row['order_number'];
  },
  'Promotion Name': ({ row }: ParsingFunctionParams) => {
    const promotionDetails = row ? row['promotion_details'] : null;
    if (!promotionDetails || isEmpty(promotionDetails['name'])) return '--';
    return promotionDetails['name'];
  },
  'Promotion Link': ({ row }: ParsingFunctionParams) => {
    const promotionDetails = row ? row['promotion_details'] : null;
    if (!promotionDetails || isEmpty(promotionDetails['slug']) || isEmpty(row['platform_domain'])) return '--';

    const promotionLink = `${row['platform_domain']}promotions/${row['promotion_details']?.slug}`
    return <StyledLink href={promotionLink} target="_blank" rel="noopener noreferrer">{promotionLink}</StyledLink>
    ;
  },
  'Receipt Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['receipt_number'])) return '--';
    return row['receipt_number'];
  },
  'Claimed By': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['user_details'])) return '--';
    const userDetails = row ? row['user_details'] : null;
    if (!userDetails || (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))) return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Claimed Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return parseDateString(row['createdAt']);
  },
  'Moorup Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['moorup_status'])) return '--';
    return parseStatus(row['moorup_status']);
  },
  'Claim Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';

    return parseStatus(row['status']);
  }
};
