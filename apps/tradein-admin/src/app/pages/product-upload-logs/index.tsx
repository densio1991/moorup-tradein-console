/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  PRODUCT_UPLOAD_LOGS_COLUMNS,
  PageSubHeader,
  Table,
  productUploadLogsParsingConfig,
  useAuth,
  useCommon,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function ProductUploadLogsPage() {
  const { state, getProductUploadLogs, clearProductUploadLogs } = useProduct();
  const { setSearchTerm } = useCommon();
  const { state: authState } = useAuth();
  const { isFetchingProductUploadLogs, productUploadLogs } = state;
  const { activePlatform } = authState;
  const headers = [...PRODUCT_UPLOAD_LOGS_COLUMNS];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getProductUploadLogs({}, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearProductUploadLogs({});
      setSearchTerm('');
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Product Upload Logs"
        isLoading={isFetchingProductUploadLogs}
        headers={headers}
        rows={productUploadLogs || []}
        parsingConfig={productUploadLogsParsingConfig}
      />
    </>
  );
}
