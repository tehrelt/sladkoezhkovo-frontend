import { FiltersDto } from '@/lib/filters/index.dto';
import { PackageService } from '@/services/package.service';
import { useQuery } from '@tanstack/react-query';

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
