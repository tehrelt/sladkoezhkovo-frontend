import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { UnitService } from '@/services/unit.service';
import { UserService } from '@/services/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUnits(f?: FiltersDto) {
  const key = ['units'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => UnitService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useUnit = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['units', id],
    queryFn: () => UnitService.find(id),
  });

  return { data, isLoading };
};

export const useDeleteUnit = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['units', 'deps', id],
    queryFn: () => UnitService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['units', 'delete'],
    mutationFn: async () => await UnitService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['units'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
