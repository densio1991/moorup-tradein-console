/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  FormGroup,
  ORDER_PAYMENT_FLAT_FILE_DETAILS_COLUMNS,
  Table,
  orderPaymentUploadParsingConfig,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function UploadPaymentErrorPage() {
  const navigate = useNavigate();
  const { state, clearUploadPaymentErrors } = useOrder();
  const { isImportingPaymentsFlatFile, importPaymentsFlatFileError } = state;

  const headers = [...ORDER_PAYMENT_FLAT_FILE_DETAILS_COLUMNS];

  useEffect(() => {
    if (isEmpty(importPaymentsFlatFileError)) {
      navigate('/dashboard/order/payments');
    }
  }, [importPaymentsFlatFileError]);

  return (
    <>
      <Table
        label="Some errors were found in the file."
        isLoading={isImportingPaymentsFlatFile}
        headers={headers}
        rows={importPaymentsFlatFileError || []}
        parsingConfig={orderPaymentUploadParsingConfig}
      />
      <FormGroup margin="0px 20px">
        <span />
        <AppButton
          type="button"
          width="fit-content"
          onClick={() => {
            clearUploadPaymentErrors();
            navigate('/dashboard/order/payments');
          }}
        >
          Okay
        </AppButton>
      </FormGroup>
    </>
  );
}
