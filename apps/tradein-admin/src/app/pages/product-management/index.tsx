import {
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  DEFAULT_COLUMN,
  PRODUCT_MANAGEMENT_COLUMNS,
  Table,
} from '@tradein-admin/libs';

export function ProductManagementPage() {
  const headers = [...DEFAULT_COLUMN, ...PRODUCT_MANAGEMENT_COLUMNS];

  return (
    <Table
      label="Products"
      isLoading={true}
      headers={headers}
      rows={[]}
      rightControls={
        <>
          <AppButton width="fit-content" icon={faPlus}>
            Add
          </AppButton>
          <AppButton width="fit-content" icon={faUpload}>
            Import
          </AppButton>
          <AppButton width="fit-content" icon={faDownload}>
            Export
          </AppButton>
        </>
      }
    />
  );
}
