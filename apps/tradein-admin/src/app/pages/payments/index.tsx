import {
  DEFAULT_COLUMN,
  PAYMENTS_MANAGEMENT_COLUMNS,
  Table,
} from '@tradein-admin/libs';

export function PaymentsPage() {
  const headers = [...DEFAULT_COLUMN, ...PAYMENTS_MANAGEMENT_COLUMNS];

  return (
    <Table label="Payments" isLoading={true} headers={headers} rows={[]} />
  );
}
