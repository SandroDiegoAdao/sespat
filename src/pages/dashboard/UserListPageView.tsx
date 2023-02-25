import React from 'react';
import { getUsers } from 'src/hooks/user/useUser';
import UserListPage from './UserListPage';

export default function UserListPageView() {
  const { data, isLoading } = getUsers();

  return <>{!isLoading && data && <UserListPage users={data} />}</>;
}
