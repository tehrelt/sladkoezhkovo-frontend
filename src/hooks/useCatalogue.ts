import { CatalogueFilters } from '@/lib/filters/catalogue-filters.dto';
import { CatalogueService } from '@/services/catalogue.service';
import { useQuery } from '@tanstack/react-query';

export function useCatalogue(f?: CatalogueFilters) {
  const key = ['catalogue'];

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => CatalogueService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export function useCatalogueItem(id: string) {
  const key = ['catalogue', id];

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => CatalogueService.find(id),
  });

  return { data, isLoading, queryKey: key };
}
