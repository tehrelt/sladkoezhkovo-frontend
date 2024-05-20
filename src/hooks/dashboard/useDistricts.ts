import { DistrictFiltersDto } from '@/lib/filters/district-filters.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { DistrictService } from '@/services/district.service';
import { useQuery } from '@tanstack/react-query';

export function useDistricts(f?: FiltersDto & DistrictFiltersDto) {
  const key = ['districts'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
    f.cityId && key.push(`cityId:${f.cityId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => DistrictService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useDistrict = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['districts', id],
    queryFn: () => DistrictService.find(id),
  });

  return { data, isLoading };
};
