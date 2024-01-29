import {
  DEFAULT_COLUMN,
  PROMOTIONS_MANAGEMENT_COLUMNS,
  Table,
} from '@tradein-admin/libs';

export function PromotionsPage() {
  const headers = [...DEFAULT_COLUMN, ...PROMOTIONS_MANAGEMENT_COLUMNS];

  return (
    <Table label="Promotions" isLoading={true} headers={headers} rows={[]} />
  );
}
