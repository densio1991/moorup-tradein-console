/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import { Chip } from '../components';
import { ClaimStatus } from '../constants';
import { parseDateString } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
}

const parseClaimStatus = (value: string) => {
  let textColor = 'white';
  let bgColor = '#5e5d5d';

  switch (value) {
    case ClaimStatus.PENDING:
      textColor = 'white';
      bgColor = '#f28933';
      break;

    case ClaimStatus.APPROVED:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case ClaimStatus.REJECT:
      textColor = 'white';
      bgColor = '#f7564a';
      break;

    case ClaimStatus.DELETED:
      textColor = 'white';
      bgColor = '#f7564a';
      break;

    default:
      textColor = 'white';
      bgColor = '#5e5d5d';
      break;
  }

  return <Chip value={value} textColor={textColor} bgColor={bgColor} />
}

export const promotionClaimsManagementParsingConfig = {
  'Order Number': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['order_id'])) return '--';
    return row['order_id'];
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
    return promotionLink;
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
    return parseClaimStatus(row['moorup_status']);
  },
  'Claim Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';

    return parseClaimStatus(row['status']);
  }
};
