import { UnitService } from '@/services/unit.service';
import { useQuery } from '@tanstack/react-query';

export const useUnits = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['units'],
    queryFn: UnitService.list,
  });

  return { data, isLoading };
};

export const useUnit = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['units', id],
    queryFn: () => UnitService.find(id),
  });

  return { data, isLoading };
};
