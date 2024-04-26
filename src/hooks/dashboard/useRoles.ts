import { RoleService } from '@/services/role.service';
import { useQuery } from '@tanstack/react-query';

export const useRoles = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: RoleService.list,
  });

  return { data, isLoading };
};

export const useRole = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['roles', id],
    queryFn: () => RoleService.find(id),
  });

  return { data, isLoading };
};
