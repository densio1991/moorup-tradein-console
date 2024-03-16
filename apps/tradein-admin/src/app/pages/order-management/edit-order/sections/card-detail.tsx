import { CopyToClipboardButton } from '@tradein-admin/libs';

/* eslint-disable @typescript-eslint/no-explicit-any */
type CardDetailProps = {
  label: any;
  value: any;
  copy?: boolean;
};

export const CardDetail = ({ label, value, copy }: CardDetailProps) => {
  return (
    <>
      <dl className="flex font-semibold capitalize pr-4">{label}</dl>
      <dt className="flex truncate capitalize">
        {value || '---'}
        {copy && value && <CopyToClipboardButton textToCopy={value} />}
      </dt>
    </>
  );
};
