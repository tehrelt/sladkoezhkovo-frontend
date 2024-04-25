import { CitiesService } from '@/services/cities.service';
import { useQuery } from '@tanstack/react-query';

export const useCities = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: CitiesService.list,
  });

  return { data, isLoading };
};

export const useCity = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['cities', id],
    queryFn: () => CitiesService.find(id),
  });

  return { data, isLoading };
};
