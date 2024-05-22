import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { CityService } from '@/services/city.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCities(f?: FiltersDto) {
  const key = ['cities'];
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

export const useDeleteCity = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['cities', 'deps', id],
    queryFn: () => CityService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['cities', 'delete'],
    mutationFn: async () => await CityService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
