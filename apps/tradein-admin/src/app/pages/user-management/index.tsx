/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AppButton,
  DEFAULT_COLUMN,
  Table,
  USER_MANAGEMENT_COLUMNS,
  useUser,
} from '@tradein-admin/libs';
import { useEffect, useRef } from 'react';

export function UserManagementPage() {
  const { state, getUsers, clearUsers } = useUser();
  const { users, isFetchingUsers } = state.user;
  const shouldRun = useRef(true);

  const headers = [...DEFAULT_COLUMN, ...USER_MANAGEMENT_COLUMNS];

  useEffect(() => {
    if (shouldRun.current) {
      getUsers({});
      shouldRun.current = false;
    }

    return () => {
      // Clear data on unmount
      clearUsers({});
    };
  }, []);

  return (
    <Table
      label="Users"
      isLoading={isFetchingUsers}
      headers={headers}
      rows={users || []}
      rightControls={
        <AppButton width="fit-content" icon={faPlus}>
          Add
        </AppButton>
      }
    />
  );
}
