import { AccountService } from '@/services/account.service';
import { FactoryService } from '@/services/factory.service';
import { ProductService } from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export function useProfileFactories() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile', 'factories'],
    queryFn: AccountService.getFactories,
  });

  return { factories: data, isLoading };
}

export function useFactory(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['factory', slug],
    queryFn: () => FactoryService.find(slug),
  });

  return { factory: data, isLoading };
}

export function useFactoryProducts(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['factory', slug, 'products'],
    queryFn: () => ProductService.listByFactory(slug),
  });

  return { products: data, isLoading };
}
