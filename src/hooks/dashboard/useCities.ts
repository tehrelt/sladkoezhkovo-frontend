import { CityService } from '@/services/city.service';
import { useQuery } from '@tanstack/react-query';

export const useCities = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: CityService.list,
  });

  return { data, isLoading };
};

export const useCity = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['cities', id],
    queryFn: () => CityService.find(id),
  });

  return { data, isLoading };
};
