/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ACTIONS_COLUMN,
  AppButton,
  DEFAULT_COLUMN,
  MODAL_TYPES,
  SideModal,
  Table,
  USER_MANAGEMENT_COLUMNS,
  useAuth,
  useCommon,
  useUser,
  userManagementParsingConfig,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { AddUserForm } from './add-user';
import { EditUserForm } from './edit-user';

export function UserManagementPage() {
  const { state, getUsers, clearUsers } = useUser();
  const { users, isFetchingUsers, isCreatingUser, isUpdatingUser } = state;
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const headers = [
    ...DEFAULT_COLUMN,
    ...USER_MANAGEMENT_COLUMNS,
    ...ACTIONS_COLUMN,
  ];

  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getUsers({}, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearUsers({});
    };
  }, [activePlatform]);

  const renderForm = () => {
    switch (sideModalState.view) {
      case MODAL_TYPES.ADD_USER:
        return <AddUserForm />;

      case MODAL_TYPES.EDIT_USER:
        return <EditUserForm data={selectedUser} />;

      default:
        break;
    }
  };

  const filteredUsers = users?.filter((obj: any) =>
    obj.platforms.includes(activePlatform),
  );

  return (
    <>
      <Table
        label="Users"
        isLoading={isFetchingUsers || isCreatingUser || isUpdatingUser}
        headers={headers}
        rows={filteredUsers || []}
        parsingConfig={userManagementParsingConfig}
        menuItems={[
          {
            label: 'Edit',
            action: (value: any) => {
              setSelectedUser(value);
              setSideModalState({
                ...sideModalState,
                open: true,
                view: MODAL_TYPES.EDIT_USER,
              });
            },
          },
        ]}
        rightControls={
          <AppButton
            width="fit-content"
            icon={faPlus}
            onClick={() => {
              setSideModalState({
                ...sideModalState,
                open: true,
                view: MODAL_TYPES.ADD_USER,
              });
            }}
            disabled
          >
            Add
          </AppButton>
        }
      />
      <SideModal
        isOpen={sideModalState?.open}
        onClose={() => {
          setSideModalState({ ...sideModalState, open: false, view: null });
        }}
      >
        {renderForm()}
      </SideModal>
    </>
  );
}
