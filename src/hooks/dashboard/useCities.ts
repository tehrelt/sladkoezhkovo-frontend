import { FiltersDto } from '@/lib/filters/index.dto';
import { CityService } from '@/services/city.service';
import { useQuery } from '@tanstack/react-query';

export function useCities(f?: FiltersDto) {
  const key = ['users'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => CityService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useCity = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['cities', id],
    queryFn: () => CityService.find(id),
  });

  return { data, isLoading };
};
