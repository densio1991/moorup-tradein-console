/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { isEmpty } from 'lodash';
import { AppButton } from '../components';
import { formatDate, parseStatus } from '../helpers';

interface ParsingFunctionParams {
  row: { [key: string]: any };
  menuItems?: any;
  index: number;
}

export const orderLogsParsingConfig = {
  'Initiator': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['triggered_by'])) return '--';
    return row['triggered_by'];
  },
  'Description': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['description'])) return '--';
    return row['description'];
  },
  'Status': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['status'])) return '--';
    return parseStatus(row['status']);
  },
  'Timestamp': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['timestamp'])) return '--';
    return formatDate(row['timestamp'], 'DD/MM/YYYY - hh:mmA');
  },
  'Actions': ({ row }: ParsingFunctionParams) => {
    if (!row || isEmpty(row['email_notification'])) return '--';
    return (
      <AppButton
        type="button"
        variant="fill"
        width="fit-content"
        padding="4px 20px"
        icon={faPaperPlane}
        onClick={() => row.resendEmailAction()}
      >
        Resend
      </AppButton>
    )
  },
};
