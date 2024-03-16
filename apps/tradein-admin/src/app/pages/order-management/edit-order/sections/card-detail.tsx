/* eslint-disable @typescript-eslint/no-explicit-any */
type CardDetailProps = {
  label: any;
  value: any;
};

export const CardDetail = ({ label, value }: CardDetailProps) => {
  return (
    <>
      <dl className="font-semibold capitalize">{label}</dl>
      <dt className="truncate capitalize">{value || '---'}</dt>
    </>
  );
};
