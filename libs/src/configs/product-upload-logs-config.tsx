/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { formatDate, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: #216A4C;
`

export const productUploadLogsParsingConfig = {
  'File Name': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['filename'])) return '--';
    return row['filename'];
  },
  'S3 Link': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['s3_link'])) return '--';
    return <StyledLink href={row['s3_link']} target="_blank" rel="noopener noreferrer">{row['s3_link']}</StyledLink>

  },
  'Upload Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  'Uploaded By': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['done_by'])) return '--';
    return row['done_by'];
  },
  'Uploaded Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
};
