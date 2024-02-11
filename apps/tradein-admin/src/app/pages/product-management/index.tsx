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
  PRODUCT_MANAGEMENT_COLUMNS,
  SideModal,
  Table,
  exportToCSV,
  useAuth,
  useCommon,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
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
    if (!isEmpty(activePlatform)) {
      getProducts(true);
      getProductTypes();
      getProductStatuses();
    }

    return () => {
      // Clear data on unmount
      clearProducts({});
    };
  }, [activePlatform]);

  const renderForm = () => {
    switch (sideModalState.view) {
      case 'add-product':
        return <AddProductForm />;

      case 'add-product-variant':
        return <AddProductVariantForm />;

      default:
        break;
    }
  };

  return (
    <>
      <Table
        label="Products"
        isLoading={isFetchingProducts}
        headers={headers}
        rows={products || []}
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
                  view: 'add-product',
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
