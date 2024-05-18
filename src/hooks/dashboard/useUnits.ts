import { FiltersDto } from '@/lib/filters/index.dto';
import { UnitService } from '@/services/unit.service';
import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

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
