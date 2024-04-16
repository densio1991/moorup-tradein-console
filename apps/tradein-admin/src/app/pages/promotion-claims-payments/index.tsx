/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {
  ADMIN,
  AppButton,
  ClaimStatus,
  Divider,
  FormGroup,
  FormWrapper,
  IconButton,
  MODAL_TYPES,
  PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS,
  PageSubHeader,
  SUPERADMIN,
  SideModal,
  StyledDateRangePicker,
  StyledInput,
  Table,
  promotionClaimsPaymentManagementParsingConfig,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';

export function PromotionClaimsPaymentPage() {
  const {
    state,
    getPromotionClaims,
    clearPromotionClaims,
    processPromotionClaimPayment,
  } = usePromotion();
  const {
    promotionClaims,
    isFetchingPromotionClaims,
    isProcessingPromotionClaimPayment,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform, userDetails } = authState;
  const { state: commonState, setSideModalState, setSearchTerm } = useCommon();
  const { sideModalState } = commonState;

  const headers = [...PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS];

  switch (userDetails.role) {
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

  const addActions = (claims: any) => {
    const filters = {
      status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
      moorup_status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
    };

    return claims.map((claim: any) => {
      return {
        ...claim,
        action: () =>
          processPromotionClaimPayment({ claimId: claim._id }, filters),
      };
    });
  };

  const promotionClaimsWithActions = addActions(promotionClaims || []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      const filters = {
        status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
        moorup_status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(','),
      };

      getPromotionClaims(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotionClaims({});
      setSearchTerm('');
      cancelFilters();
    };
  }, [activePlatform]);

  const [promotionName, setPromotionName] = useState<string>('');
  const [createdDateFrom, setCreatedDateFrom] = useState<Date | null>(null);
  const [createdDateTo, setCreatedDateTo] = useState<Date | null>(null);

  const cancelFilters = () => {
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
                      status: [ClaimStatus.APPROVED, ClaimStatus.FAILED].join(
                        ',',
                      ),
                      moorup_status: [
                        ClaimStatus.APPROVED,
                        ClaimStatus.FAILED,
                      ].join(','),
                      ...(createdDateFrom
                        ? {
                            start_date: moment(createdDateFrom).format(
                              'YYYY-MM-DDTHH:mm:ss',
                            ),
                          }
                        : {}),
                      ...(createdDateTo
                        ? {
                            end_date: moment(createdDateTo).format(
                              'YYYY-MM-DDTHH:mm:ss',
                            ),
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
        return <span>Download Claims</span>;

      default:
        return;
    }
  };

  return (
    <>
      <PageSubHeader
        withSearch
        rightControls={
          (userDetails?.role === SUPERADMIN || userDetails.role === ADMIN) && (
            <>
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
          )
        }
      />

      <Table
        label="Claims Payment"
        isLoading={
          isFetchingPromotionClaims || isProcessingPromotionClaimPayment
        }
        headers={headers}
        rows={promotionClaimsWithActions || []}
        parsingConfig={promotionClaimsPaymentManagementParsingConfig}
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
