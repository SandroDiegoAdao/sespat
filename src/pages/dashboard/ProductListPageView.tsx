import { getProducts } from 'src/hooks/product/useProduct';
import ProductListPage from './ProductListPage';

export default function ProductListPageView() {
  const { data, isLoading } = getProducts();

  return <>{!isLoading && <ProductListPage products={data || []} isLoading={isLoading} />}</>;
}
