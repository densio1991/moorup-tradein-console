/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  FormGroup,
  PRODUCT_PRICING_UPLOAD_COLUMNS,
  PRODUCT_UPLOAD_ATTRIBUTES_COLUMNS,
  PRODUCT_UPLOAD_COLUMNS,
  TabList,
  Table,
  productPricingParsingConfig,
  productUploadAttributesParsingConfig,
  productUploadParsingConfig,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function UploadProductErrorPage() {
  const navigate = useNavigate();
  const { state, clearUploadProductsErrors } = useProduct();
  const { isUploadingProductsExcel, uploadProductsError } = state;

  useEffect(() => {
    if (isEmpty(uploadProductsError)) {
      navigate('/dashboard/product/list');
    }
  }, [uploadProductsError]);

  const renderTabs = () => {
    const tabs: string[] = [];
    const tabContent: React.ReactNode[] = [];

    if (
      uploadProductsError.invalid_products_entries &&
      uploadProductsError.invalid_products_entries.length > 0
    ) {
      tabs.push('Products');
      tabContent.push(
        <Table
          key="products"
          label="Some errors were found in products sheet."
          isLoading={isUploadingProductsExcel}
          headers={[...PRODUCT_UPLOAD_COLUMNS]}
          rows={uploadProductsError.invalid_products_entries || []}
          parsingConfig={productUploadParsingConfig}
        />,
      );
    }

    if (
      uploadProductsError.invalid_pricing_entries &&
      uploadProductsError.invalid_pricing_entries.length > 0
    ) {
      tabs.push('Pricing');
      tabContent.push(
        <Table
          key="pricing"
          label="Some errors were found in pricing sheet."
          isLoading={isUploadingProductsExcel}
          headers={[...PRODUCT_PRICING_UPLOAD_COLUMNS]}
          rows={uploadProductsError.invalid_pricing_entries || []}
          parsingConfig={productPricingParsingConfig}
        />,
      );
    }

    if (
      uploadProductsError.invalid_attributes_entries &&
      uploadProductsError.invalid_attributes_entries.length > 0
    ) {
      tabs.push('Attributes');
      tabContent.push(
        <Table
          key="attributes"
          label="Some errors were found in attributes sheet."
          isLoading={isUploadingProductsExcel}
          headers={[...PRODUCT_UPLOAD_ATTRIBUTES_COLUMNS]}
          rows={uploadProductsError.invalid_attributes_entries || []}
          parsingConfig={productUploadAttributesParsingConfig}
        />,
      );
    }

    return <TabList tabs={tabs}>{tabContent}</TabList>;
  };

  return (
    <>
      {renderTabs()}
      <FormGroup margin="0px 20px">
        <span />
        <AppButton
          type="button"
          width="fit-content"
          onClick={() => {
            clearUploadProductsErrors({});
            navigate('/dashboard/product/list');
          }}
        >
          Okay
        </AppButton>
      </FormGroup>
    </>
  );
}
