/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import {
  ADMIN,
  AppButton,
  CLAIM_STATUSES,
  ClaimStatus,
  ConfirmationModalTypes,
  Divider,
  FormGroup,
  FormWrapper,
  GenericModal,
  IconButton,
  MODAL_TYPES,
  MOORUP_CLAIM_STATUSES,
  OVERRIDE_CLAIM_STATUSES,
  PROMOTION_CLAIMS_MANAGEMENT_COLUMNS,
  PageSubHeader,
  REGULAR,
  RadioGroup,
  RadioOption,
  SUPERADMIN,
  SideModal,
  StyledDateRangePicker,
  StyledInput,
  StyledReactSelect,
  Table,
  exportPromotionClaims,
  getCurrencySymbol,
  hasEmptyValue,
  promotionClaimsManagementParsingConfig,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';

export function PromotionClaimsPage() {
  const {
    state,
    getPromotionClaims,
    clearPromotionClaims,
    setConfirmationModalState,
    updatePromotionClaimMoorupStatus,
    updatePromotionClaimStatus,
  } = usePromotion();
  const {
    promotionClaims,
    isFetchingPromotionClaims,
    confirmationModalState,
    isUpdatingPromotionClaimMoorupStatus,
    isUpdatingPromotionClaimStatus,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const { state: commonState, setSideModalState, setSearchTerm } = useCommon();
  const { sideModalState } = commonState;

  const headers = [...PROMOTION_CLAIMS_MANAGEMENT_COLUMNS];

  switch (userDetails.role) {
    case REGULAR:
      headers.push({
        label: 'Actions',
        order: 98,
        enableSort: false,
        keyName: '',
      });
      break;

    case ADMIN:
    case SUPERADMIN:
      headers.push({
        label: 'Moorup Status',
        order: 11,
        enableSort: true,
        keyName: 'moorup_status',
      });

      headers.push({
        label: 'Action',
        order: 99,
        enableSort: false,
        keyName: '',
      });
      break;

    default:
      break;
  }

  const [claimToApprove, setClaimToApprove] = useState({
    product_name: '',
    amount: 0,
    currency: '',
  });

  const [claimToReject, setClaimToReject] = useState({
    remarks: '',
  });

  const [claimToOverride, setClaimToOverride] = useState({
    remarks: '',
    status: '',
    user_id: userDetails?._id,
  });

  const [selectedClaimStatuses, setSelectedClaimStatuses] = useState<string[]>(
    [],
  );
  const [selectedMoorupClaimStatuses, setSelectedMoorupClaimStatuses] =
    useState<string[]>([]);
  const [promotionName, setPromotionName] = useState<string>('');
  const [createdDateFrom, setCreatedDateFrom] = useState<Date | null>(null);
  const [createdDateTo, setCreatedDateTo] = useState<Date | null>(null);
  const [exportFileFormat, setExportFileFormat] = useState<any>('csv');

  const renderModalContentAndActions = () => {
    switch (confirmationModalState.view) {
      case ConfirmationModalTypes.APPROVE_CLAIM_REGULAR:
        return (
          <div style={{ width: '100%' }}>
            <FormGroup>
              <StyledReactSelect
                label="Product Purchased"
                name="product_purchased"
                options={confirmationModalState?.data || []}
                isMulti={false}
                placeholder="Select product purchased"
                value={claimToApprove.product_name}
                onChange={(selectedOption) => {
                  setClaimToApprove({
                    product_name: selectedOption.data.product_name,
                    amount: selectedOption.data.amount,
                    currency: selectedOption.data.currency,
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <AppButton
                variant="outlined"
                width="100%"
                onClick={() => onCloseModal()}
              >
                Cancel
              </AppButton>
              <AppButton
                width="100%"
                onClick={() => {
                  const filters = {
                    status: ClaimStatus.PENDING,
                    moorup_status: ClaimStatus.APPROVED,
                    include_all: true,
                  };

                  updatePromotionClaimStatus(
                    { ...claimToApprove, status: ClaimStatus.APPROVED },
                    confirmationModalState.id,
                    filters,
                  );
                  onCloseModal();
                }}
                disabled={hasEmptyValue(claimToApprove)}
              >
                Approve
              </AppButton>
            </FormGroup>
          </div>
        );

      case ConfirmationModalTypes.REJECT_CLAIM_REGULAR:
        return (
          <div style={{ width: '100%' }}>
            <FormGroup>
              <StyledInput
                type="text"
                id="remarks"
                label="Rejection Remarks"
                name="remarks"
                placeholder="Set rejection remarks"
                onChange={(e) => setClaimToReject({ remarks: e.target.value })}
                value={claimToReject.remarks}
              />
            </FormGroup>
            <FormGroup>
              <AppButton
                variant="outlined"
                width="100%"
                onClick={() => onCloseModal()}
              >
                Cancel
              </AppButton>
              <AppButton
                variant="error"
                width="100%"
                onClick={() => {
                  const filters = {
                    status: ClaimStatus.PENDING,
                    moorup_status: ClaimStatus.APPROVED,
                    include_all: true,
                  };

                  updatePromotionClaimStatus(
                    { ...claimToApprove, status: ClaimStatus.REJECTED },
                    confirmationModalState.id,
                    filters,
                  );
                  onCloseModal();
                }}
                disabled={hasEmptyValue(claimToReject)}
              >
                Reject
              </AppButton>
            </FormGroup>
          </div>
        );

      case ConfirmationModalTypes.OVERRIDE_CLAIM_STATUS:
        return (
          <div style={{ width: '100%' }}>
            <FormGroup>
              <StyledReactSelect
                label="Status"
                name="moorup_status"
                options={confirmationModalState?.data || []}
                isMulti={false}
                placeholder="Set status"
                value={claimToOverride.status}
                onChange={(selectedOption) => {
                  setClaimToOverride({
                    ...claimToOverride,
                    status: selectedOption.value,
                  });
                }}
              />
            </FormGroup>
            <FormGroup>
              <StyledInput
                type="text"
                id="update_remarks"
                label="Update Remarks"
                name="update_remarks"
                placeholder="Set update remarks"
                onChange={(e) =>
                  setClaimToOverride({
                    ...claimToOverride,
                    remarks: e.target.value,
                  })
                }
                value={claimToOverride.remarks}
              />
            </FormGroup>
            <FormGroup>
              <AppButton
                variant="outlined"
                width="100%"
                onClick={() => onCloseModal()}
              >
                Cancel
              </AppButton>
              <AppButton
                width="100%"
                onClick={() => {
                  updatePromotionClaimMoorupStatus(
                    claimToOverride,
                    confirmationModalState.id,
                  );
                  onCloseModal();
                }}
                disabled={hasEmptyValue(claimToOverride)}
              >
                Submit
              </AppButton>
            </FormGroup>
          </div>
        );

      default:
        return;
    }
  };

  const addActions = (claims: any) => {
    return claims.map((claim: any) => {
      const products = claim?.promotion_id?.claims?.products
        ?.map((item: any) => ({
          value: item?.product_name,
          data: item,
          label: `${item?.product_name} - ${getCurrencySymbol(item?.currency)}${item?.amount}`,
        }))
        .sort((a: { label: string }, b: { label: any }) =>
          a?.label?.localeCompare(b?.label),
        );

      const overrideClaimStatuses = OVERRIDE_CLAIM_STATUSES?.filter(
        (item) => item?.value !== claim?.moorup_status,
      );

      return {
        ...claim,
        approveAction: () =>
          setConfirmationModalState({
            open: true,
            view: ConfirmationModalTypes.APPROVE_CLAIM_REGULAR,
            subtitle: 'Are you sure you want to approve this claim?',
            data: products || [],
            id: claim._id,
          }),
        rejectAction: () =>
          setConfirmationModalState({
            open: true,
            view: ConfirmationModalTypes.REJECT_CLAIM_REGULAR,
            subtitle: 'Are you sure you want to reject this claim?',
            id: claim._id,
          }),
        overrideAction: () =>
          setConfirmationModalState({
            open: true,
            view: ConfirmationModalTypes.OVERRIDE_CLAIM_STATUS,
            subtitle: 'Are you sure you want to update moorup status?',
            data: overrideClaimStatuses || [],
            id: claim._id,
          }),
      };
    });
  };

  const promotionClaimsWithActions = addActions(promotionClaims || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      if (userDetails?.role === REGULAR) {
        const filters = {
          status: ClaimStatus.PENDING,
          moorup_status: ClaimStatus.APPROVED,
          include_all: true,
        };

        getPromotionClaims(filters, signal);
      } else {
        getPromotionClaims({ include_all: true }, signal);
      }
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotionClaims({});
      setSearchTerm('');
      cancelFilters();
      onCloseModal();
    };
  }, [activePlatform]);

  const onCloseModal = () => {
    setConfirmationModalState({
      open: false,
      view: null,
      data: {},
      title: '',
      id: '',
    });

    setClaimToApprove({
      product_name: '',
      amount: 0,
      currency: '',
    });

    setClaimToReject({
      remarks: '',
    });

    setClaimToOverride({
      remarks: '',
      status: '',
      user_id: userDetails?._id,
    });
  };

  const cancelFilters = () => {
    setSelectedClaimStatuses([]);
    setSelectedMoorupClaimStatuses([]);
    setCreatedDateFrom(null);
    setCreatedDateTo(null);
    setPromotionName('');
  };

  const handleStartDateChange = (date: Date | null) => {
    setCreatedDateFrom(date);
    setCreatedDateTo(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setCreatedDateTo(date);
  };

  const options: RadioOption[] = [
    { label: 'CSV (.csv)', value: 'csv' },
    { label: 'Excel (.xlsx)', value: 'excel' },
  ];

  const handleChange = (value: string) => {
    setExportFileFormat(value);
  };

  const resetExports = () => {
    setExportFileFormat('csv');
    setSideModalState({
      ...sideModalState,
      open: false,
      view: null,
    });
  };

  const renderSideModalContent = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.FILTER_PROMOTION_CLAIMS:
        return (
          <FormWrapper formTitle="Filter By">
            <FormGroup marginBottom="20px">
              <StyledInput
                type="text"
                id="name"
                label="Promotion Name"
                name="promotion_name"
                placeholder="Promotion Name"
                onChange={(e) => setPromotionName(e.target.value)}
                value={promotionName}
              />
            </FormGroup>
            <FormGroup marginBottom="20px">
              <StyledReactSelect
                label="Claim Status"
                name="claim_status"
                isMulti={true}
                options={CLAIM_STATUSES}
                placeholder="Select claim statuses"
                value={selectedClaimStatuses}
                onChange={(selected) => {
                  const claimStatusValues = selected?.map(
                    (option: any) => option.value,
                  );

                  setSelectedClaimStatuses(claimStatusValues);
                }}
              />
            </FormGroup>
            <FormGroup marginBottom="20px">
              <StyledReactSelect
                label="Moorup Status"
                name="moorup_status"
                isMulti={true}
                options={MOORUP_CLAIM_STATUSES}
                placeholder="Select moorup statuses"
                value={selectedMoorupClaimStatuses}
                onChange={(selected) => {
                  const moorupStatusValues = selected?.map(
                    (option: any) => option.value,
                  );

                  setSelectedMoorupClaimStatuses(moorupStatusValues);
                }}
              />
            </FormGroup>
            <FormGroup marginBottom="20px">
              <StyledDateRangePicker
                startDateInput={{
                  onChange: handleStartDateChange,
                  placeholder: 'Start Date',
                  value: createdDateFrom,
                  name: 'createdDateFrom',
                  onBlur: () => {},
                }}
                endDateInput={{
                  onChange: handleEndDateChange,
                  placeholder: 'End Date',
                  value: createdDateTo,
                  name: 'createdDateTo',
                  onBlur: () => {},
                }}
                label="Claim Date"
                onChange={() => {}}
              />
            </FormGroup>
            <FormGroup>
              <AppButton
                type="button"
                variant="outlined"
                width="fit-content"
                onClick={() => cancelFilters()}
              >
                Reset
              </AppButton>
              <FormGroup>
                <AppButton
                  type="button"
                  variant="outlined"
                  width="fit-content"
                  onClick={() => {
                    setSideModalState({
                      ...sideModalState,
                      open: false,
                      view: null,
                    });
                  }}
                >
                  Cancel
                </AppButton>
                <AppButton
                  type="button"
                  width="fit-content"
                  onClick={() => {
                    const filter = {
                      include_all: true,
                      ...(selectedClaimStatuses?.length
                        ? { status: selectedClaimStatuses.join(',') }
                        : {}),
                      ...(selectedMoorupClaimStatuses?.length
                        ? {
                            moorup_status:
                              selectedMoorupClaimStatuses.join(','),
                          }
                        : {}),
                      ...(createdDateFrom
                        ? {
                            start_date:
                              moment(createdDateFrom).format('YYYY-MM-DD'),
                          }
                        : {}),
                      ...(createdDateTo
                        ? {
                            end_date:
                              moment(createdDateTo).format('YYYY-MM-DD'),
                          }
                        : {}),
                      ...(!isEmpty(promotionName)
                        ? { promotion_name: promotionName }
                        : {}),
                    };

                    getPromotionClaims(filter);

                    setSideModalState({
                      ...sideModalState,
                      open: false,
                      view: null,
                    });
                  }}
                >
                  Apply
                </AppButton>
              </FormGroup>
            </FormGroup>
          </FormWrapper>
        );

      case MODAL_TYPES.DOWNLOAD_PROMOTION_CLAIMS:
        return (
          <FormWrapper
            formTitle="Export"
            subtTitle="Download Promotion Claims Report"
          >
            <FormGroup marginBottom="20px">
              <RadioGroup
                label="File Format"
                options={options}
                onChange={handleChange}
                defaultValue="csv"
              />
            </FormGroup>
            <FormGroup>
              <span />
              <FormGroup>
                <AppButton
                  type="button"
                  variant="outlined"
                  width="fit-content"
                  onClick={() => resetExports()}
                >
                  Cancel
                </AppButton>
                <AppButton
                  type="button"
                  width="fit-content"
                  onClick={() => {
                    exportPromotionClaims({
                      data: promotionClaims,
                      exportOptions: { format: exportFileFormat },
                    });

                    resetExports();
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
                  view: MODAL_TYPES.DOWNLOAD_PROMOTION_CLAIMS,
                });
              }}
              disabled={isEmpty(promotionClaims)}
            />
            <Divider />
            {(userDetails?.role === SUPERADMIN ||
              userDetails.role === ADMIN) && (
              <>
                {/* <IconButton tooltipLabel="Customize Columns" icon={faSliders} /> */}
                <IconButton
                  tooltipLabel="Filter"
                  icon={faFilter}
                  onClick={() => {
                    setSideModalState({
                      ...sideModalState,
                      open: true,
                      view: MODAL_TYPES.FILTER_PROMOTION_CLAIMS,
                    });
                  }}
                />
                <Divider />
              </>
            )}
          </>
        }
      />
      <Table
        label="Promotion Claims"
        isLoading={
          isFetchingPromotionClaims ||
          isUpdatingPromotionClaimMoorupStatus ||
          isUpdatingPromotionClaimStatus
        }
        headers={headers}
        rows={promotionClaimsWithActions || []}
        enableCheckbox={true}
        parsingConfig={promotionClaimsManagementParsingConfig}
      />
      <GenericModal
        title="Confirmation"
        subtitle={confirmationModalState.subtitle}
        content={renderModalContentAndActions()}
        isOpen={confirmationModalState.open}
        onClose={() => onCloseModal()}
      />
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          setSideModalState({
            ...sideModalState,
            open: false,
            view: null,
          });
        }}
      >
        {renderSideModalContent()}
      </SideModal>
    </>
  );
}
