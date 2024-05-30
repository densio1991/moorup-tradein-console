/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import {
  ACTIONS_COLUMN,
  ADD_PRODUCT_PAYLOAD,
  AppButton,
  DEFAULT_COLUMN,
  Divider,
  DropdownButton,
  IconButton,
  MODAL_TYPES,
  PRODUCT_MANAGEMENT_COLUMNS,
  PageSubHeader,
  SideModal,
  Table,
  UploadFileModal,
  productManagementParsingConfig,
  useAuth,
  useCommon,
  usePermission,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from './add-product';
import { AddProductVariantForm } from './add-product-variant';
import { ExportFileForm } from './export';

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
    uploadProductsExcelFile,
  } = useProduct();
  const { state: authState } = useAuth();
  const { products, isFetchingProducts, isUploadingProductsExcel } = state;
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

      case MODAL_TYPES.EXPORT_PRODUCTS:
        return <ExportFileForm />;

      case MODAL_TYPES.IMPORT_PRODUCTS:
        return <ExportFileForm />;

      default:
        break;
    }
  };

  const renderAddProductAction = () => {
    if (hasAddProductPermission && hasImportProductsPermission) {
      const addProductItems = [
        {
          label: 'Add Product',
          onClick: () => {
            setSideModalState({
              ...sideModalState,
              open: true,
              view: MODAL_TYPES.ADD_PRODUCT,
            });
          },
        },
        {
          label: 'Import Products',
          onClick: () => setIsOpenUploadModal(true),
        },
        {
          label: 'Import Products Pricing',
          onClick: () => setIsOpenUploadModal(true),
          disabled: true,
        },
      ];

      return (
        <DropdownButton
          id="addProductItems"
          dropdownItems={addProductItems}
          disabled={isFetchingProducts}
        >
          Add/Import
        </DropdownButton>
      );
    } else if (hasAddProductPermission) {
      return (
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
      );
    } else if (hasImportProductsPermission) {
      return (
        <>
          <AppButton
            width="fit-content"
            icon={faUpload}
            onClick={() => setIsOpenUploadModal(true)}
          >
            Import Products
          </AppButton>
          <AppButton
            width="fit-content"
            icon={faUpload}
            onClick={() => setIsOpenUploadModal(true)}
          >
            Import Products Pricing
          </AppButton>
        </>
      );
    }
  };

  return (
    <>
      <PageSubHeader
        withSearch
        leftControls={renderAddProductAction()}
        rightControls={
          (hasExportProductsPermission ||
            hasExportProductUploadTemplatePermission) && (
            <>
              <IconButton
                tooltipLabel="Export"
                icon={faDownload}
                onClick={() => {
                  setSideModalState({
                    ...sideModalState,
                    open: true,
                    view: MODAL_TYPES.EXPORT_PRODUCTS,
                  });
                }}
                disabled={
                  (!hasExportProductsPermission &&
                    !hasExportProductUploadTemplatePermission) ||
                  isFetchingProducts
                }
              />
              <Divider />
            </>
          )
        }
      />
      <Table
        label="Products"
        isLoading={isFetchingProducts || isUploadingProductsExcel}
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
        modalTitle="Select file to import products"
        onUploadFile={uploadProductsExcelFile}
      />
    </>
  );
}
