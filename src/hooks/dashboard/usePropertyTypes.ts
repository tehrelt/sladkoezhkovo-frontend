import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { PropertyTypeService } from '@/services/property-type.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePropertyTypes(f?: FiltersDto) {
  const key = ['property-types'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => PropertyTypeService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const usePropertyType = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['propertyTypes', id],
    queryFn: () => PropertyTypeService.find(id),
  });

  return { data, isLoading };
};

export const useDeletePropertyType = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['property-types', 'deps', id],
    queryFn: () => PropertyTypeService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['property-types', 'delete'],
    mutationFn: async () => await PropertyTypeService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['property-types'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
