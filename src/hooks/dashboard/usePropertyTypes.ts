import { PropertyTypeService } from '@/services/property-type.service';
import { useQuery } from '@tanstack/react-query';

export const usePropertyTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: PropertyTypeService.list,
  });

  return { data, isLoading };
};

export const useCity = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['propertyTypes', id],
    queryFn: () => PropertyTypeService.find(id),
  });

  return { data, isLoading };
};
