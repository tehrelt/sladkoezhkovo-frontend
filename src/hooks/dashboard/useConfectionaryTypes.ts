import { ConfectionaryTypeService } from '@/services/confectionary-type.service';
import { UnitService } from '@/services/unit.service';
import { useQuery } from '@tanstack/react-query';

export const useConfectionaryTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['confectionaryTypes'],
    queryFn: ConfectionaryTypeService.list,
  });

  return { data, isLoading };
};

export const useConfectionaryType = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['confectionaryTypes', id],
    queryFn: () => ConfectionaryTypeService.find(id),
  });

  return { data, isLoading };
};
