/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { AppButton } from '../components';
import { formatDate, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const promotionClaimsPaymentManagementParsingConfig = {  
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
  'Claim Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['claim_number'])) return '--';
    return row['claim_number'];
  },
  'Moorup Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['moorup_status'])) return '--';
    return parseStatus(row['moorup_status']);
  },
  'Claim Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';

    return parseStatus(row['status']);
  },
  'Claimed Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
  Action: ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['_id'])) return '--';
    return (
      <StyledDiv>
        <AppButton
          type="button"
          variant="fill"
          width="fit-content"
          padding='4px 20px'
          onClick={() => row.action()}
          disabled={isEmpty(row['amount'].toString())}
        >
          Pay Now
        </AppButton>
      </StyledDiv>
    );
  },
};
