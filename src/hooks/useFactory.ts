import { FiltersDto } from '@/lib/filters/index.dto';
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

export function useFactories(f?: FiltersDto) {
  const key = ['factories'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => FactoryService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export function useFactory(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['factories', slug],
    queryFn: () => FactoryService.find(slug),
  });

  return { factory: data, isLoading };
}

export function useFactoryProducts(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['factories', slug, 'products'],
    queryFn: () => ProductService.listByFactory(slug),
  });

  return { products: data, isLoading };
}
