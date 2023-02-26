/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { Product } from 'src/@types/product';
import { getAllProducts, create } from 'src/services/ProductService';
import { queryClient } from 'src/services/queryClient';

// ----------------------------------------------------------------------

export function getProducts() {
  return useQuery(['products'], () => getAllProducts(), {
    staleTime: 1000 * 60 * 10,
    retryDelay(failureCount) {
      return Math.min(1000 * 3 ** failureCount, 5000);
    },
  });
}
// ----------------------------------------------------------------------

export async function createProduct(product: Product) {
  try {
    await create(product);
  } catch (msg: any) {
    throw new Error(msg);
  }
  queryClient.refetchQueries(['products']);
}

// -----------------------------------------------------------------------------

// export async function editUser(user: User) {
//   return edit(user);
// }

// // -----------------------------------------------------------------------------

// export async function refreshUser() {
//   queryClient.invalidateQueries(['users']);
//   queryClient.refetchQueries(['users', 1, '']);
// }
