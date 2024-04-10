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
  SUPERADMIN,
  SideModal,
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

  const [selectedClaimStatuses, setSelectedClaimStatuses] = useState([]);
  const [selectedMoorupClaimStatuses, setSelectedMoorupClaimStatuses] =
    useState([]);

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
  };

  const renderSideModalContent = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.FILTER_PROMOTION_CLAIMS:
        return (
          <FormWrapper formTitle="Filter By">
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
            <FormGroup>
              <span />
              <FormGroup>
                <AppButton
                  type="button"
                  variant="outlined"
                  width="fit-content"
                  onClick={() => cancelFilters()}
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
              onClick={() => exportPromotionClaims(promotionClaims)}
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
