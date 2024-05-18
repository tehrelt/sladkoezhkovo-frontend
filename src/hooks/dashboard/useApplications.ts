import { FiltersDto } from '@/lib/filters/index.dto';
import { ApplicationService } from '@/services/application.service';
import { useQuery } from '@tanstack/react-query';

export function useApplications(f?: FiltersDto) {
  const key = ['applications'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => ApplicationService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useApplication = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['applications', id],
    queryFn: () => ApplicationService.find(id),
  });

  return { data, isLoading };
};
