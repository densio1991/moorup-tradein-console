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

// const StyledDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
// `

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
    if (!promotionDetails || isEmpty(promotionDetails['slug']) || isEmpty(row['platform_domain'])) return '--';

    const promotionLink = `${row['platform_domain']}promotions/${promotionDetails?.slug}`
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
  'Order Count': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_id'])) return '--';
    const orderDetails = row ? row['order_id'] : null;
    const orderCount = orderDetails?.order_items?.length;
    return orderCount;
  },
  // Action: ({ row }: ParsingFunctionParams) => {
  //   if (!row || isEmpty(row['_id'])) return '--';
  //   return (
  //     <StyledDiv>
  //       <AppButton
  //         type="button"
  //         variant="fill"
  //         width="fit-content"
  //         padding='4px 20px'
  //         onClick={() => console.log('Approved')}
  //       >
  //         Approve
  //       </AppButton>
  //       <AppButton
  //         type="button"
  //         variant="error"
  //         width="fit-content"
  //         padding='4px 20px'
  //         onClick={() => console.log('Rejected')}
  //       >
  //         Reject
  //       </AppButton>
  //     </StyledDiv>
  //   );
  // },
};
