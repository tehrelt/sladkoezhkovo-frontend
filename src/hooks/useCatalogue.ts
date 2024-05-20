import { CatalogueService } from '@/services/catalogue.service';
import { useQuery } from '@tanstack/react-query';

export function useCatalogue(id: string) {
  const key = ['catalogue', id];

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => CatalogueService.find(id),
  });

  return { data, isLoading, queryKey: key };
}
