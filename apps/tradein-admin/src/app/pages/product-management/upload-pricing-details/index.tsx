/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  FormGroup,
  PRODUCT_PRICING_UPLOAD_COLUMNS,
  Table,
  productPricingParsingConfig,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function UploadProductPricingErrorPage() {
  const navigate = useNavigate();
  const { state, clearUploadProductsPricingTemplateErrors } = useProduct();
  const { isUploadingProductsPricingTemplate, uploadProductsPricingError } =
    state;

  const headers = [...PRODUCT_PRICING_UPLOAD_COLUMNS];

  useEffect(() => {
    if (isEmpty(uploadProductsPricingError)) {
      navigate('/dashboard/product/list');
    }
  }, [uploadProductsPricingError]);

  return (
    <>
      <Table
        label="Some errors were found in the file."
        isLoading={isUploadingProductsPricingTemplate}
        headers={headers}
        rows={uploadProductsPricingError || []}
        parsingConfig={productPricingParsingConfig}
      />
      <FormGroup margin="0px 20px">
        <span />
        <AppButton
          type="button"
          width="fit-content"
          onClick={() => {
            clearUploadProductsPricingTemplateErrors([]);
            navigate('/dashboard/product/list');
          }}
        >
          Okay
        </AppButton>
      </FormGroup>
    </>
  );
}
