import { PackageService } from '@/services/package.service';
import { useQuery } from '@tanstack/react-query';

export const usePackages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: PackageService.list,
  });

  return { data, isLoading };
};

export const usePackage = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['packages', id],
    queryFn: () => PackageService.find(id),
  });

  return { data, isLoading };
};
