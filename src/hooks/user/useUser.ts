/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from 'src/services/UserService';

// -----------------------------------------------------------------------------

export function getUsers() {
  return useQuery(['users'], () => getAllUsers(), {
    staleTime: 1000 * 60 * 10,
    retryDelay(failureCount) {
      return Math.min(1000 * 3 ** failureCount, 5000);
    },
  });
}

// // -----------------------------------------------------------------------------

// export async function createUser(user: User) {
//   try {
//     await create(user);
//   } catch (msg: any) {
//     throw new Error(msg);
//   }
//   queryClient.refetchQueries(['users']);
// }

// // -----------------------------------------------------------------------------

// export async function editUser(user: User) {
//   return edit(user);
// }

// // -----------------------------------------------------------------------------

// export async function refreshUser() {
//   queryClient.invalidateQueries(['users']);
//   queryClient.refetchQueries(['users', 1, '']);
// }
