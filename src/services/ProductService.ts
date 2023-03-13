import { Product } from 'src/@types/product';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

export async function getAllProducts() {
  const { data } = await axios.get<Array<Product>>('api/produtos');

  return data.slice(2);
}

// ----------------------------------------------------------------------

export async function create(product: Product) {
  await axios.post<Product>('produtos', product);
}

// ----------------------------------------------------------------------
