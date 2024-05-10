/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  faDownload,
  faFileExport,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {
  ACTIONS_COLUMN,
  ADD_PRODUCT_PAYLOAD,
  AppButton,
  DEFAULT_COLUMN,
  MODAL_TYPES,
  PRODUCT_MANAGEMENT_COLUMNS,
  PageSubHeader,
  SideModal,
  TEMPLATE_LINK,
  Table,
  UploadFileModal,
  exportToCSV,
  productManagementParsingConfig,
  useAuth,
  useCommon,
  usePermission,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from './add-product';
import { AddProductVariantForm } from './add-product-variant';

export function ProductManagementPage() {
  const navigate = useNavigate();
  const {
    hasAddProductPermission,
    hasEditProductPermission,
    hasImportProductsPermission,
    hasExportProductsPermission,
    hasExportProductUploadTemplatePermission,
  } = usePermission();
  const {
    state,
    getProducts,
    clearProducts,
    getProductTypes,
    getProductStatuses,
    setAddProductPayload,
    setIncludeProductVariant,
  } = useProduct();
  const { state: authState } = useAuth();
  const { products, isFetchingProducts } = state;
  const { activePlatform } = authState;
  const { state: commonState, setSideModalState, setSearchTerm } = useCommon();
  const { sideModalState } = commonState;
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

  const headers = [
    ...DEFAULT_COLUMN,
    ...PRODUCT_MANAGEMENT_COLUMNS,
    ...(hasEditProductPermission ? ACTIONS_COLUMN : []),
  ];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getProducts(true, signal);
      getProductTypes(signal);
      getProductStatuses(signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearProducts({});
      setSearchTerm('');
    };
  }, [activePlatform]);

  const renderForm = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.ADD_PRODUCT:
        return <AddProductForm />;

      case MODAL_TYPES.ADD_PRODUCT_VARIANT:
        return <AddProductVariantForm />;

      default:
        break;
    }
  };

  const handleImportClick = () => {
    setIsOpenUploadModal(true);
  };

  const downloadAnchorRef = useRef<HTMLAnchorElement>(null);

  const handleDownloadClick = () => {
    const fileUrl = TEMPLATE_LINK;
    if (downloadAnchorRef.current) {
      downloadAnchorRef.current.href = fileUrl;
      downloadAnchorRef.current.click();
    }
  };

  return (
    <>
      <PageSubHeader
        overflowx="auto"
        withSearch
        leftControls={
          <>
            {hasAddProductPermission && (
              <AppButton
                width="fit-content"
                icon={faPlus}
                onClick={() =>
                  setSideModalState({
                    ...sideModalState,
                    open: true,
                    view: MODAL_TYPES.ADD_PRODUCT,
                  })
                }
              >
                Add
              </AppButton>
            )}
            {hasImportProductsPermission && (
              <AppButton
                width="fit-content"
                icon={faUpload}
                onClick={handleImportClick}
              >
                Import
              </AppButton>
            )}
            {hasExportProductsPermission && (
              <AppButton
                width="fit-content"
                icon={faDownload}
                onClick={() => exportToCSV(products, activePlatform)}
                disabled={isEmpty(products) || isFetchingProducts}
              >
                Export
              </AppButton>
            )}
            {hasExportProductUploadTemplatePermission && (
              <>
                <AppButton
                  width="fit-content"
                  icon={faFileExport}
                  onClick={handleDownloadClick}
                  disabled={isEmpty(TEMPLATE_LINK)}
                >
                  Export Template
                </AppButton>
                <a
                  ref={downloadAnchorRef}
                  style={{ display: 'none' }}
                  download
                />
              </>
            )}
          </>
        }
      />
      <Table
        label="Products"
        isLoading={isFetchingProducts}
        headers={headers}
        rows={products || []}
        parsingConfig={productManagementParsingConfig}
        menuItems={[
          {
            label: 'Edit',
            action: (value: any) => navigate(`/dashboard/product/${value._id}`),
          },
        ]}
      />
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          setSideModalState({ ...sideModalState, open: false, view: null });
          setAddProductPayload(ADD_PRODUCT_PAYLOAD);
          setIncludeProductVariant(false);
        }}
      >
        {renderForm()}
      </SideModal>

      <UploadFileModal
        isOpen={isOpenUploadModal}
        closeModal={() => setIsOpenUploadModal(false)}
      />
    </>
  );
}
