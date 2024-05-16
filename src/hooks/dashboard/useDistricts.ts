import { DistrictService } from '@/services/district.service';
import { UnitService } from '@/services/unit.service';
import { useQuery } from '@tanstack/react-query';

export const useDistricts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['districts'],
    queryFn: DistrictService.list,
  });

  return { data, isLoading };
};

export const useDistrict = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['districts', id],
    queryFn: () => DistrictService.find(id),
  });

  return { data, isLoading };
};
