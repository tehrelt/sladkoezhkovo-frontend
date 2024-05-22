import { FiltersDto } from '@/lib/filters/index.dto';
import { IDeleter } from '@/lib/types/options/table.options';
import { PackageService } from '@/services/package.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePackages(f?: FiltersDto) {
  const key = ['packages'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => PackageService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const usePackage = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['packages', id],
    queryFn: () => PackageService.find(id),
  });

  return { data, isLoading };
};

export const useDeletePackage = (
  id: string,
  f?: { onSuccess: () => void },
): IDeleter => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['packages', 'deps', id],
    queryFn: () => PackageService.deps(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['packages', 'delete'],
    mutationFn: async () => await PackageService.delete(id),
    onSuccess: () => {
      f?.onSuccess();
      client.invalidateQueries({ queryKey: ['packages'] });
    },
  });

  return {
    mutate,
    deps: data,
    deletePending: isPending,
    depsLoading: isLoading,
  };
};
