import { FiltersDto } from '@/lib/filters/index.dto';
import { ConfectionaryTypeService } from '@/services/confectionary-type.service';
import { useQuery } from '@tanstack/react-query';

export function useConfectionaryTypes(f?: FiltersDto) {
  const key = ['confectionary-types'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => ConfectionaryTypeService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useConfectionaryType = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['confectionaryTypes', id],
    queryFn: () => ConfectionaryTypeService.find(id),
  });

  return { data, isLoading };
};
