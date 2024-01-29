import {
  DEFAULT_COLUMN,
  ORDER_MANAGEMENT_COLUMNS,
  Table,
} from '@tradein-admin/libs';

export function OrderManagementPage() {
  const headers = [...DEFAULT_COLUMN, ...ORDER_MANAGEMENT_COLUMNS];

  return <Table label="Orders" isLoading={true} headers={headers} rows={[]} />;
}
