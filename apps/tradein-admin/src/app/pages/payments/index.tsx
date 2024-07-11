/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  clearOrderPaymentItems,
  Divider,
  FormGroup,
  FormWrapper,
  IconButton,
  MODAL_TYPES,
  ORDER_PAYMENTS_MANAGEMENT_COLUMNS,
  PageSubHeader,
  SideModal,
  StyledDatePicker,
  Table,
  useAuth,
  useCommon,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';

export const PaymentPage = () => {
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state, fetchOrderPayments, downloadOrderPaymentFile } = useOrder();
  const { paymentsItem, isFetchingPayments, isDownloadingPaymentFile } = state;
  const { state: commonState, setSideModalState, setSearchTerm } = useCommon();
  const { sideModalState } = commonState;
  const [exportDate, setExportDate] = useState<any>();
  const [exportDateInputError, setExportDateInputError] = useState<boolean>();
  const [exportDateInputErrorMessage, setExportDateInputErrorMessage] =
    useState<string>();

  const headers = [...ORDER_PAYMENTS_MANAGEMENT_COLUMNS];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      fetchOrderPayments(signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearOrderPaymentItems({});
      setSearchTerm('');
    };
  }, [activePlatform]);

  const onCloseModal = () => {
    setSideModalState({
      ...sideModalState,
      open: false,
      view: null,
    });

    setExportDate(null);
    setExportDateInputError(false);
    setExportDateInputErrorMessage('');
  };

  const handleDateChange = (_: string, date: Date | null) => {
    setExportDate(
      moment(date)
        .utc()
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toDate(),
    );

    setExportDateInputError(false);
    setExportDateInputErrorMessage('');
  };

  const handleOnBlur = () => {
    if (!exportDate) {
      setExportDateInputError(true);
      setExportDateInputErrorMessage('Export date is required.');
    } else {
      setExportDateInputError(false);
      setExportDateInputErrorMessage('');
    }
  };

  const renderSideModalContent = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.DOWNLOAD_FLAT_FILE:
        return (
          <FormWrapper formTitle="Export" subtTitle="Download Flat File">
            <FormGroup marginBottom="20px">
              <StyledDatePicker
                dateInput={{
                  onChange: handleDateChange,
                  placeholder: 'Set Date',
                  value: exportDate,
                  name: 'generation-date',
                  onBlur: handleOnBlur,
                  error: exportDateInputError,
                  errorMessage: exportDateInputErrorMessage,
                }}
                label="Select date to export"
                onChange={() => {}}
              />
            </FormGroup>
            <FormGroup>
              <span />
              <FormGroup>
                <AppButton
                  type="button"
                  variant="outlined"
                  width="fit-content"
                  onClick={() => onCloseModal()}
                >
                  Cancel
                </AppButton>
                <AppButton
                  type="button"
                  width="fit-content"
                  onClick={() => {
                    downloadOrderPaymentFile({
                      platform: activePlatform,
                      'generation-date': moment().format('YYYY-MM-DD'),
                    });

                    onCloseModal();
                  }}
                >
                  Export File
                </AppButton>
              </FormGroup>
            </FormGroup>
          </FormWrapper>
        );

      default:
        return;
    }
  };

  return (
    <>
      <PageSubHeader
        withSearch
        rightControls={
          <>
            <IconButton
              tooltipLabel="Export"
              icon={faDownload}
              onClick={() => {
                setSideModalState({
                  ...sideModalState,
                  open: true,
                  view: MODAL_TYPES.DOWNLOAD_FLAT_FILE,
                });
              }}
              disabled={isFetchingPayments || isDownloadingPaymentFile}
            />
            <Divider />
          </>
        }
      />
      <Table
        label="Payments"
        headers={headers}
        rows={paymentsItem || []}
        isLoading={isFetchingPayments}
      />
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          onCloseModal();
        }}
      >
        {renderSideModalContent()}
      </SideModal>
    </>
  );
};
