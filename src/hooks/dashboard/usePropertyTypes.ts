import { FiltersDto } from '@/lib/filters/index.dto';
import { PropertyTypeService } from '@/services/property-type.service';
import { useQuery } from '@tanstack/react-query';

export function usePropertyTypes(f?: FiltersDto) {
  const key = ['property-types'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => PropertyTypeService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const usePropertyType = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['propertyTypes', id],
    queryFn: () => PropertyTypeService.find(id),
  });

  return { data, isLoading };
};
