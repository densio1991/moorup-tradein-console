/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {
  ACTIONABLES_LOCKED_DEVICES_FOR_RETEST_COLUMNS,
  ACTIONS_COLUMN,
  AppButton,
  Divider,
  FormGroup,
  FormWrapper,
  IconButton,
  LOCK_TYPES,
  LockStatus,
  MODAL_TYPES,
  OrderItemStatus,
  PageSubHeader,
  SideModal,
  StyledReactSelect,
  Table,
  actionablesLockedDevicesForRetestParsingConfig,
  useAuth,
  useCommon,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export function LockedDevicesForRetestPage() {
  const { state, getLockedDevices, clearLockedDevices } = useOrder();
  const { state: authState } = useAuth();
  const { lockedDevices, isFetchingLockedDevices } = state;
  const { activePlatform } = authState;
  const { state: commonState, setSideModalState, setSearchTerm } = useCommon();
  const { sideModalState } = commonState;

  const headers = [
    ...ACTIONABLES_LOCKED_DEVICES_FOR_RETEST_COLUMNS,
    ...ACTIONS_COLUMN,
  ];

  const [selectedLockType, setSelectedLockType] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      const filters = {
        status: [OrderItemStatus.RECEIVED]?.join(','),
        lock_status: [LockStatus.RETEST]?.join(','),
      };

      getLockedDevices(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      setSearchTerm('');
      clearLockedDevices([]);
    };
  }, [activePlatform]);

  const cancelFilters = () => {
    setSelectedLockType([]);
  };

  const renderSideModalContent = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.FILTER_LOCKED_DEVICES_FOR_RETEST:
        return (
          <FormWrapper formTitle="Filter By">
            <FormGroup marginBottom="20px">
              <StyledReactSelect
                label="Lock Type"
                name="type"
                isMulti={true}
                options={LOCK_TYPES}
                placeholder="Select lock type"
                value={selectedLockType}
                onChange={(selected) => {
                  const lockTypeValues = selected?.map(
                    (option: any) => option.value,
                  );

                  setSelectedLockType(lockTypeValues);
                }}
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
                      status: [OrderItemStatus.RECEIVED]?.join(','),
                      lock_status: [LockStatus.LOCKED]?.join(','),
                      ...(selectedLockType?.length
                        ? {
                            lock_type: selectedLockType.join(','),
                          }
                        : {}),
                    };

                    getLockedDevices(filter);

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
              tooltipLabel="Filter"
              icon={faFilter}
              onClick={() => {
                setSideModalState({
                  ...sideModalState,
                  open: true,
                  view: MODAL_TYPES.FILTER_LOCKED_DEVICES_FOR_RETEST,
                });
              }}
            />
            <Divider />
          </>
        }
      />
      <Table
        label="Locked Devices - For Retest"
        isLoading={isFetchingLockedDevices}
        headers={headers}
        rows={lockedDevices || []}
        parsingConfig={actionablesLockedDevicesForRetestParsingConfig}
        menuItems={[
          {
            label: 'Set Unlocked',
            action: (value: any) => {
              console.log('Unlocked: ', value._id);
            },
          },
          {
            label: 'For Return',
            action: (value: any) => {
              console.log('For Return: ', value._id);
            },
          },
          {
            label: 'For Recycle',
            action: (value: any) => {
              console.log('Recycle: ', value._id);
            },
          },
        ]}
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
