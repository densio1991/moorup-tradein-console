/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { formatDate, parseStatus, parseTypes } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: #216A4C;
  display: inline-block;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
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
  'Upload Type': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['type'])) return '--';
    return parseTypes(row['type'], true);
  },
  'Uploaded By': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['done_by'])) return '--';
    const userDetails = row ? row['done_by'] : null;
    if (!userDetails || (isEmpty(userDetails['first_name']) && isEmpty(userDetails['last_name']))) return '--';
    const firstName = userDetails['first_name'] || '';
    const lastName = userDetails['last_name'] || '';
    return `${firstName} ${lastName}`;
  },
  'Uploaded Date': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['createdAt'])) return '--';
    return formatDate(row['createdAt']);
  },
};
