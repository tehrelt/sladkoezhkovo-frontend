import { FiltersDto } from '@/lib/filters/index.dto';
import { ProductService } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export function useProducts(f?: FiltersDto) {
  const key = ['products'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => ProductService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export function useProduct(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: () => ProductService.find(id),
  });

  return { product: data, isLoading };
}

export function useProductOwner(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['products', id, 'owner'],
    queryFn: () => ProductService.findOwner(id),
  });

  return { productOwner: data, isLoading };
}
