/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ACTIONS_COLUMN,
  AppButton,
  DEFAULT_COLUMN,
  SideModal,
  Table,
  USER_MANAGEMENT_COLUMNS,
  useCommon,
  useCustomEffect,
  useUser,
} from '@tradein-admin/libs';
import { useState } from 'react';
import { AddUserForm } from './add-user';
import { EditUserForm } from './edit-user';

export function UserManagementPage() {
  const { state, getUsers, clearUsers } = useUser();
  const { users, isFetchingUsers } = state;
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const headers = [
    ...DEFAULT_COLUMN,
    ...USER_MANAGEMENT_COLUMNS,
    ...ACTIONS_COLUMN,
  ];

  const [selectedUser, setSelectedUser] = useState({});

  useCustomEffect(() => {
    getUsers({});

    return () => {
      // Clear data on unmount
      clearUsers({});
    };
  }, []);

  const renderForm = () => {
    switch (sideModalState.view) {
      case 'add-user':
        return <AddUserForm />;

      case 'edit-user':
        return <EditUserForm data={selectedUser} />;

      default:
        break;
    }
  };

  return (
    <>
      <Table
        label="Users"
        isLoading={isFetchingUsers}
        headers={headers}
        rows={users || []}
        menuItems={[
          {
            label: 'Edit',
            action: (value: any) => {
              setSelectedUser(value);
              setSideModalState({
                ...sideModalState,
                open: true,
                view: 'edit-user',
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
                view: 'add-user',
              });
            }}
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
