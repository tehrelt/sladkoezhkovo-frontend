import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { ConfectionaryTypeService } from '@/services/confectionary-type.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useConfectionaryTypes(f?: FiltersDto) {
  const key = ['confectionary-types'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => ConfectionaryTypeService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useConfectionaryType = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['confectionaryTypes', id],
    queryFn: () => ConfectionaryTypeService.find(id),
  });

  return { data, isLoading };
};

export const useDeleteConfectionaryType = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['confectionary-types', 'deps', id],
    queryFn: () => ConfectionaryTypeService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['confectionary-types', 'delete'],
    mutationFn: async () => await ConfectionaryTypeService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['confectionary-types'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
