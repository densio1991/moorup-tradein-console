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
  MODAL_TYPES,
  PRODUCT_MANAGEMENT_COLUMNS,
  SideModal,
  Table,
  capitalizeFirstLetter,
  exportToCSV,
  productManagementParsingConfig,
  useAuth,
  useCommon,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductForm } from './add-product';
import { AddProductVariantForm } from './add-product-variant';

export function ProductManagementPage() {
  const navigate = useNavigate();
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
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const headers = [
    ...DEFAULT_COLUMN,
    ...PRODUCT_MANAGEMENT_COLUMNS,
    ...ACTIONS_COLUMN,
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

  // const formattedRows = useMemo(() => {
  //   return products.map((row: any) => {
  //     return {
  //       _id: row?._id,
  //       display_name: row?.display_name,
  //       brand: capitalizeFirstLetter(row?.brand),
  //       model: capitalizeFirstLetter(row?.model),
  //       year: row?.year,
  //     };
  //   });
  // }, [products]);

  return (
    <>
      <Table
        label="Products"
        isLoading={isFetchingProducts}
        headers={headers}
        // rows={formattedRows || []}
        rows={products || []}
        parsingConfig={productManagementParsingConfig}
        menuItems={[
          {
            label: 'Edit',
            action: (value: any) => navigate(`/dashboard/product/${value._id}`),
          },
        ]}
        rightControls={
          <>
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
            <AppButton width="fit-content" icon={faUpload}>
              Import
            </AppButton>
            <AppButton
              width="fit-content"
              icon={faDownload}
              onClick={() => exportToCSV(products)}
              disabled={isEmpty(products) || isFetchingProducts}
            >
              Export
            </AppButton>
          </>
        }
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
    </>
  );
}
