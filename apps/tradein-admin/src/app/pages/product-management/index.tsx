/* eslint-disable react-hooks/exhaustive-deps */
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
  useAuth,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

export function ProductManagementPage() {
  const { state, getProducts, clearProducts } = useProduct();
  const { state: authState } = useAuth();
  const { products, isFetchingProducts } = state.product;
  const { activePlatform } = authState.auth;
  const shouldRun = useRef(true);

  const headers = [...DEFAULT_COLUMN, ...PRODUCT_MANAGEMENT_COLUMNS];

  useEffect(() => {
    if (shouldRun.current && !isEmpty(activePlatform)) {
      getProducts({});
      shouldRun.current = false;
    }

    return () => {
      // Clear data on unmount
      clearProducts({});
    };
  }, [activePlatform]);

  return (
    <Table
      label="Products"
      isLoading={isFetchingProducts}
      headers={headers}
      rows={products || []}
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
