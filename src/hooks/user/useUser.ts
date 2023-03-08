/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { User } from 'src/@types/user';
import { queryClient } from 'src/services/queryClient';
import { getAllUsers, create, edit, getUserDataById } from 'src/services/UserService';

// ----------------------------------------------------------------------

export function getUsers() {
  return useQuery(['users'], () => getAllUsers(), {
    staleTime: 1000 * 60 * 10,
    retry: 0,
  });
}

// ----------------------------------------------------------------------

export async function createUser(user: User) {
  try {
    await create(user);
  } catch (msg: any) {
    throw new Error(msg);
  }
  queryClient.refetchQueries(['users']);
}

// -----------------------------------------------------------------------------

export function getUserById(id: string) {
  return useQuery(['users', id], () => getUserDataById(id), {
    staleTime: 1000 * 60 * 10,
  });
}

// -----------------------------------------------------------------------------

export async function editUser(user: User) {
  return edit(user);
}

// -----------------------------------------------------------------------------

export async function refreshUser() {
  queryClient.invalidateQueries(['users']);
  queryClient.refetchQueries(['users', 1, '']);
}
