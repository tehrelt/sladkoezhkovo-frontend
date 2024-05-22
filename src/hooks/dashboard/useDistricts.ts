import { DistrictFiltersDto } from '@/lib/filters/district-filters.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { DistrictService } from '@/services/district.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useDistricts(f?: FiltersDto & DistrictFiltersDto) {
  const key = ['districts'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
    f.cityId && key.push(`cityId:${f.cityId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => DistrictService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useDistrict = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['districts', id],
    queryFn: () => DistrictService.find(id),
  });

  return { data, isLoading };
};

export const useDeleteDistrict = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['districts', 'deps', id],
    queryFn: () => DistrictService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['districts', 'delete'],
    mutationFn: async () => await DistrictService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['districts'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
